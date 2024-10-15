import React, { memo, useState } from 'react';
import { Form } from 'react-bootstrap';

const ThicknessSelection = ({ formData, handleChange, errors }) => {
  const { thickness } = formData || ''; // Get thickness from formData or default to an empty string
  const [customThickness, setCustomThickness] = useState(thickness !== 20 && thickness !== 30 ? thickness : '');

  // Handle radio button selection
  const handleRadioChange = (event) => {
    const value = parseFloat(event.target.value);
    handleChange({ target: { name: 'thickness', value } });
    setCustomThickness(''); // Clear custom input when selecting 20 or 30
  };

  // Handle custom input change for values between 12 and 30 (excluding 20, 30)
  const handleCustomInputChange = (event) => {
    const value = event.target.value;
    const parsedValue = parseFloat(value);

    // Allow only values between 12 and 30 (excluding 20 and 30)
    if ((parsedValue >= 12 && parsedValue <= 30) && value !== '20' && value !== '30') {
      setCustomThickness(parsedValue);
      handleChange({ target: { name: 'thickness', value: parsedValue } });
    } else {
      setCustomThickness('');
      handleChange({ target: { name: 'thickness', value: '' } });
    }
  };

  return (
    <div className="quoteSection">
      <h2 className="hstyle">Choose your Thickness</h2>

      {/* Radio button for 20mm */}
      <Form.Check
        type="radio"
        id="thickness-20"
        label="20mm"
        name="thickness"
        value={20}
        checked={thickness === 20}
        onChange={handleRadioChange}
      />

      {/* Radio button for 30mm */}
      <Form.Check
        type="radio"
        id="thickness-30"
        label="30mm"
        name="thickness"
        value={30}
        checked={thickness === 30}
        onChange={handleRadioChange}
      />

      <Form.Label>Or enter a custom thickness  </Form.Label>

      {/* Custom input field */}
      <Form.Control
        type="number"
        value={customThickness || ''}
        onChange={handleCustomInputChange}
        min={12}
        max={30}
        placeholder="Enter custom thickness"
      />

      {errors.thickness && <small className="text-danger">{errors.thickness}</small>}
    </div>
  );
};

export default memo(ThicknessSelection);
