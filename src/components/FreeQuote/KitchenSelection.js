import React, { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import galleyImage from '../../Images/galley.png';
import lShapeImage from '../../Images/l.png';
import uShapeImage from '../../Images/u.png';
import islandShapeImage from '../../Images/island.png';

const KitchenSelection = ({ formData, handleChange, errors, setErrors }) => {
    const [selectedKitchens, setSelectedKitchens] = useState(formData.kitchen || []);
    const [kitchenMeasurements, setKitchenMeasurements] = useState(formData.kitchenMeasurement || {});

    const handleCardClick = (label) => {
        const updatedKitchens = selectedKitchens.includes(label)
            ? selectedKitchens.filter(kitchen => kitchen !== label)
            : [...selectedKitchens, label];

        setSelectedKitchens(updatedKitchens);
        handleChange({ target: { name: 'kitchen', value: updatedKitchens } });

        // Clear kitchen selection error in parent
        if (updatedKitchens.length > 0) {
            setErrors((prev) => ({ ...prev, kitchenSelection: '' }));
        }
    };

    const handleMeasurementChange = (label, e) => {
        const value = e.target.value;
        const regex = /^\d+\s*x\s*\d+$/;
    
        // Check if the value matches "number x number" exactly
        if (!regex.test(value)) {
            setErrors((prev) => ({
                ...prev,
                [`kitchenMeasurement_${label}`]: 'Please enter exactly two numbers in "Width x Height" format, e.g., 300 x 200.',
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [`kitchenMeasurement_${label}`]: '',
            }));
        }
    
        setKitchenMeasurements(prev => ({ ...prev, [label]: value }));
        handleChange({ target: { name: 'kitchenMeasurement', value: { ...kitchenMeasurements, [label]: value } } });
    };
    
    

    return (
        <section>
            <h2>Select Kitchen Types</h2>
            <Row>
                {[
                    { label: 'Gallery', image: galleyImage },
                    { label: 'L Shape', image: lShapeImage },
                    { label: 'U Shape', image: uShapeImage },
                    { label: 'Island Shape', image: islandShapeImage },
                ].map(({ label, image }) => (
                    <Col xs={6} md={4} key={label}>
                        <Card
                            className={`measurement-card ${selectedKitchens.includes(label) ? 'selected' : ''}`}
                            onClick={() => handleCardClick(label)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Card.Img variant="top" src={image} alt={`${label} Image`} />
                            <Card.Body>
                                <Card.Title>{label}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {errors.kitchenSelection && <p className="text-danger">{errors.kitchenSelection}</p>}

            {selectedKitchens.length > 0 && selectedKitchens.map((kitchen) => (
                <Form.Group key={kitchen} controlId={`kitchenMeasurement_${kitchen}`}>
                    <br></br>
                    <h5 className='hstyle'>Enter {kitchen} Measurement</h5>
                    <Form.Control
                        type="text"
                        name={`kitchenMeasurement_${kitchen}`}
                        value={kitchenMeasurements[kitchen] || ''}
                        onChange={(e) => handleMeasurementChange(kitchen, e)}
                        placeholder="Width x Height"
                        isInvalid={!!errors[`kitchenMeasurement_${kitchen}`]}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors[`kitchenMeasurement_${kitchen}`]}
                    </Form.Control.Feedback>
                </Form.Group>
            ))}
        </section>
    );
};

export default KitchenSelection;
