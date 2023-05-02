// Component properties
interface Props {
  name: string;
  value: string;
  cover: string;
  info: string;
}

// Component
const MediaProperty = ({ name, value, info }: Props) => {
  return (
    <div className="media-property">
      <div className="media-property-header">
        <div className="media-property-name">{name}</div>
        <div className="media-property-value">
          <div className="media-property-background"></div>
          <p className="media-property-value-text">{value}</p>
        </div>
      </div>
      <div className="media-property-body">
        <img className="media-property-cover" src="music-placeholder.png" />
        <p className="media-property-cover">{info}</p>
      </div>
    </div>
  );
};

export default MediaProperty;
