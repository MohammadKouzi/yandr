import React, { useState } from 'react'; 
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; 
import axios from 'axios'; 
import { Helmet } from 'react-helmet';

const HomeAssistance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    date: '',
    timeSlot: '', 
    agree: false, 
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    date: '',
    timeSlot: '',
    agree: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' }); 

  const CHAR_LIMIT = 250; 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    validateField(name, type === 'checkbox' ? checked : value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        error = value.trim() ? '' : 'Name is required';
        break;
      case 'email':
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Valid email is required';
        break;
      case 'subject':
        error = value.trim() ? '' : 'Subject is required';
        break;
      case 'message':
        error = value.length > CHAR_LIMIT ? `Message cannot exceed ${CHAR_LIMIT} characters. (${value.length} characters)` : '';
        if (!error && !value.trim()) {
          error = 'Message is required';
        }
        break;
      case 'phone':
        error = /^\+44\d{10}$/.test(value) ? '' : 'Valid UK phone number is required (Starting with +44)';
        break;
      case 'date':
        const today = new Date();
        const selectedDate = new Date(value);
        error = selectedDate < today ? 'Date cannot be in the past' : '';
        break;
      case 'timeSlot':
        error = value ? '' : 'Time slot is required';
        break;
      case 'agree':
        error = value ? '' : 'You must agree to the terms and conditions';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateAllFields = () => {
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    validateAllFields();

    if (!isFormValid()) {
      setAlert({ type: 'danger', message: 'Please fill in all required fields correctly.' });
      return;
    }

    setIsSending(true);
    setAlert({ type: '', message: '' });

    const formattedDate = new Date(formData.date).toISOString().split('T')[0];

    const dataToSend = {
      ...formData,
      date: formattedDate,
    };

    console.log("Data being sent to backend:", dataToSend);

    axios
    .post(process.env.REACT_APP_REQUESTCALLBACK_API_URL, dataToSend)
    .then((response) => {
        console.log('SUCCESS!', response.status, response.data);
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          date: '',
          timeSlot: '',
          agree: false,
        });
        setAlert({ type: 'success', message: 'Request sent successfully!' });
      })
      .catch((err) => {
        console.error('Error:', err);
        setAlert({ type: 'danger', message: 'Failed to send request. Please try again later.' });
      })
      .finally(() => setIsSending(false));
  };

  // Adjusted logic for form validity
  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === '') && // All fields must be valid
      formData.name.trim() !== '' && // Check for name
      formData.email.trim() !== '' && // Check for email
      formData.subject.trim() !== '' && // Check for subject
      formData.message.trim() !== '' && // Check for message
      formData.phone.trim() !== '' && // Check for phone
      formData.date !== '' && // Check for date
      formData.timeSlot !== '' && // Check for time slot
      formData.agree // The checkbox must be checked
    );
  };

  return (
    <div className="body">
     <Helmet>
        <title>GlamStone - Request Call Back</title>
        <meta name="description" content="Request a call back from GlamStone." />
      </Helmet>
      <Container className="section2">
        <br />
        <h1 className="text-center hstyle">Request a Call Back</h1>
        <br />
        <p className="pstyle">
          Let us know when you would like us to call you back for further discussions, consultations, or quotes. We're here to assist you at your convenience!
        </p>
      </Container>

      <Container className="quoteSection p-4 rounded">
        <h2 className="text-center mb-4 hstyle">Send Us Your Request</h2>

        {alert.message && (
          <Alert variant={alert.type} onClose={() => setAlert({ type: '', message: '' })} dismissible>
            {alert.message}
          </Alert>
        )}

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
            <small>{formData.message.length} / {CHAR_LIMIT} characters</small>
          </Form.Group>
          <br />

          <Row>
            <Col md={6}>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTimeSlot">
                <Form.Label>Preferred Time Slot</Form.Label>
                <div className="d-flex flex-column">
                  <Form.Check
                    type="radio"
                    label="Morning (09:00 AM - 12:00 PM)"
                    name="timeSlot"
                    value="Morning"
                    checked={formData.timeSlot === 'Morning'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Afternoon (12:00 PM - 05:00 PM)"
                    name="timeSlot"
                    value="Afternoon"
                    checked={formData.timeSlot === 'Afternoon'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Evening (05:00 PM - 08:00 PM)"
                    name="timeSlot"
                    value="Evening"
                    checked={formData.timeSlot === 'Evening'}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">{errors.timeSlot}</Form.Control.Feedback>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formAgree" className="mt-3">
            <Form.Check
              type="checkbox"
              label="I agree to the terms and conditions"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              isInvalid={!!errors.agree}
            />
            <Form.Control.Feedback type="invalid">{errors.agree}</Form.Control.Feedback>
          </Form.Group>

          <div className="text-center">
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
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default HomeAssistance;
