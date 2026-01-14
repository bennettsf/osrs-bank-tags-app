import TutorialCard from '@/components/TutorialCard/TutorialCard';
import './Tutorial.css';
import { importSteps } from '@/data/importSteps';
import { exportSteps } from '@/data/exportSteps';
import { SegmentGroup } from '@chakra-ui/react';
import { useState } from 'react';

// Retrieve selected tutorial steps from localStorage or default to 'import-steps'
const getSelected = () => {
  const selected = localStorage.getItem('tutorialSteps') || 'import-steps';
  return selected;
};

function Tutorial() {
  const [selectedSteps, setSelectedSteps] = useState<string | null>(() => {
    return getSelected() as 'import-steps' | 'export-steps';
  });

  // Handle change of selected tutorial steps
  const handleChange = (value: string | null) => {
    // Update localStorage and state only if the value has changed and is not null
    if (selectedSteps !== value && value) {
      localStorage.setItem('tutorialSteps', value);
      setSelectedSteps(value);
    }
    console.log(localStorage.getItem('tutorialSteps'));
  };

  return (
    <div className="tutorial-container">
      <div className="segmented-control">
        <SegmentGroup.Root
          defaultValue={selectedSteps}
          onValueChange={(e) => handleChange(e.value)}
          className="segment-root"
          size={'lg'}
        >
          <SegmentGroup.Indicator className="segment-indicator" />
          <SegmentGroup.Item className="segment-item" value="import-steps">
            <SegmentGroup.ItemText>Importing</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
          <SegmentGroup.Item className="segment-item" value="export-steps">
            <SegmentGroup.ItemText>Exporting</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        </SegmentGroup.Root>
      </div>
      <div className="tutorial-cards">
        {selectedSteps === 'import-steps'
          ? importSteps.map((step) => (
              <TutorialCard
                key={step.step}
                image={step.image}
                step={step.step}
                title={step.title}
                description={step.description}
              />
            ))
          : exportSteps.map((step) => (
              <TutorialCard
                key={step.step}
                image={step.image}
                step={step.step}
                title={step.title}
                description={step.description}
              />
            ))}
      </div>
    </div>
  );
}

export default Tutorial;
