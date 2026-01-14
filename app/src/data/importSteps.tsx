import copy_import_string from '@/assets/media/import-tutorial/copy_import_string.webm';
import import_in_game from '@/assets/media/import-tutorial/import.png';
import modify_tab from '@/assets/media/import-tutorial/modify_tab.png';
import type { StepItem } from '@/types';

export const importSteps: StepItem[] = [
  {
    image: copy_import_string,
    step: 1,
    title: 'Copy the Import String',
    description: (
      <p>
        Copy the import string from the bank tab of your choosing. This can be done from the list of
        bank tabs shown on the home page or from a specific bank tab's page!
      </p>
    ),
  },
  {
    image: import_in_game,
    step: 2,
    title: 'Import the Tag on RuneLite',
    description: (
      <p>
        Open your bank, right click the + icon, and select "Import Tag". The new tab should appear
        at the end of your bank tabs list.
      </p>
    ),
  },
  {
    image: modify_tab,
    step: 3,
    title: 'Modify the Tab to Your Liking',
    description: (
      <p>
        From here, you can modify the tab name, tagged items, layout, and icon to your own personal
        preference.
      </p>
    ),
  },
];
