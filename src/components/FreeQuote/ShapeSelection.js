import React, { useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import upstandsImage from '../../Images/Upstands.jpeg';
import sinkImage from '../../Images/SinkCutOut.jpeg';
import hobImage from '../../Images/HobCutOut.jpeg';
import drainersImage from '../../Images/DrainersGrooves.jpeg';
import splashBackImage from '../../Images/HobSplashback.jpeg';
import slopeImage from '../../Images/SlopeDownsSink.jpeg';
import waterfallImage from '../../Images/WaterfallLegs.jpeg';
import fullSplashBackImage from '../../Images/FullSplashback.jpeg';
import windowSillImage from '../../Images/windowsSills.jpeg';

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
    };

    const handleMeasurementChange = (label, e) => {
        const value = e.target.value;
        const regex = /^\d+\s*x\s*\d+$/;
    
        // Check if the value matches "number x number" exactly
        if (!regex.test(value)) {
            setErrors((prev) => ({
                ...prev,
                [`shapeMeasurement_${label}`]: 'Please enter exactly two numbers in "Width x Height" format, e.g., 300 x 200.',
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                [`shapeMeasurement_${label}`]: '',
            }));
        }
    
        setShapeMeasurements(prev => ({ ...prev, [label]: value }));
        handleChange({ target: { name: 'shapeMeasurement', value: { ...shapeMeasurements, [label]: value } } });
    };
    
    

    return (
        <section>
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
            {errors.shapeSelection && <p className="text-danger">{errors.shapeSelection}</p>}

            {selectedShapes.length > 0 && selectedShapes.map((shape) => (
                <Form.Group key={shape} controlId={`shapeMeasurement_${shape}`}>
                    <h5 className='hstyle'>Shape Measurement for {shape}</h5>
                    <Form.Control
                        type="text"
                        name={`shapeMeasurement_${shape}`}
                        value={shapeMeasurements[shape] || ''}
                        onChange={(e) => handleMeasurementChange(shape, e)}
                        placeholder="Height x Width"
                        isInvalid={!!errors[`shapeMeasurement_${shape}`]}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors[`shapeMeasurement_${shape}`]}
                    </Form.Control.Feedback>
                    <br />
                </Form.Group>
            ))}
        </section>
    );
};

export default ShapeSelection;
