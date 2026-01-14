import copy_import_string from '@/assets/media/copy_import_string.webm';
import import_in_game from '@/assets/media/import.png';
import modify_tab from '@/assets/media/modify_tab.png';

export const importSteps = [
  {
    image: copy_import_string,
    step: 1,
    title: 'Copy the Import String',
    description:
      "Copy the import string from the bank tab of your choosing. This can be done from the list of bank tabs shown on the home page or from a specific bank tab's page!",
  },
  {
    image: import_in_game,
    step: 2,
    title: 'Import the Tag on RuneLite',
    description:
      'Open your bank, right click the + icon, and select "Import Tag". The new tab should appear at the end of your bank tabs list.',
  },
  {
    image: modify_tab,
    step: 3,
    title: 'Modify the Tab to Your Liking',
    description:
      'From here, you can modify the tab name, tagged items, layout, and icon to your own personal preference.',
  },
];
