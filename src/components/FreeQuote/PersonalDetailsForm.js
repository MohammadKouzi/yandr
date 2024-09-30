import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const PersonalDetailsForm = ({ formData, handleChange, errors }) => (
  <section className="quoteSection pb-4">
    <h2>Personal Details</h2>
    
    <Row className="mb-3"> {/* Add margin-bottom class to the entire row */}
      <Col md={6}>
        <Form.Group controlId="formName">
          <Form.Label className="mb-1">Name</Form.Label> {/* Reduced margin-bottom */}
          <Form.Control 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            isInvalid={!!errors.name}
            placeholder="Enter your name"
          />
          {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="formEmail">
          <Form.Label className="mb-1">Email</Form.Label> {/* Reduced margin-bottom */}
          <Form.Control 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            isInvalid={!!errors.email}
            placeholder="Enter your email address"
          />
          {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3"> {/* Add margin-bottom class to the entire row */}
      <Col md={6}>
        <Form.Group controlId="formPhone">
          <Form.Label className="mb-1">Phone</Form.Label> {/* Reduced margin-bottom */}
          <Form.Control 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            isInvalid={!!errors.phone}
            placeholder="Enter your phone number (e.g., 123-456-7890)"
          />
          {errors.phone && <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>}
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="formPostcode">
          <Form.Label className="mb-1">Postcode</Form.Label> {/* Reduced margin-bottom */}
          <Form.Control 
            type="text" 
            name="postcode" 
            value={formData.postcode} 
            onChange={handleChange} 
            isInvalid={!!errors.postcode}
            placeholder="Enter your postcode"
          />
          {errors.postcode && <Form.Control.Feedback type="invalid">{errors.postcode}</Form.Control.Feedback>}
        </Form.Group>
      </Col>
    </Row>

    <Row className="mb-3"> {/* Add margin-bottom class to the entire row */}
      <Col md={6}>
        <Form.Group controlId="formInstallationDate">
          <Form.Label className="mb-1">Installation Date</Form.Label> {/* Reduced margin-bottom */}
          <Form.Control 
            type="date" 
            name="installationDate" 
            value={formData.installationDate} 
            onChange={handleChange} 
            isInvalid={!!errors.installationDate}
          />
          {errors.installationDate && <Form.Control.Feedback type="invalid">{errors.installationDate}</Form.Control.Feedback>}
        </Form.Group>
      </Col>
    </Row>
  </section>
);

export default PersonalDetailsForm;
