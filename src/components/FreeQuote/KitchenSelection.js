import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import galleyImage from '../../Images/galley.png';
import lShapeImage from '../../Images/l.png';
import uShapeImage from '../../Images/u.png';
import islandShapeImage from '../../Images/island.png';

const maxMeasurementsPerKitchen = {
    'Gallery': 6,
    'L Shape': 6,   
    'U Shape': 6,  
    'Island Shape': 4  
};

const KitchenSelection = ({ formData, handleChange, errors, setErrors }) => {
    const [selectedKitchens, setSelectedKitchens] = useState(formData.kitchen || []);
    const [kitchenMeasurements, setKitchenMeasurements] = useState(formData.kitchenMeasurement || {});

    const handleCardClick = (label) => {
        const updatedKitchens = selectedKitchens.includes(label)
            ? selectedKitchens.filter(kitchen => kitchen !== label)
            : [...selectedKitchens, label];

        setSelectedKitchens(updatedKitchens);
        handleChange({ target: { name: 'kitchen', value: updatedKitchens } });

        if (updatedKitchens.length > 0) {
            setErrors((prev) => ({ ...prev, kitchenSelection: '' }));
        }
    };

    const handleMeasurementChange = (label, index, value) => {
        const regex = /^\d+\s*x\s*\d+$/;

        const measurements = kitchenMeasurements[label] || [];
        measurements[index] = value;

        if (value && !regex.test(value)) {
            setErrors((prev) => ({
                ...prev,
                [`kitchenMeasurement_${label}_${index}`]: 'Please enter exactly two numbers in "Width x Height" format, e.g., 300 x 200.',
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [`kitchenMeasurement_${label}_${index}`]: '',
            }));
        }

        setKitchenMeasurements(prev => ({ ...prev, [label]: measurements }));
        handleChange({ target: { name: 'kitchenMeasurement', value: { ...kitchenMeasurements, [label]: measurements } } });
    };

    const addMeasurement = (label) => {
        const measurements = kitchenMeasurements[label] || [];
        
        // Check if current number of measurements is less than the max allowed for the kitchen type
        if (measurements.length < maxMeasurementsPerKitchen[label]) {
            setKitchenMeasurements(prev => ({ ...prev, [label]: [...measurements, ''] }));
        } else {
            alert(`You can only add up to ${maxMeasurementsPerKitchen[label]} measurements for ${label}.`);
        }
    };

    const removeMeasurement = (label, index) => {
        const measurements = kitchenMeasurements[label].filter((_, i) => i !== index);
        setKitchenMeasurements(prev => ({ ...prev, [label]: measurements }));
    };

    return (
        <section style={{ padding: '20px' }}>
            <h2>Select Kitchen Types</h2>
            <Row>
    {[ 
        { label: 'Gallery', image: galleyImage },
        { label: 'L Shape', image: lShapeImage },
        { label: 'U Shape', image: uShapeImage },
        { label: 'Island Shape', image: islandShapeImage },
    ].map(({ label, image }) => (
        <Col lg={4} md={6} sm={6} xs={12} key={label}> {/* Now showing 3 columns on large screens, 2 on medium, and 1 on small */}
            <Card
                className={`measurement-card ${selectedKitchens.includes(label) ? 'selected' : ''}`}
                onClick={() => handleCardClick(label)}
                style={{ cursor: 'pointer', padding: '10px' }}
            >
                <Card.Img variant="top" src={image} alt={`${label} Image`} />
                <Card.Body style={{ padding: '15px' }}>
                    <Card.Title>{label}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    ))}
</Row>

            {errors.kitchenSelection && <p className="text-danger">{errors.kitchenSelection}</p>}

            {selectedKitchens.length > 0 && selectedKitchens.map((kitchen) => (
                <div key={kitchen}>

                    
                    <h5 className='hstyle' style={{ padding: '10px 0' }}>Enter {kitchen} Measurements</h5>
                      <Row>
                    {(kitchenMeasurements[kitchen] || []).map((measurement, index) => (
                        <Col lg={4} sm={6} xs={12} key={index}> {/* توزيع الأعمدة لقياسات كل شكل */}

                        <Form.Group key={index} controlId={`kitchenMeasurement_${kitchen}_${index}`} style={{ marginBottom: '15px' }}>

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
                            <Button variant="danger" onClick={() => removeMeasurement(kitchen, index)} style={{ marginTop: '10px' }}>Remove</Button>

                        </Form.Group>
                        </Col>

                    ))}
                    </Row>
                    <div>
    <Button
        variant="primary"
        onClick={() => addMeasurement(kitchen)}
        style={{
            backgroundColor: 'darkgoldenrod',
            color: 'white',
            padding: '12px',
             cursor: 'pointer',
        }}
    >
        Add Measurement
    </Button>
    <hr style={{ margin: '20px 0', border: '3px solid #cccc' }} />
</div>

                </div>
            ))}
        </section>
    );
};

export default KitchenSelection;
