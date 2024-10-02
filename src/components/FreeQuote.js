import React, { useState, useRef } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import materialPhotos from '../data/materialPhotos';
import MaterialSelection from './FreeQuote/MaterialSelection';
import MaterialTypeSelection from './FreeQuote/MaterialTypeSelection';
import MaterialColorInput from './FreeQuote/MaterialColorInput';
import KitchenSelection from './FreeQuote/KitchenSelection';
import ShapeSelection from './FreeQuote/ShapeSelection';
import PersonalDetailsForm from './FreeQuote/PersonalDetailsForm';
import Notes from './FreeQuote/Notes';
import TermsAndSubmit from './FreeQuote/TermsAndSubmit';
import { Helmet } from 'react-helmet'; // Import Helmet


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
  shape: [],
  shapeMeasurement: {},
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

  const [loading, setLoading] = useState(false);
  const errorRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear specific error on change
    setErrors((prev) => ({
      ...prev,
      [name]: '', // Clear the error for the field being changed
    }));
  };

  const handleMaterialTypeChange = (e) => {
    setSelectedMaterialType(e.target.value);
    setErrors((prev) => ({ ...prev, materialType: '' })); // Clear error for material type
  };

  const handleMaterialColorChange = (e) => {
    setMaterialColor(e.target.value);
    setErrors((prev) => ({ ...prev, materialColor: '' })); // Clear error for material color
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    setErrors((prev) => ({ ...prev, material: '' })); // Clear error for material selection
  };

  const handleFileUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      photos: Array.from(e.target.files),
    }));
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
    };

    // Validate required fields
    Object.keys(requiredFields).forEach((field) => {
        const label = requiredFields[field];
        const error = Array.isArray(label)
            ? validateField(field, label[0], label[1])
            : validateField(field, label);
        if (error) newErrors[field] = error;
    });

    // Material selection validation
    if (!selectedMaterial) newErrors.material = 'Material selection is required.';
    if (!selectedMaterialType) newErrors.materialType = 'Material type is required.';
    if (!materialColor) newErrors.materialColor = 'Material color is required.';

    // Kitchen selection validation
    if (formData.kitchen.length === 0) {
        newErrors.kitchenSelection = 'Please select at least one kitchen option.';
    } else {
        formData.kitchen.forEach((kitchen) => {
            if (!formData.kitchenMeasurement[kitchen]) {
                newErrors[`kitchenMeasurement_${kitchen}`] = 'Measurement is required for this kitchen type.';
            }
        });
    }

    // Shape selection validation
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
    return Object.keys(newErrors).length === 0; // Return true if no errors found
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlertMessage('Please fill in all required fields correctly.');
      setAlertType('error');
      errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    const formDataToSend = new FormData();
    
    // Only append photos if there are any
    if (formData.photos.length > 0) {
      formData.photos.forEach((file) => formDataToSend.append('photos', file));
    }

    Object.keys(formData).forEach((key) => {
      if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append('materialType', selectedMaterialType);
    formDataToSend.append('materialColor', materialColor);
    formDataToSend.append('materialName', selectedMaterial);

    try {
      const response = await fetch(
        process.env.REACT_APP_QUOTES_API_URL || 'http://localhost:5000/api/quotes',
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send quote request.');
      }

      setAlertMessage('Your request has been sent successfully!');
      setAlertType('success');
      setTimeout(() => window.location.reload(), 3000);
    } catch (error) {
      setAlertMessage('Failed to send the request, please try again.');
      setAlertType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
     <Helmet>
        <title>GalmStone - Free Online Quote</title>
        <meta name="description" content="Request a free quote for your kitchen project and enjoy expert guidance and competitive pricing." />
        </Helmet>
      <Container style={{ paddingTop: '8px' }}>
        <Container className="py-5">
          <h2 className="hstyle text-center mb-4">Free Online Quote</h2>

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

<section className="quoteSection">
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
    setErrors={setErrors} // Pass setErrors as a prop
  />
</section>

<section className="quoteSection">
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
    setErrors={setErrors} // Pass setErrors as a prop
  />
</section>


            <PersonalDetailsForm formData={formData} handleChange={handleChange} errors={errors} />

            <Form.Group className="quoteSection">
              <h2>Upload Your Photos (optional)</h2>
              <Form.Control type="file" multiple onChange={handleFileUpload} />
            </Form.Group>

            <Notes additionalNotes={formData.additionalNotes} handleChange={handleChange} />

            {alertMessage && (
              <Alert ref={errorRef} variant={alertType === 'error' ? 'danger' : 'success'}>
                {alertMessage}
              </Alert>
            )}

            <TermsAndSubmit 
              loading={loading}
              termsAgreed={termsAgreed}
              setTermsAgreed={setTermsAgreed}
            />
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default FreeQuote;
