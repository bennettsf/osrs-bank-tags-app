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

import { useState } from 'react';
import { CreateBankTabSchema } from './models';
import { FaCheck, FaRegSquarePlus } from 'react-icons/fa6';
import { useCreateBankTab } from '@/hooks/useCreateBankTab';
import { useNavigate } from 'react-router-dom';
import { BankTabDisplay } from '@/components/BankTabDisplay/BankTabDisplay';
import { TagsEnum, type Tags } from '@/types';
import { RxCross1 } from 'react-icons/rx';
import type { BankTagParseResult } from '@shared/bank-tags/types';
import { parseBankTagString } from '@shared/bank-tags/bankTagStringHelper';

export default function Create() {
  const [importString, setImportString] = useState('');
  const [message, setMessage] = useState<string | undefined>(' ');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [passkey, setPasskey] = useState<string | null>(null);
  // parsed bank tag result
  const [parsedTag, setParsedTag] = useState<BankTagParseResult | null>(null);
  // used for clipboard copy success indicator
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const createBankTab = useCreateBankTab();

  const handleImportClipboard = async () => {
    try {
      const raw = await navigator.clipboard.readText();
      const cleaned = raw.replaceAll(' ', '');
      setImportString(cleaned);
      const validation = parseBankTagString(cleaned);

      if (!validation.ok) {
        setParsedTag(null);
        setCopySuccess(false);
      } else {
        setParsedTag(validation);
        setCopySuccess(true);
      }
      setMessage(validation.message);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
      setMessage('Failed to read clipboard contents.');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!parsedTag) {
        setMessage('Please import a valid bank tag first.');
        return;
      }

      if (!('name' in parsedTag)) {
        setMessage("Invalid parsed bank tag. Name doesn't exist.");
        return;
      }

      // add tagName to array,change tags to lowercase and remove duplicates
      const selectedTagsWithName = [...selectedTags, parsedTag.name];
      const selectedTagsSet = new Set(selectedTagsWithName.map((tag) => tag.toLowerCase()));
      const finalTags = Array.from(selectedTagsSet);

      const toValidate = {
        name: parsedTag.name,
        icon: parsedTag.icon,
        import_string: importString,
        layout: parsedTag.layout,
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
      setMessage('Failed to create the bank tab.');
    }
  };

  console.log('parsedTag:', parsedTag);

  return (
    <div className="create-container">
      <Button size="sm" onClick={handleImportClipboard}>
        Import From Clipboard
        {copySuccess !== null &&
          (copySuccess === true ? (
            <FaCheck key="success" className="icon flash" />
          ) : (
            <RxCross1 key="error" className="icon flash" />
          ))}
      </Button>
      <Textarea
        className={`create-textarea ${
          parsedTag?.ok ? 'valid-glow' : parsedTag?.ok === false ? 'invalid-glow' : ''
        }`}
        size="xl"
        value={importString}
        readOnly={true}
      />

      <div className="result-container">
        <BankTagForm
          icon={parsedTag?.ok ? parsedTag?.icon : ''}
          name={parsedTag?.ok ? parsedTag?.name : ''}
        />
        <BankTabDisplay
          itemIds={parsedTag?.ok ? parsedTag.itemIds : []}
          layout={parsedTag?.ok ? parsedTag.layout : false}
          importString={importString ?? ''}
        />
        <TagsDisplay selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <BankTagPasskey passkey={passkey ? passkey : ''} setPasskey={setPasskey} />
        <Button
          className="submit-box"
          style={{ gridArea: 'box-submit' }}
          size="sm"
          disabled={!parsedTag?.ok || selectedTags.length === 0 || createBankTab.isPending}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <Text className={parsedTag?.ok === true ? 'valid-text' : 'invalid-text'}>
        {message ? message : ' '}
      </Text>
    </div>
  );
}

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

interface BankTagFormProps {
  icon: string | null;
  name: string | null;
}

function BankTagForm({ icon, name }: BankTagFormProps) {
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
