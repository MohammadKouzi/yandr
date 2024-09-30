import React, { memo, useMemo } from 'react';
import { Form } from 'react-bootstrap';

const ThicknessSelection = ({ formData, handleChange, errors }) => {
  const { thickness = 20 } = formData;
  const displayValue = useMemo(() => thickness, [thickness]);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    handleChange({ target: { name: 'thickness', value: parseFloat(value) || '' } });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    handleChange({ target: { name: 'thickness', value: parseFloat(value) || '' } });
  };

  return (
    <div className='quoteSection'>
      <div className="slider-container">
        <h2 className="hstyle">Choose your Thickness</h2>
        <Form.Label>{displayValue}mm</Form.Label>
        <br />
        <Form.Range
          min={20}
          max={30}
          value={displayValue}
          onChange={handleSliderChange}
        />
        <br />
        <Form.Label>or enter a custom thickness (in mm):</Form.Label>
        <Form.Control
          type="number"
          value={displayValue}
          onChange={handleInputChange}
          min={12}
          max={30}
          placeholder="Enter custom thickness"
        />
      </div>
      {errors.thickness && <small className="text-danger">{errors.thickness}</small>}
    </div>
  );
};

export default memo(ThicknessSelection);
