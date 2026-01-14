import TutorialCard from '@/components/TutorialCard/TutorialCard';
import './Tutorial.css';
import { importSteps } from '@/data/importSteps';

function Tutorial() {
  return (
      <div className="tutorial-container">
          <div className="tutorial-cards">
      {importSteps.map((step) => (
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
