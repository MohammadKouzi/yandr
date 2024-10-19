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
  installationDate: '', // Optional
  additionalNotes: '', // Optional
  photos: [],
  kitchen: [],
  kitchenMeasurement: '',
  shape: '',
  shapeMeasurement: '',  
  features: '',
  thickness: '',
  materialType: '',
};

const FreeQuote = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [materialColor, setMaterialColor] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const errorRef = useRef(null);
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const handleSupplierChange = (e) => {
    const { value } = e.target;
    setSelectedSupplier(value);
    setFormData((prev) => ({
      ...prev,
      selectedSupplier: value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: files,
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
      [name]: '',
    }));
  };

  const handleMaterialColorChange = (e) => {
    setMaterialColor(e.target.value);
    setErrors((prev) => ({ ...prev, materialColor: '' }));
  };

  const handleMaterialTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      materialType: value,
    }));
    setErrors((prev) => ({ ...prev, materialType: '' }));
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
      thickness: 'Thickness',
      materialType: 'Material type',
    };

    Object.keys(requiredFields).forEach((field) => {
      const label = requiredFields[field];
      const error = Array.isArray(label)
        ? validateField(field, label[0], label[1])
        : validateField(field, label);
      if (error) {
        newErrors[field] = error;
        console.log(`Validation error for ${label}: ${error}`);
      }
    });

    if (formData.kitchen.length === 0) {
      newErrors.kitchenSelection = 'User didn’t choose any kitchen option. Please select at least one.';
      console.log('Validation error for kitchen selection: User didn’t choose any kitchen option.');
    }

    if (formData.shape.length === 0) {
      newErrors.shapeSelection = 'User didn’t choose any shape option. Please select at least one.';
      console.log('Validation error for shape selection: User didn’t choose any shape option.');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  
    if (!validateForm()) {
      console.log('Form validation failed. Errors:', errors);
      setAlertMessage('Please fill in all required fields correctly.');
      setAlertType('danger');
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // تحقق مما إذا كان قد تم اختيار أي شكل
    const shapeMeasurement = Object.keys(formData.shapeMeasurement).length > 0 ? formData.shapeMeasurement : "none";
  
    const quoteData = {
      ...formData,
      shapeMeasurement: JSON.stringify(shapeMeasurement), // Serialize shapeMeasurement to JSON
      selectedSupplier: selectedSupplier || 'User didn’t choose any supplier.',
    };
  
    console.log('Data to be sent:', quoteData);
  
    // Create FormData object for file uploads
    const formDataObj = new FormData();
    Object.keys(quoteData).forEach((key) => {
      formDataObj.append(key, quoteData[key]);
    });
  
    formData.photos.forEach((photo) => {
      formDataObj.append('photos', photo);
    });
  
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
  
      // Refresh the page after 3 seconds
      setTimeout(() => {
        window.location.reload();
      }, 3000);
  
    } catch (error) {
      setAlertMessage('Failed to submit your request. Please try again.');
      setAlertType('danger');
      console.error('Submission error:', error);
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
        <h1 className="text-center hstyle"> Free Online Quote</h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Suppliers
            selectedSupplier={formData.selectedSupplier}
            handleSupplierChange={handleSupplierChange}
            error={errors.selectedSupplier}
          />

          <MaterialColor
            materialColor={materialColor}
            handleMaterialColorChange={handleMaterialColorChange}
            error={errors.materialColor}
          />

          <MaterialTypeSelection
            selectedMaterialType={formData.materialType}
            handleMaterialTypeChange={handleMaterialTypeChange}
            error={errors.materialType}
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
            shapeMeasurements={formData.shapeMeasurement} // Handle same as kitchenMeasurement
            setShapeMeasurements={(newMeasurements) =>
              setFormData((prev) => ({
                ...prev,
                shapeMeasurement: newMeasurements,
              }))
            }
            errors={errors}
            setErrors={setErrors}
          />
          <Features formData={formData} handleChange={handleChange} />
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
