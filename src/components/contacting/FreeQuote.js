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

  const handleThicknessChange = (value) => {
    setFormData((prev) => ({ ...prev, thickness: value }));
    setErrors((prev) => ({ ...prev, thickness: '' })); // Clear error for this field
  };

  const handleMaterialTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      materialType: value === 'Other' ? 'Other' : value,
      materialTypeCustom: value === 'Other' ? prev.materialTypeCustom : '',
    }));
    setErrors((prev) => ({ ...prev, materialType: '' })); // Clear error for this field
  };
  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    // Clear existing error for this field
    setErrors((prev) => ({ ...prev, [name]: '' }));
  
    // Validation logic
    if (name === 'email') {
      const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      }
    }
  
    if (name === 'phone') {
      const phoneRegex = /^\+44[0-9]{10}$/; // UK phone number format
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({ ...prev, phone: 'Please enter a valid UK phone number starting with +44.' }));
      }
    }
  
    if (name === 'postcode') {
      const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9]?[A-Z]?\s?[0-9][A-Z]{2}$/i; // UK postcode format
      if (!postcodeRegex.test(value)) {
        setErrors((prev) => ({ ...prev, postcode: 'Please enter a valid UK postcode.' }));
      }
    }
  };
  
  const FILE_SIZE_LIMIT = 3 * 1024 * 1024; // 3MB in bytes

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];
    let fileSizeError = '';
  
    files.forEach((file) => {
      if (file.size > FILE_SIZE_LIMIT) {
        fileSizeError = `${file.name} exceeds the 3MB size limit.`;
      } else {
        validFiles.push(file); // Only add valid files
      }
    });
  
    if (fileSizeError) {
      setAlertMessage(fileSizeError);  // Show the error message in the UI
      setAlertType('danger');
      return;  // Exit without updating the form data if any file is too large
    }
  
    setFormData((prev) => ({
      ...prev,
      photos: validFiles,  // Only store files that are within size limit
    }));
  };
  
  
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = {
      name: 'Name',
      email: ['Email', /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/], // Regex for email validation
      phone: ['Phone', /^\+?[0-9]{7,15}$/], // Regex for phone validation
      postcode: 'Postcode',
      thickness: 'Thickness',
      materialType: 'Material type',
      selectedSupplier: 'Supplier',
    };

    Object.keys(requiredFields).forEach((field) => {
      const label = requiredFields[field];

      // Check if the field is empty or not
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        newErrors[field] = `${Array.isArray(label) ? label[0] : label} is required.`;
        return; // Skip further validation for this field
      }

      // Check if the field has a regex for validation
      if (Array.isArray(label) && label[1] && !label[1].test(formData[field])) {
        newErrors[field] = `${label[0]} is not valid.`; // Use the first element of the array
      }
    });

    // Custom supplier validation
    if (formData.selectedSupplier === 'Other' && !formData.customSupplier) {
      newErrors.customSupplier = 'Please provide the custom supplier name.';
    }

    // Custom material type validation
    if (formData.materialType === 'Other' && !formData.materialTypeCustom) {
      newErrors.materialTypeCustom = 'Please provide the custom material type.';
    }

    if (formData.kitchen.length === 0) {
      newErrors.kitchenSelection = 'Kitchen selection is required.';
    }
    
    if (formData.shape.length === 0) {
      newErrors.shapeSelection = 'Shape selection is required.';
    }

    // Set errors to state
    setErrors(newErrors);

    // Return true if no errors, false otherwise
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
      acc[shape] = allEmptyOrNA ? 'None' : formData.shapeMeasurement[shape];
      return acc;
    }, {});

    const allNone = Object.values(shapeMeasurement).every((value) => value === 'None');

    const quoteData = {
      ...formData,
      selectedSupplier: formData.selectedSupplier === 'Other' ? formData.customSupplier : formData.selectedSupplier,
      shapeMeasurement: allNone ? 'None' : shapeMeasurement,
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
            handleMaterialTypeChange={handleMaterialTypeChange}
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

          <Features
            formData={formData}
            handleChange={(e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          />
          
          <ThicknessSelection
  selectedThickness={formData.thickness} // Make sure you're passing the right value
  handleThicknessChange={handleThicknessChange} // This should be the defined function
  errors={errors}
  setErrors={setErrors} // Ensure this is also passed if you're using it in ThicknessSelection
/>




 <PersonalDetailsForm
  formData={formData}
  handleChange={handlePersonalDetailsChange} // Ensure this is the correct function
  errors={errors}
/>

          <Notes
            formData={formData}
            handleChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
            }}
          />

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