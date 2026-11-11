import { useState } from "react";
import NumberField from "./NumberField";

function AddCalculator() {

  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [sum, setSum] = useState("");

  const handleAdd = () => {
    setSum(Number(firstNumber) + Number(secondNumber));
  };

  const handleClear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setSum("");
  };

  return (
    <section className="calculator">
      <h1>Add Calculator</h1>

      <NumberField
        id="first"
        label="First Number"
        value={firstNumber}
        onChange={(e) => setFirstNumber(e.target.value)}
      />

      <NumberField
        id="second"
        label="Second Number"
        value={secondNumber}
        onChange={(e) => setSecondNumber(e.target.value)}
      />

      <NumberField id="sum" label="Sum" value={sum} readOnly />

      <div className="buttons">
        <button type="button" onClick={handleAdd}>
          Add
        </button>
        <button type="button" className="secondary" onClick={handleClear}>
          Clear
        </button>
      </div>
    </section>
  );
}

export default AddCalculator;
