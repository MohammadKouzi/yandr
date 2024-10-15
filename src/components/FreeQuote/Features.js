import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import waterfallImage from '../../Images/WaterfallLegs.jpeg';
import fullSplashBackImage from '../../Images/FullSplashback.jpeg';
import windowSillImage from '../../Images/windowsSills.jpeg';

const Features = ({ formData, handleChange }) => {
    const [selectedShapes, setSelectedShapes] = useState(formData.shape || []);

    const handleCardClick = (label) => {
        const updatedShapes = selectedShapes.includes(label)
            ? selectedShapes.filter(shape => shape !== label)  // Deselect shape
            : [...selectedShapes, label]; // Select shape

        setSelectedShapes(updatedShapes);
        handleChange({ target: { name: 'shape', value: updatedShapes } });
    };

    return (
        <section className='quoteSection'>
            <h2>Select Features (Optional)</h2>
            <Row>
                {[ 
                    { label: 'Waterfall Legs', image: waterfallImage }, 
                    { label: 'Full Splashback', image: fullSplashBackImage }, 
                    { label: 'Windows Sills', image: windowSillImage } 
                ].map(({ label, image }) => (
                    <Col lg={4} sm={6} xs={12} key={label}>
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
        </section>
    );
};

export default Features;
