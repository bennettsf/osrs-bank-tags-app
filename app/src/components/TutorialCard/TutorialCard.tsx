import './TutorialCard.css';

interface TutorialCardProps {
  // Define any props if needed in the future
  image: string;
  step: number;
  title: string;
  description: string;
}

function TutorialCard({ image, step, title, description }: TutorialCardProps) {
  // Determine if the media is a video based on file extension
  const cleanSrc = image.split('?')[0];
  const isVideo = /\.(webm|mp4)$/i.test(cleanSrc);

  console.log(isVideo);
  return (
    <div className="tutorial-card">
      <div className="description-section">
        <h1 className="tutorial-card-header">{`Step ${step}: ${title}`}</h1>
        <p className="tutorial-card-description">{description}</p>
      </div>
      <div className="image-section">
        {isVideo ? (
          <video autoPlay loop muted playsInline preload="auto" className="tutorial-card-video">
            <source src={image} type="video/webm" />
            <source src={image} type="video/mp4" />
          </video>
        ) : (
          <img src={image} alt={title} className="tutorial-card-image" />
        )}
      </div>
    </div>
  );
}

export default TutorialCard;
