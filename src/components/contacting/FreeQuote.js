import React, { useState, useRef } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import MaterialColor from '../FreeQuote/MaterialColor';
import KitchenSelection from '../FreeQuote/KitchenSelection';
import ShapeSelection from '../FreeQuote/ShapeSelection';
import PersonalDetailsForm from '../FreeQuote/PersonalDetailsForm';
import Notes from '../FreeQuote/Notes';
import TermsAndSubmit from '../FreeQuote/TermsAndSubmit';
import Features from '../FreeQuote/Features';
import ThicknessSelection from '../FreeQuote/ThicknessSelection';
import Suppliers from '../FreeQuote/Suppliers';
import MaterialTypeSelection from '../FreeQuote/MaterialTypeSelection';
import { Helmet } from 'react-helmet';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  postcode: '',
  installationDate: '',
  additionalNotes: '',
  photos: [],
  kitchen: [],
  kitchenMeasurement: '',
  shape: '',
  shapeMeasurement: '',
  features: '',
  thickness: '',
  materialType: '',
  materialTypeCustom: '',
  selectedSupplier: '',
  customSupplier: '',
 };

const FreeQuote = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [materialColor, setMaterialColor] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const errorRef = useRef(null);

  const handleSupplierChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      selectedSupplier: value === 'Other' ? 'Other' : value,
      customSupplier: value === 'Other' ? prev.customSupplier : '',
    }));
    setErrors((prev) => ({ ...prev, selectedSupplier: '' }));
  };

  const handleCustomSupplierChange = (customSupplier) => {
    setFormData((prev) => ({
      ...prev,
      customSupplier,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: files,
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      name: 'Name',
      email: ['Email', /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/],
      phone: ['Phone', /^\+?[0-9]{7,15}$/],
      postcode: 'Postcode',
      thickness: 'Thickness',
      materialType: 'Material type',
      selectedSupplier: 'Supplier',
    };
  
    Object.keys(requiredFields).forEach((field) => {
      const label = requiredFields[field];
  
      // Check if the field is empty
      if (!formData[field]) {
        newErrors[field] = `${label} is required.`;
        return;
      }
  
      // Check if the field has a regex for validation
      if (Array.isArray(label) && label[1] && !label[1].test(formData[field])) {
        newErrors[field] = `${label[0]} is not valid.`;
      }
    });
  
    // Custom supplier validation
    if (formData.selectedSupplier === 'Other' && !formData.customSupplier) {
      newErrors.customSupplier = 'Please provide the custom supplier name.';
    }
  
    if (formData.materialType === 'Other' && !formData.materialTypeCustom) {
      newErrors.materialTypeCustom = 'Please provide the custom material type.';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlertMessage('Please fill in all required fields correctly.');
      setAlertType('danger');
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const shapeMeasurement = Object.keys(formData.shapeMeasurement).reduce((acc, shape) => {
      const allEmptyOrNA = formData.shapeMeasurement[shape].every(
        (measurement) => !measurement || measurement === 'N/A'
      );
      acc[shape] = allEmptyOrNA ? 'none' : formData.shapeMeasurement[shape];
      return acc;
    }, {});

    const allNone = Object.values(shapeMeasurement).every((value) => value === 'none');

    const quoteData = {
      ...formData,
      selectedSupplier: formData.selectedSupplier === 'Other' ? formData.customSupplier : formData.selectedSupplier,
      shapeMeasurement: allNone ? 'none' : shapeMeasurement,
      materialType: formData.materialType === 'Other' ? formData.materialTypeCustom : formData.materialType,
    };

    const formDataObj = new FormData();
    Object.keys(quoteData).forEach((key) => {
      const value = typeof quoteData[key] === 'object' ? JSON.stringify(quoteData[key]) : quoteData[key];
      formDataObj.append(key, value);
    });

    formData.photos.forEach((photo) => {
      formDataObj.append('photos', photo);
    });

    // Append the project file to the form data if present
    if (formData.projectFile) {
      formDataObj.append('projectFile', formData.projectFile);
    }

    try {
      const response = await fetch(process.env.REACT_APP_QUOTES_API_URL, {
        method: 'POST',
        body: formDataObj,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setAlertMessage('Your quote request has been submitted successfully!');
      setAlertType('success');
      setFormData(initialFormState);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setAlertMessage('Failed to submit your request. Please try again.');
      setAlertType('danger');
    }
  };

  return (
    <div className="body">
      <Helmet>
        <title>GlamStone - Free Online Quote</title>
        <meta name="description" content="Request a free quote for your kitchen project and enjoy expert guidance and competitive pricing." />
      </Helmet>
      <Container className="section2">
        <br />
        <h1 className="text-center hstyle">Free Online Quote</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Suppliers
            selectedSupplier={formData.selectedSupplier}
            handleSupplierChange={handleSupplierChange}
            handleCustomSupplierChange={handleCustomSupplierChange}
            error={errors.selectedSupplier}
            customSupplierError={errors.customSupplier}
          />

          <MaterialColor
            materialColor={materialColor}
            handleMaterialColorChange={(e) => setMaterialColor(e.target.value)}
            error={errors.materialColor}
          />

          <MaterialTypeSelection
            selectedMaterialType={formData.materialType}
            handleMaterialTypeChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                materialType: value === 'Other' ? 'Other' : value,
                materialTypeCustom: value === 'Other' ? formData.materialTypeCustom : '',
              }));
            }}
            handleCustomMaterialChange={(customMaterial) => {
              setFormData((prev) => ({
                ...prev,
                materialTypeCustom: customMaterial,
              }));
            }}
            error={errors.materialType}
            customMaterialError={errors.materialTypeCustom}
          />

      
          <KitchenSelection
            formData={formData}
            handleChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
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
            handleChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
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

          <Features formData={formData} handleChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          />
          <ThicknessSelection formData={formData} handleChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} errors={errors} />
          <PersonalDetailsForm formData={formData} handleChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} errors={errors} />
          <Notes formData={formData} handleChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))} />
          <Form.Group className="quoteSection">
            <h2>Upload Your Project Plan</h2>
            <Form.Control type="file" multiple onChange={handleFileUpload} />
          </Form.Group>
          {alertMessage && (
            <Alert ref={errorRef} variant={alertType} className="mt-3">
              {alertMessage}
            </Alert>
          )}

          <TermsAndSubmit termsAgreed={termsAgreed} setTermsAgreed={setTermsAgreed} />
        </Form>
      </Container>
    </div>
  );
};

export default FreeQuote;
