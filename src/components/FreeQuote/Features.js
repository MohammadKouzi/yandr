import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import waterfallImage from '../../Images/WaterfallLegs.jpeg';
import fullSplashBackImage from '../../Images/FullSplashback.jpeg';
import windowSillImage from '../../Images/windowsSills.jpeg';

const Features = ({ formData, handleChange }) => {
    const [selectedFeatures, setSelectedFeatures] = useState(formData.features || []);

    const handleCardClick = (label) => {
        const updatedFeatures = selectedFeatures.includes(label)
            ? selectedFeatures.filter(feature => feature !== label)  // Deselect feature
            : [...selectedFeatures, label]; // Select feature

        setSelectedFeatures(updatedFeatures);
        handleChange({ target: { name: 'features', value: updatedFeatures } }); // Update the main form state
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
                    <Col lg={4} sm={6} xs={6} key={label}>
                        <Card
                            className={`shape-card ${selectedFeatures.includes(label) ? 'selected' : ''}`}
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
