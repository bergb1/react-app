import "./Property.css";

// Component properties
interface Props {
  name: string;
  value: string;
}

// Component
const Property = ({ name, value }: Props) => {
  return (
    <div className="property">
      <div className="property-name">{name}</div>
      <div className="property-value">
        <div className="property-background"></div>
        <p className="property-value-text">{value}</p>
      </div>
    </div>
  );
};

export default Property;
