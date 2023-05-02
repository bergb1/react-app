import "./Property.css";

// Component properties
interface Props {
  name: string;
  value: string;
}

// Component
const Property = ({ name, value }: Props) => {
  return (
    <div className="user-view-body-property">
      <div className="property-header">{name}</div>
      <div className="property-body">
        <div className="property-body-background"></div>
        <p className="property-body-text">{value}</p>
      </div>
    </div>
  );
};

export default Property;
