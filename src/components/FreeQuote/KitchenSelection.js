import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import galleyImage from '../../Images/galley.png';
import lShapeImage from '../../Images/l.png';
import uShapeImage from '../../Images/u.png';
import islandShapeImage from '../../Images/island.png';

const kitchenOptions = {
    'Gallery': { image: galleyImage, labelCount: 4 },
    'L Shape': { image: lShapeImage, labelCount: 2 },
    'U Shape': { image: uShapeImage, labelCount: 3 },
    'Island Shape': { image: islandShapeImage, labelCount: 2 }
};

const KitchenSelection = ({ formData, handleChange, errors, setErrors }) => {
    const [selectedKitchen, setSelectedKitchen] = useState('');
    const [kitchenMeasurements, setKitchenMeasurements] = useState(formData.kitchenMeasurement || {});
    const [showMeasurements, setShowMeasurements] = useState(false); // لحفظ حالة عرض المقاسات

    const handleKitchenChange = (e) => {
        const kitchen = e.target.value;
        const newKitchenArray = formData.kitchen.includes(kitchen)
            ? formData.kitchen.filter(item => item !== kitchen) // إزالة في حال كانت موجودة
            : [...formData.kitchen, kitchen]; // إضافة في حال عدم وجودها

        setSelectedKitchen(kitchen);
        handleChange({ target: { name: 'kitchen', value: newKitchenArray } });
        setErrors((prev) => ({ ...prev, kitchenSelection: '' }));
    };

    const handleMeasurementChange = (label, index, value) => {
        const regex = /^\d+\s*x\s*\d+$/; // Regex for "Width x Height" format
        const updatedMeasurements = { ...kitchenMeasurements }; // Clone the current kitchen measurements
    
        if (!updatedMeasurements[label]) {
            updatedMeasurements[label] = Array(kitchenOptions[label].labelCount).fill(''); // Ensure the label exists with an empty array
        }
    
        updatedMeasurements[label][index] = value; // Update the specific measurement at the given index
    
        if (value && !regex.test(value)) {
            setErrors(prev => ({
                ...prev,
                [`kitchenMeasurement_${label}_${index}`]: 'Please enter exactly two numbers in "Width x Height" format, e.g., 300 x 200.',
            }));
        } else {
            setErrors(prev => ({
                ...prev,
                [`kitchenMeasurement_${label}_${index}`]: '', // Clear the error for this input if valid
            }));
        }
    
        setKitchenMeasurements(updatedMeasurements); // Update the kitchen measurements in state
        handleChange({ target: { name: 'kitchenMeasurement', value: updatedMeasurements } }); // Pass the updated measurements to the parent formData
    };
    

    const renderMeasurementFields = (kitchen) => {
        const labelCount = kitchenOptions[kitchen]?.labelCount || 0;
        const measurements = kitchenMeasurements[kitchen] || Array(labelCount).fill('');

        if (!showMeasurements) return null;

        return (
            <Row>
                {measurements.map((measurement, index) => (
                    <Col lg={4} sm={6} xs={12} key={index}>
                        <Form.Group controlId={`kitchenMeasurement_${kitchen}_${index}`} style={{ marginBottom: '15px' }}>
                            <Form.Label>Measurement {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                name={`kitchenMeasurement_${kitchen}_${index}`}
                                value={measurement}
                                onChange={(e) => handleMeasurementChange(kitchen, index, e.target.value)}
                                placeholder="Width x Height"
                                isInvalid={!!errors[`kitchenMeasurement_${kitchen}_${index}`]}
                                style={{ padding: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors[`kitchenMeasurement_${kitchen}_${index}`]}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <section className="quoteSection">
            <h2>Select Kitchen Type</h2>

            <Form.Group controlId="kitchenType">
                <Form.Control as="select" value={selectedKitchen} onChange={handleKitchenChange}>
                    <option value="">Select Kitchen Type</option>
                    {Object.keys(kitchenOptions).map((kitchen) => (
                        <option key={kitchen} value={kitchen}>
                            {kitchen}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>

            {errors.kitchenSelection && <p className="text-danger">{errors.kitchenSelection}</p>}

            {selectedKitchen && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    {!showMeasurements ? (
                        <>
                            <img
                                src={kitchenOptions[selectedKitchen].image}
                                alt={selectedKitchen} // وصف بديل
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain'
                                }} // ستايل الصور لتكون متجاوبة
                            />
                            <div style={{ marginTop: '10px' }}>
                                <Button
                                    variant="primary"
                                    style={{
                                    backgroundColor: 'darkgoldenrod',
                                    color: 'white',
                                    padding: '12px',
                                    cursor: 'pointer',
                                    }}
                                    onClick={() => setShowMeasurements(true)} // تعديل لعرض المقاسات
                                >
                                    Add Optional Measurements
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Row>
                            <Col lg={6} md={6} sm={12} style={{ textAlign: 'center' }}>
                                <img
                                    src={kitchenOptions[selectedKitchen].image}
                                    alt={selectedKitchen} // وصف بديل
                                    style={{
                                        width: '450px',
                                        height: 'auto',
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'contain',
                                        marginTop: '10px'
                                    }} // ستايل الصور لتكون متجاوبة
                                />
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Card style={{ marginTop: '20px' }}>
                                    <Card.Body>
                                        <Card.Title style={{ marginBottom: '16px' }}>{selectedKitchen}</Card.Title>
                                         {renderMeasurementFields(selectedKitchen)}
                                       
                                    </Card.Body>
                                </Card>
                                 <Button
                                            variant="secondary"
                                            onClick={() => setShowMeasurements(false)} // إضافة زر لإخفاء المقاسات
                                            style={{ marginTop: '10px' }}
                                        >
                                            Hide Measurements
                                        </Button>
                            </Col>
                        </Row>
                    )}
                </div>
            )}
        </section>
    );
};

 
export default KitchenSelection;
