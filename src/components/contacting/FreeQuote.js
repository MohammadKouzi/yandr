import React, { useState, useRef } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import materialPhotos from '../../data/materialPhotos';
import MaterialSelection from '../FreeQuote/MaterialSelection';
import MaterialTypeSelection from '../FreeQuote/MaterialTypeSelection';
import MaterialColorInput from '../FreeQuote/MaterialColorInput';
import KitchenSelection from '../FreeQuote/KitchenSelection';
import ShapeSelection from '../FreeQuote/ShapeSelection';
import PersonalDetailsForm from '../FreeQuote/PersonalDetailsForm';
import Notes from '../FreeQuote/Notes';
import TermsAndSubmit from '../FreeQuote/TermsAndSubmit';
import Features from '../FreeQuote/Features'; // Add Features import
import ThicknessSelection from '../FreeQuote/ThicknessSelection'; // Add ThicknessSelection import
import { Helmet } from 'react-helmet';  

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  postcode: '',
  installationDate: '',
  additionalNotes: '',
  photos: [], // Optional field
  kitchen: [],
  kitchenMeasurement: {},
  shape: [],  // Initialized as an empty array
  shapeMeasurement: {},  // Initialized as an empty object
  features: '',  // Initialize optional feature field as empty
  thickness: '', // Make thickness an empty string for validation
};

const FreeQuote = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [materialColor, setMaterialColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
   const errorRef = useRef(null);
  const handleFileUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      photos: Array.from(e.target.files),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
   
    setErrors((prev) => ({
      ...prev,
      [name]: '', // Clear the error for the field being changed
    }));
  };

  const handleMaterialTypeChange = (e) => {
    setSelectedMaterialType(e.target.value);
    setErrors((prev) => ({ ...prev, materialType: '' }));
  };

  const handleMaterialColorChange = (e) => {
    setMaterialColor(e.target.value);
    setErrors((prev) => ({ ...prev, materialColor: '' }));
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    setErrors((prev) => ({ ...prev, material: '' }));
  };

  const validateField = (field, label, regex) => {
    if (!formData[field]) {
      return `${label} is required.`;
    }
    if (regex && !regex.test(formData[field])) {
      return `Invalid ${label.toLowerCase()}.`;
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      name: 'Name',
      email: ['Email', /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/],
      phone: ['Phone', /^\+?[0-9]{7,15}$/],
      postcode: 'Postcode',
      installationDate: 'Installation date',
      thickness: 'Thickness' // Added thickness as a required field
    };

    Object.keys(requiredFields).forEach((field) => {
      const label = requiredFields[field];
      const error = Array.isArray(label)
        ? validateField(field, label[0], label[1])
        : validateField(field, label);
      if (error) newErrors[field] = error;
    });

    // Make material selection optional
    if (!selectedMaterial && selectedMaterialType) {
      newErrors.material = 'Material selection is optional, but if a type is selected, a material must be chosen.';
    }
    if (!selectedMaterialType) newErrors.materialType = 'Material type is optional.';

    // Validate material color only if a material type is selected
    if (selectedMaterialType && !materialColor) {
      newErrors.materialColor = 'Material color is required if a type is selected.';
    }

    // Validate kitchen selection
    if (formData.kitchen.length === 0) {
      newErrors.kitchenSelection = 'Please select at least one kitchen option.';
    } else {
      formData.kitchen.forEach((kitchen) => {
        if (!formData.kitchenMeasurement[kitchen]) {
          newErrors[`kitchenMeasurement_${kitchen}`] = 'Measurement is required for this kitchen type.';
        }
      });
    }

    // Validate shape selection
    if (formData.shape.length === 0) {
      newErrors.shapeSelection = 'Please select at least one shape option.';
    } else {
      formData.shape.forEach((shape) => {
        if (!formData.shapeMeasurement[shape]) {
          newErrors[`shapeMeasurement_${shape}`] = 'Measurement is required for this shape type.';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlertMessage('Please fill in all required fields correctly.');
      setAlertType('danger'); // Change 'error' to 'danger'
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
  
    // Add any further processing logic here (if needed)
  };
  

  return (
    <div className="body">
      <Helmet>
        <title>GlamStone - Free Online Quote</title>
        <meta name="description" content="Request a free quote for your kitchen project and enjoy expert guidance and competitive pricing." />
      </Helmet>
      <Container className="section2">
        <br />
        <h1 className="text-center hstyle"> Free Online Quote</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <MaterialSelection
            materialPhotos={materialPhotos}
            onMaterialSelect={handleMaterialSelect}
            error={errors.material}
          />
          <MaterialTypeSelection
            selectedMaterialType={selectedMaterialType}
            handleMaterialTypeChange={handleMaterialTypeChange}
            error={errors.materialType}
          />
          <MaterialColorInput
            materialColor={materialColor}
            handleMaterialColorChange={handleMaterialColorChange}
            error={errors.materialColor}
          />

             <KitchenSelection
              formData={formData}
              handleChange={handleChange}
              kitchenMeasurements={formData.kitchenMeasurement}
              setKitchenMeasurements={(newMeasurements) =>
                setFormData((prev) => ({
                  ...prev,
                  kitchenMeasurement: newMeasurements,
                }))
              }
              errors={errors}
              setErrors={setErrors}
            />
 
        
            <ShapeSelection
              formData={formData}
              handleChange={handleChange}
              shapeMeasurements={formData.shapeMeasurement}
              setShapeMeasurements={(newMeasurements) =>
                setFormData((prev) => ({
                  ...prev,
                  shapeMeasurement: newMeasurements,
                }))
              }
              errors={errors}
              setErrors={setErrors}
            />
       

          {/* Add Features Component */}
          <Features formData={formData} handleChange={handleChange} /> 

          {/* Add ThicknessSelection Component */}
          <ThicknessSelection formData={formData} handleChange={handleChange} errors={errors} />

          <PersonalDetailsForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
  <Form.Group className="quoteSection">
            <h2>Upload Your Project Plan</h2>
            <Form.Control type="file" multiple onChange={handleFileUpload} />
          </Form.Group>
          <Notes
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
           

          <TermsAndSubmit
            termsAgreed={termsAgreed}
            setTermsAgreed={setTermsAgreed}
            handleSubmit={handleSubmit}
          />

          {alertMessage && (
            <Alert variant={alertType} ref={errorRef}>
              {alertMessage}
            </Alert>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default FreeQuote;
