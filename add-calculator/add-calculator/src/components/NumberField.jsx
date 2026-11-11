
function NumberField({ id, label, value, onChange, readOnly = false }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

export default NumberField;
