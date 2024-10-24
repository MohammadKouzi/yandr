import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import upstandsImage from '../../Images/Upstands.jpeg';
import sinkImage from '../../Images/SinkCutOut.jpeg';
import hobImage from '../../Images/HobCutOut.jpeg';
import drainersImage from '../../Images/DrainersGrooves.jpeg';
import splashBackImage from '../../Images/HobSplashback.jpeg';
import slopeImage from '../../Images/SlopeDownsSink.jpeg';

const maxMeasurementsPerShape = {
    'Upstands': 4,
    'Sink Cut Out': 4,
    'Hob Cut Out': 4,
    'Drainers Grooves': 4,
    'Hob Splashback': 4,
    'Slope Down Sink': 4,
};

const ShapeSelection = ({ formData, handleChange, errors, setErrors }) => {
    const [selectedShapes, setSelectedShapes] = useState(formData.shape || []);
    const [shapeMeasurements, setShapeMeasurements] = useState(formData.shapeMeasurement || {});
    const [showMeasurements, setShowMeasurements] = useState({});

    const handleCardClick = (label) => {
        const updatedShapes = selectedShapes.includes(label)
            ? selectedShapes.filter(shape => shape !== label)
            : [...selectedShapes, label];

        setSelectedShapes(updatedShapes);
        handleChange({ target: { name: 'shape', value: updatedShapes } });

        if (updatedShapes.length > 0) {
            setErrors((prev) => ({ ...prev, shapeSelection: '' }));
        }

        if (updatedShapes.includes(label) && !shapeMeasurements[label]) {
            const updatedMeasurements = {
                ...shapeMeasurements,
                [label]: Array(maxMeasurementsPerShape[label]).fill(''),
            };
            setShapeMeasurements(updatedMeasurements);
            handleChange({ target: { name: 'shapeMeasurement', value: updatedMeasurements } });
        } else if (!updatedShapes.includes(label)) {
            const { [label]: _, ...remainingMeasurements } = shapeMeasurements;
            setShapeMeasurements(remainingMeasurements);
            handleChange({ target: { name: 'shapeMeasurement', value: remainingMeasurements } });
        }
    };

    const handleMeasurementChange = (label, index, value) => {
        const regex = /^\d+\s*x\s*\d+$/;
        const updatedMeasurements = shapeMeasurements[label] || [];
        updatedMeasurements[index] = value;

        if (value && !regex.test(value)) {
            setErrors((prev) => ({
                ...prev,
                [`shapeMeasurement_${label}_${index}`]: 'Enter "Width x Height", e.g., 300 x 200.',
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [`shapeMeasurement_${label}_${index}`]: '',
            }));
        }

        const newShapeMeasurements = { ...shapeMeasurements, [label]: updatedMeasurements };
        setShapeMeasurements(newShapeMeasurements);
        handleChange({ target: { name: 'shapeMeasurement', value: newShapeMeasurements } });
    };

    const toggleMeasurementsVisibility = (shape) => {
        setShowMeasurements(prev => ({ ...prev, [shape]: !prev[shape] }));
    };

    return (
        <section className="quoteSection">
            <h2>Select Shapes</h2>
            <Row>
                {[
                    { label: 'Upstands', image: upstandsImage },
                    { label: 'Sink Cut Out', image: sinkImage },
                    { label: 'Hob Cut Out', image: hobImage },
                    { label: 'Drainers Grooves', image: drainersImage },
                    { label: 'Hob Splashback', image: splashBackImage },
                    { label: 'Slope Down Sink', image: slopeImage },
                ].map(({ label, image }) => (
                    <Col lg={4} sm={6} xs={6} key={label}>
                        <Card
                            className={`shape-card ${selectedShapes.includes(label) ? 'selected' : ''}`}
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
            {errors.shapeSelection && <small className="text-danger">{errors.shapeSelection}</small>}

            {selectedShapes.length > 0 && selectedShapes.map((shape) => (
                <div key={shape}>
                    <h5 style={{ padding: '10px 10' }}>Enter {shape} Measurements</h5>
                    <Button
                        onClick={() => toggleMeasurementsVisibility(shape)}
                        style={{
                            backgroundColor: 'darkgoldenrod',
                            color: 'white',
                            padding: '12px',
                            margin: '10px',
                        }}
                    >
                        {showMeasurements[shape] ? 'Hide Measurements' : 'Add Measurements (optional)'}
                    </Button>

                    {showMeasurements[shape] && (
                        <Row>
                            {(shapeMeasurements[shape] || []).map((measurement, index) => (
                                <Col lg={4} sm={6} xs={12} key={index}>
                                    <Form.Group controlId={`shapeMeasurement_${shape}_${index}`} style={{ marginBottom: '24px' }}>
                                        <Form.Control
                                            type="text"
                                            value={measurement || ''}
                                            onChange={(e) => handleMeasurementChange(shape, index, e.target.value)}
                                            placeholder="Width x Height"
                                            isInvalid={!!errors[`shapeMeasurement_${shape}_${index}`]}
                                            style={{ padding: '10px' }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors[`shapeMeasurement_${shape}_${index}`]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>
                    )}
                    <hr style={{ margin: '20px 0', border: '3px solid #cccc' }} />
                </div>
            ))}
        </section>
    );
};

export default ShapeSelection;
