import type { StepItem } from '@/types';
import export_in_game from '@/assets/media/export-tutorial/export.png';
import share_export from '@/assets/media/export-tutorial/share_export.webm';
import passkey from '@/assets/media/export-tutorial/passkey.png';

export const exportSteps: StepItem[] = [
  {
    image: export_in_game,
    step: 1,
    title: 'Export the Bank Tag Tab',
    description: (
      <p>
        From your list of bank tag tabs, right click on the tab you wish to export and select
        "Export Tag Tab". You should now have the import string copied to your clipboard!
      </p>
    ),
  },
  {
    image: share_export,
    step: 2,
    title: 'Share the Export String!',
    description: (
      <p>
        You can now share this import string with friends or{' '}
        <a href="/import">
          <u>post it</u>
        </a>{' '}
        for others to use. To import the tag, simply follow the import tutorial steps.
      </p>
    ),
  },
  {
    image: passkey,
    step: 3,
    title: 'Modify Your Created Bank Tag Tabs',
    description: (
      <p>
        When creating a bank tag tab, you have the option to create a passkey. This passkey allows
        you to modify the tab later on. <strong>This feature is coming soon!</strong>
      </p>
    ),
  },
];

// 'From here, you can send the import string to a friend or post it here for others to use.'
