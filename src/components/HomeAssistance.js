import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { Helmet } from 'react-helmet'; // Import Helmet

const HomeAssistance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    date: '',
    time: '',
    period: 'AM',
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
        error = value.trim() ? '' : 'Message is required';
        break;
      case 'phone':
        error = /^\+44\d{10}$/.test(value) ? '' : 'Valid UK phone number is required (Starting with +44)';
        break;
      case 'date':
        error = value.trim() ? '' : 'Date is required';
        break;
      case 'time':
        error = value.trim() ? '' : 'Time is required';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    setIsSending(true);

    const emailData = {
      to_name: 'Recipient Name',
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      phone: formData.phone,
      date: formData.date,
      time: formData.time + ' ' + formData.period,
    };

    emailjs
      .send(
        process.env.REACT_APP_CONTACT_US_SERVICE_ID,
        process.env.REACT_APP_CONTACT_US_TEMPLATE_ID,
        emailData,
        process.env.REACT_APP_CONTACT_US_USER_ID
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          date: '',
          time: '',
          period: 'AM',
        });
        setErrors({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          date: '',
          time: '',
        });
        alert('Email sent successfully!');
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        alert('Failed to send email. Please try again later.');
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
        <title>GlamStone - Home Assistance </title>
        <meta name="description" content="Welcome to GlamStone. We specialize in delivering precision-cut worktops, floor tiles, wall tiles, and vanities with expert craftsmanship." />
        <meta name="keywords" content="GlamStone, worktops, floor tiles, wall tiles, vanities" />
      </Helmet>
      <Container style={{ paddingTop: '56px' }}>
        <Container className="text-center mb-4">
          <h2 className='hstyle'>Request a Home Assistance</h2>
          <p className="pstyle">
            To schedule a consultation, request a quote online, arrange a home visit, or have samples
            delivered to your door. Let us help you bring your vision to life, at a time that suits
            you best. We look forward to working with you!
          </p>
        </Container>

        <Container className="quoteSection p-4 rounded">
          <h2 className="text-center mb-4 hstyle">Send Us a Message</h2>
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
                <br></br>

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
                <br></br>

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
                <br></br>

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
                <br></br>

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
            </Form.Group>
            <br></br>

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
                <br></br>

              </Col>
              <Col md={6}>
                <Form.Group controlId="formTime">
                  <Form.Label>Time</Form.Label>
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

export default HomeAssistance;
