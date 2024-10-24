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
    time: '', // Renamed to 'time' to match backend
    agree: false, 
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    date: '',
    time: '',
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
      case 'time':
        error = value ? '' : 'Time slot is required'; // Adjusted to match 'time'
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
      date: formattedDate, // Properly formatted date
    };

    console.log("Data being sent to backend:", dataToSend);

    axios
  .post('http://localhost:5000/api/HomeAssistance', dataToSend)  // Example URL
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
          time: '', // Reset time field
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

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === '') && 
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.subject.trim() !== '' &&
      formData.message.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.date !== '' &&
      formData.time !== '' &&
      formData.agree
    );
  };

  return (
    <div className="body">
      <Helmet>
        <title>GlamStone - Home Assistance</title>
        <meta name="description" content="Request home assistance from GlamStone." />
      </Helmet>
      <Container className="section2">
        <br />
        <h1 className="text-center hstyle">Request Home Visit</h1>
        <br />
        <p className="pstyle">
          To schedule a consultation, request a quote, arrange a home visit, or have samples delivered to your door. Let us help you bring your vision to life, at a time that suits you best. We look forward to working with you!
        </p>
      </Container>

      <Container className="quoteSection p-4 rounded">
        <h2 className="text-center mb-4 hstyle">Send Us a Message</h2>

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
              <Form.Group controlId="formTime">
                <Form.Label>Preferred Time Slot</Form.Label>
                <div className="d-flex flex-column">
                  <Form.Check
                    type="radio"
                    label="Morning (09:00 AM - 12:00 PM)"
                    name="time"
                    value="Morning"
                    checked={formData.time === 'Morning'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Afternoon (12:00 PM - 05:00 PM)"
                    name="time"
                    value="Afternoon"
                    checked={formData.time === 'Afternoon'}
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Evening (05:00 PM - 08:00 PM)"
                    name="time"
                    value="Evening"
                    checked={formData.time === 'Evening'}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
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
