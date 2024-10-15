import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Helmet } from 'react-helmet'; // Import Helmet

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [wordCount, setWordCount] = useState(0); // Word count state for the message

  const API_URL = process.env.REACT_APP_CONTACT_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'message') {
      const words = value.trim().split(/\s+/).length;
      setWordCount(words); // Update word count

      if (words > 250) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          message: 'Your message exceeds the 250-word limit.',
        }));
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value.trim() ? '' : 'Please provide a valid name.';
        break;
      case 'email':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please provide a valid email address.';
        break;
      case 'subject':
        error = value.trim() ? '' : 'Subject is required.';
        break;
      case 'message':
        error = value.trim() ? '' : 'Please write a message.';
        break;
      case 'phone':
        error = /^\+44\d{10}$/.test(value) ? '' : 'Ensure the phone number starts with +44.';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Ensure all fields are filled out correctly before submitting.');
      return;
    }

    setIsSending(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post(API_URL, formData);
      setSuccessMessage('Thank you for reaching out! We will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '', phone: '' });
      setErrors({});
      setWordCount(0); // Reset word count after submission
    } catch (err) {
      console.error('Error sending data to the server:', err);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const isFormValid = () => {
    const allFieldsFilled = Object.values(formData).every((value) => String(value).trim() !== '');
    const noErrors = Object.values(errors).every((error) => error === '');
    return allFieldsFilled && noErrors && wordCount <= 250;
  };

  return (
    <div className="body">
      <Helmet>
        <title>GlamStone - Email Us</title>
        <meta name="description" content="Welcome to GlamStone. We specialize in precision-cut worktops, floor tiles, wall tiles, and vanities." />
      </Helmet>
      <Container className='section2'>
        <br />
        <h1 className="text-center hstyle">Email Us Today</h1>
        <br />
        <Container className="text-center mb-4">
          <p>
            We invite you to reach out to us to schedule a consultation or request an online quote. We’re also happy to deliver samples directly to your door.
          </p>
        </Container>

        <Container className="quoteSection p-4 rounded">
          <h2 className="text-center mb-4">Send Us a Message</h2>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <br />
              </Col>

              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <br />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>
                <br />
              </Col>

              <Col md={6}>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                </Form.Group>
                <br />
              </Col>
            </Row>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                isInvalid={!!errors.message}
              />
              <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
              <small>{wordCount} / 250 words</small> {/* Word count display */}
            </Form.Group>
            <br />

            <Button
              variant="primary"
              type="submit"
              className="d-block mx-auto"
              style={{
                backgroundColor: 'darkgoldenrod',
                color: 'white',
                padding: '12px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              disabled={isSending || !isFormValid()}
            >
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
};

export default ContactUs;
