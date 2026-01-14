import TutorialCard from '@/components/TutorialCard/TutorialCard';
import './Tutorial.css';
import { importSteps } from '@/data/importSteps';
import { exportSteps } from '@/data/exportSteps';
import { SegmentGroup } from '@chakra-ui/react';
import { useState } from 'react';

function Tutorial() {
  const [selectedSteps, setSelectedSteps] = useState<string | null>('import-steps');
  return (
    <div className="tutorial-container">
      <div className="segmented-control">
        <SegmentGroup.Root
          defaultValue={selectedSteps}
          onValueChange={(e) => setSelectedSteps(e.value)}
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
