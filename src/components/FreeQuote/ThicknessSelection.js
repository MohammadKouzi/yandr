import React, { memo } from 'react';
import { Form } from 'react-bootstrap';

const ThicknessSelection = ({ selectedThickness, handleThicknessChange, errors, setErrors }) => {
  const handleRadioChange = (event) => {
    const value = parseFloat(event.target.value);
    handleThicknessChange(value); // Use the passed function
  };

  const handleCustomInputChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      handleThicknessChange(parsedValue); // Use the passed function

      if (parsedValue < 12 || parsedValue > 30 || parsedValue === 20 || parsedValue === 30) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          thickness: 'Thickness must be between 12 and 30mm, excluding 20mm and 30mm.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          thickness: '',
        }));
      }
    } else {
      handleThicknessChange(''); // Optionally clear state or handle as needed
      setErrors((prevErrors) => ({
        ...prevErrors,
        thickness: 'Please enter a valid number.',
      }));
    }
  };

  return (
    <div className="quoteSection">
      <h2 className="hstyle">Select Thickness</h2>
      <Form.Check
        type="radio"
        id="thickness-20"
        label="20mm"
        name="thickness"
        value={20}
        checked={selectedThickness === 20}
        onChange={handleRadioChange}
      />
      <Form.Check
        type="radio"
        id="thickness-30"
        label="30mm"
        name="thickness"
        value={30}
        checked={selectedThickness === 30}
        onChange={handleRadioChange}
      />
      <Form.Label>Or enter custom thickness</Form.Label>
      <Form.Control
        type="text"
        value={selectedThickness}
        onChange={handleCustomInputChange}
        placeholder="Enter custom thickness"
      />
      {errors.thickness && <small className="text-danger">{errors.thickness}</small>}
    </div>
  );
};

export default memo(ThicknessSelection);
