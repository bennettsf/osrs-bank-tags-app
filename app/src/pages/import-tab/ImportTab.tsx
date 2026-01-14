import {
  Textarea,
  Button,
  Text,
  Checkbox,
  Fieldset,
  CheckboxGroup,
  For,
  Input,
  Group,
  Switch,
} from '@chakra-ui/react';
import './ImportTab.css';
import '../../index.css';
import { checkBankTagString, type CheckBankTagStringResult } from '@/util/bankTagStringHelper';
import { useState } from 'react';
import { CreateBankTabSchema } from './models';
import { FaCheck, FaRegSquarePlus } from 'react-icons/fa6';
import { useCreateBankTab } from '@/hooks/useCreateBankTab';
import { useNavigate } from 'react-router-dom';
import { BankTabDisplay } from '@/components/BankTabDisplay/BankTabDisplay';
import { TagsEnum, type Tags } from '@/types';
import { RxCross1 } from 'react-icons/rx';

function Create() {
  const [importString, setImportString] = useState('');
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(' ');
  const [icon, setIcon] = useState<string | undefined>(undefined);
  const [layout, setLayout] = useState<boolean | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [itemIds, setItemIds] = useState<string[] | undefined>(undefined);
  const [passkey, setPasskey] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null);

  console.log('Selected Tags:', selectedTags);
  console.log('Item IDs:', itemIds);
  console.log('Layout:', layout);
  console.log('Icon:', icon);
  console.log('Name:', name);
  console.log('Passkey:', passkey);
  console.log('Import String:', importString);

  const navigate = useNavigate();

  const createBankTab = useCreateBankTab();

  const handleImportClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setImportString(text.replaceAll(' ', ''));
      const validation = checkBankTagString(text);
      setIsValid(validation.result.isValid);
      setLayout(validation.layout);
      setIcon(validation.icon);
      setName(validation.name);
      setItemIds(validation.itemIds);
      if (validation.result.message && !validation.result.isValid) {
        setMessage(validation.result.message);
        setCopySuccess(false);
      } else {
        setMessage('Your bank tag is valid!');
        setCopySuccess(true);
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      setCopySuccess(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!isValid || !icon || !name || !layout) {
        setMessage('Please import a valid bank tag first.');
        return;
      }

      // add tagName to array,change tags to lowercase and remove duplicates
      const selectedTagsWithName = [...selectedTags, name];
      const selectedTagsSet = new Set(selectedTagsWithName.map((tag) => tag.toLowerCase()));
      const finalTags = Array.from(selectedTagsSet);

      const toValidate = {
        name: name,
        icon: icon,
        import_string: importString,
        layout: layout,
        tags: finalTags,
        edit_passkey: passkey ? passkey : null,
      };

      const parsed = CreateBankTabSchema.safeParse(toValidate);
      if (!parsed.success) {
        const firstErr = parsed.error.issues[0]?.message ?? 'Invalid form data';

        setMessage(firstErr);
        return;
      }

      const payload = {
        name: parsed.data.name,
        icon: parsed.data.icon,
        import_string: parsed.data.import_string,
        layout: parsed.data.layout,
        tags: parsed.data.tags,
        edit_passkey: passkey ? passkey : null,
      };

      const result = await createBankTab.mutateAsync(payload);

      //redirect to the newly created bank tab page
      navigate(`/banktab/${result.id}`);

      setMessage('Bank tab created successfully!');
    } catch (err) {
      console.error('Submit failed:', err);
      setMessage('Failed to create bank tab.');
    }
  };

  return (
    <div className="create-container">
      <Button size="sm" onClick={handleImportClipboard}>
        Import From Clipboard
        {copySuccess !== null &&
          (copySuccess ? (
            <FaCheck key="success" className="icon flash " />
          ) : (
            <RxCross1 key="error" className="icon flash " />
          ))}
      </Button>
      <Textarea
        className={`create-textarea ${
          isValid ? 'valid-glow' : isValid === false ? 'invalid-glow' : ''
        }`}
        size="xl"
        value={importString}
        readOnly={true}
      />

      <div className="result-container">
        <BankTagForm icon={icon} name={name} />
        <BankTabDisplay
          itemIds={itemIds ?? []}
          layout={layout ?? false}
          importString={importString ?? ''}
        />
        <TagsDisplay selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <BankTagPasskey passkey={passkey ? passkey : ''} setPasskey={setPasskey} />
        <Button
          className="submit-box"
          style={{ gridArea: 'box-submit' }}
          size="sm"
          disabled={!isValid || selectedTags.length === 0 || createBankTab.isPending}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <Text className={isValid ? 'valid-text' : 'invalid-text'}>{message ? message : ' '}</Text>
    </div>
  );
}

export default Create;

function BankTagPasskey({
  passkey,
  setPasskey,
}: {
  passkey: string;
  setPasskey: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="grid-box" style={{ gridArea: 'box-passkey' }}>
      <Switch.Root checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label fontSize={'xl'}>Enable Passkey</Switch.Label>
      </Switch.Root>
      <Input
        fontSize="2xl"
        height="45px"
        variant="subtle"
        placeholder="Create Passkey"
        value={passkey}
        onChange={(e) => setPasskey(e.target.value)}
        disabled={!checked}
        focusRingColor={'#eab308'}
      />
    </div>
  );
}

function BankTagForm({ icon, name }: Pick<CheckBankTagStringResult, 'icon' | 'name'>) {
  return (
    <div className="grid-box" style={{ gridArea: 'box-form' }}>
      <div className="tag-name">
        <Text className="details-text">
          Name: <span className="detail">{name ? name : null}</span>
        </Text>
      </div>
      <div className="tag-icon">
        <Text className="details-text">
          Icon:{' '}
          {icon ? (
            <img
              className="icon-image"
              src={`https://static.runelite.net/cache/item/icon/${icon}.png`}
              alt="icon"
            />
          ) : null}
        </Text>
      </div>
    </div>
  );
}

function TagsDisplay({
  selectedTags,
  setSelectedTags,
}: {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [selectableTags, setSelectableTags] = useState<string[]>([...TagsEnum.options]);
  const [customTag, setCustomTag] = useState<string>('');

  const handleAddCustomTag = (tag: string) => {
    if (tag && !selectableTags.includes(tag)) {
      setSelectableTags((prev) => [...prev, tag]);
      setSelectedTags((prev) => [...prev, tag]);
      setCustomTag('');
    }
  };
  return (
    <div className="grid-box" style={{ gridArea: 'box-tags' }}>
      <Fieldset.Root>
        <CheckboxGroup
          name="tags"
          value={selectedTags}
          onValueChange={(vals) => setSelectedTags(vals as Tags[])}
        >
          <Fieldset.Legend fontSize="xl" mb="2">
            Select tags:
          </Fieldset.Legend>
          <Fieldset.Content
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <For each={selectableTags}>
              {(value) => (
                <Checkbox.Root
                  variant={'outline'}
                  colorPalette={'yellow'}
                  key={value}
                  value={value}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control boxSize="1em" border="1px solid #eab308" />
                  <Checkbox.Label fontSize={'2xl'}>{value}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </For>
            <Group w="full" gap={3}>
              <Input
                fontSize="2xl"
                height="45px"
                variant="subtle"
                focusRingColor={'#eab308'}
                placeholder="Custom Tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
              />
              <FaRegSquarePlus
                className="add-icon"
                size={18}
                cursor="pointer"
                onClick={() => handleAddCustomTag(customTag)}
              />
            </Group>
          </Fieldset.Content>
        </CheckboxGroup>
      </Fieldset.Root>
    </div>
  );
}

// function LayoutEnabled({ layout }: Pick<CheckBankTagStringResult, 'layout'>) {
//   return (
//     <div className="grid-box" style={{ gridArea: 'box-layout' }}>
//       <Text className="details-text">
//         Layout Enabled:{' '}
//         {layout ? <RxCheck color="green" /> : layout === false ? <RxCross2 color="red" /> : null}
//       </Text>
//       <div className="info-icon">
//         <Tooltip
//           content="Enabling layout will show the items in the custom tab as if they were in one single tab, rather than split into multiple custom tabs provided by Jagex, assuming you use those as well.
//         This can be toggled by right clicking your custom tab in-game and selecting 'Enable Layout'."
//         >
//           <FaRegQuestionCircle />
//         </Tooltip>
//       </div>
//     </div>
//   );
// }

// function IconDisplay({ icon }: Pick<CheckBankTagStringResult, 'icon'>) {
//   return (
//     <div className="grid-box" style={{ gridArea: 'box-icon' }}>
//       <Text className="details-text">
//         Icon:{' '}
//         {icon ? (
//           <img
//             className="icon-image"
//             src={`https://static.runelite.net/cache/item/icon/${icon}.png`}
//             alt="icon"
//           />
//         ) : null}
//       </Text>
//     </div>
//   );
// }

// function NameDisplay({ tagName }: Pick<CheckBankTagStringResult, 'tagName'>) {
//   return (
//     <div className="grid-box" style={{ gridArea: 'box-name' }}>
//       <Text className="details-text">Name: {tagName ? tagName : null}</Text>
//     </div>
//   );
// }
