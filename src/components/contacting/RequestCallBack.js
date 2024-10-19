import React, { useState } from 'react'; 
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios'; // Use axios for API requests
import { Helmet } from 'react-helmet';

const RequestCallBack = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    date: '',
    time: '', // 24-hour format
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    date: '',
    time: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' }); // Alert state

  const CHAR_LIMIT = 250; // Character limit for the message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
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
        error = value.length > CHAR_LIMIT ? `Message cannot exceed ${CHAR_LIMIT} characters.` : '';
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
        error = value.trim() ? '' : 'Time is required';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const formatTime = (hours, minutes) => {
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes; // leading zero
    return `${hours}:${minutes} ${period}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setAlert({ type: 'danger', message: 'Please fill in all required fields correctly.' });
      return;
    }

    setIsSending(true);
    setAlert({ type: '', message: '' });

    // Format date to YYYY-MM-DD
    const formattedDate = new Date(formData.date).toISOString().split('T')[0];

    // Convert time from 24-hour to 12-hour format with AM/PM
    const [hours, minutes] = formData.time.split(':').map(Number); // Convert to numbers
    const formattedTime = formatTime(hours, minutes); // Format the time

    // Create a new form data object with formatted date and combined time
    const dataToSend = {
      ...formData,
      date: formattedDate,
      time: formattedTime, // Send formatted time with AM/PM
    };

    axios
      .post(process.env.REACT_APP_REQUESTCALLBACK_API_URL, dataToSend)
      .then((response) => {
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          date: '',
          time: '',
        });
        setAlert({ type: 'success', message: 'Request sent successfully!' });
      })
      .catch((err) => {
        setAlert({ type: 'danger', message: 'Failed to send request. Please try again later.' });
      })
      .finally(() => setIsSending(false));
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((value) => value.trim() !== '') &&
      Object.values(errors).every((error) => error === '')
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

        {/* Alert Component */}
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
            <small>{formData.message.length} / 250 characters</small>
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
              <br />
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTime">
                <Form.Label>Time (24-hour format)</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  isInvalid={!!errors.time}
                />
                <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
              </Form.Group>
              <br />
            </Col>
          </Row>

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

export default RequestCallBack;
