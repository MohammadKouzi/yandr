import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import upstandsImage from '../../Images/Upstands.jpeg';
import sinkImage from '../../Images/SinkCutOut.jpeg';
import hobImage from '../../Images/HobCutOut.jpeg';
import drainersImage from '../../Images/DrainersGrooves.jpeg';
import splashBackImage from '../../Images/HobSplashback.jpeg';
import slopeImage from '../../Images/SlopeDownsSink.jpeg';
import waterfallImage from '../../Images/WaterfallLegs.jpeg';
import fullSplashBackImage from '../../Images/FullSplashback.jpeg';
import windowSillImage from '../../Images/windowsSills.jpeg';

const maxMeasurementsPerShape = {
    'Upstands': 3,
    'Sink Cut Out': 2,
    'Hob Cut Out': 2,
    'Drainers Grooves': 4,
    'Hob Splashback': 2,
    'Slope Down Sink': 3,
    'Waterfall Legs': 3,
    'Full Splashback': 2,
    'Windows Sills': 3
};

const ShapeSelection = ({ formData, handleChange, errors, setErrors }) => {
    const [selectedShapes, setSelectedShapes] = useState(formData.shape || []);
    const [shapeMeasurements, setShapeMeasurements] = useState(formData.shapeMeasurement || {});

    const handleCardClick = (label) => {
        const updatedShapes = selectedShapes.includes(label)
            ? selectedShapes.filter(shape => shape !== label)
            : [...selectedShapes, label];

        setSelectedShapes(updatedShapes);
        handleChange({ target: { name: 'shape', value: updatedShapes } });

        // Clear shape selection error in parent
        if (updatedShapes.length > 0) {
            setErrors((prev) => ({ ...prev, shapeSelection: '' }));
        }

        // If a shape is deselected, clear its associated measurements
        if (!updatedShapes.includes(label)) {
            const { [label]: _, ...remainingMeasurements } = shapeMeasurements;
            setShapeMeasurements(remainingMeasurements);
            handleChange({ target: { name: 'shapeMeasurement', value: remainingMeasurements } });
        }
    };

    const handleMeasurementChange = (label, index, value) => {
        const regex = /^\d+\s*x\s*\d+$/;

        const measurements = shapeMeasurements[label] || [];
        measurements[index] = value;

        if (value && !regex.test(value)) {
            setErrors((prev) => ({
                ...prev,
                [`shapeMeasurement_${label}_${index}`]: 'Please enter exactly two numbers in "Width x Height" format, e.g., 300 x 200.',
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [`shapeMeasurement_${label}_${index}`]: '',
            }));
        }

        setShapeMeasurements(prev => ({ ...prev, [label]: measurements }));
        handleChange({ target: { name: 'shapeMeasurement', value: { ...shapeMeasurements, [label]: measurements } } });
    };

    const addMeasurement = (label) => {
        const measurements = shapeMeasurements[label] || [];

        if (measurements.length < maxMeasurementsPerShape[label]) {
            setShapeMeasurements(prev => ({ ...prev, [label]: [...measurements, ''] }));
        } else {
            alert(`You can only add up to ${maxMeasurementsPerShape[label]} measurements for ${label}.`);
        }
    };

    const removeMeasurement = (label, index) => {
        const measurements = shapeMeasurements[label].filter((_, i) => i !== index);
        setShapeMeasurements(prev => ({ ...prev, [label]: measurements }));
    };

    return (
        <section style={{ padding: '20px' }}>
            <h2>Select Shapes and Features</h2>
            <Row>
                {[
                    { label: 'Upstands', image: upstandsImage },
                    { label: 'Sink Cut Out', image: sinkImage },
                    { label: 'Hob Cut Out', image: hobImage },
                    { label: 'Drainers Grooves', image: drainersImage },
                    { label: 'Hob Splashback', image: splashBackImage },
                    { label: 'Slope Down Sink', image: slopeImage },
                    { label: 'Waterfall Legs', image: waterfallImage },
                    { label: 'Full Splashback', image: fullSplashBackImage },
                    { label: 'Windows Sills', image: windowSillImage },
                ].map(({ label, image }) => (
                    <Col xs={6} md={4} key={label}>
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
            {errors.shapeSelection && <p className="text-danger">{errors.shapeSelection}</p>}

            {selectedShapes.length > 0 && selectedShapes.map((shape) => (
                <div key={shape}>
                    <h5 className='hstyle' style={{ padding: '10px 0' }}>Enter {shape} Measurements</h5>
                    {(shapeMeasurements[shape] || []).map((measurement, index) => (
                        <Form.Group key={index} controlId={`shapeMeasurement_${shape}_${index}`} style={{ marginBottom: '15px' }}>
                            <Form.Control
                                type="text"
                                name={`shapeMeasurement_${shape}_${index}`}
                                value={measurement}
                                onChange={(e) => handleMeasurementChange(shape, index, e.target.value)}
                                placeholder="Width x Height"
                                isInvalid={!!errors[`shapeMeasurement_${shape}_${index}`]}
                                style={{ padding: '10px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors[`shapeMeasurement_${shape}_${index}`]}
                            </Form.Control.Feedback>
                            <Button variant="danger" onClick={() => removeMeasurement(shape, index)} style={{ marginTop: '10px' }}>Remove</Button>
                        </Form.Group>
                    ))}
                    <div>
                        <Button
                            variant="primary"
                            onClick={() => addMeasurement(shape)}
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

export default ShapeSelection;
