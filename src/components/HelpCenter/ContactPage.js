import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaRunning, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: 'Contact Form',
      text: 'This form will help you get in touch with us. Please fill in your details.',
      icon: 'info',
      confirmButtonText: 'OK',
      backdrop: `
        rgba(0,0,0,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  }, []);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string()
      .matches(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Invalid phone number')
      .required('Phone number is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required')
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form submitted:', values);
    setTimeout(() => {
      Swal.fire({
        title: 'Message Sent!',
        text: 'Thank you for your message! We will contact you soon.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p className="contact-subtitle">Any questions or remarks? Just write us a message!</p>
        </div>

        <div className="contact-content">
          <div className="form-section">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className="contact-form">
                  <div className="form-row">
                    <div className="form-group name-group">
                      <label>Name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                      />
                      <ErrorMessage name="name" component="div" className="error-message" />
                    </div>

                    <div className="form-group email-group">
                      <label>Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter a valid email address"
                      />
                      <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div className="form-group phone-group">
                      <label>Phone Number</label>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="(123) 456-7890"
                      />
                      <ErrorMessage name="phone" component="div" className="error-message" />
                    </div>

                    <div className="form-group subject-group">
                      <label>Subject</label>
                      <Field
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                      />
                      <ErrorMessage name="subject" component="div" className="error-message" />
                    </div>

                    <div className="form-group message-group">
                      <label>Message</label>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Your message here..."
                      />
                      <ErrorMessage name="message" component="div" className="error-message" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    {isSubmitting ? 'Sending...' : 'SUBMIT'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="footer-design-wrapper">
            <div className="footer-design-content">
              {/* ✅ Clickable ABOUT SHOPPER */}
              <div
                className="footer-section clickable-info-item"
                onClick={() => navigate('/about')}
                style={{ cursor: 'pointer' }}
              >
                <div className="footer-icon">
                  <FaRunning />
                </div>
                <h3>ABOUT Shopper</h3>
                <ul className="footer-list">
                  <li>Running Guide</li>
                  <li>Workouts</li>
                </ul>
              </div>

              <div className="footer-section phone-section">
                <div className="footer-icon">
                  <FaPhone />
                </div>
                <h3>PHONE (LANDLINE)</h3>
                <ul className="footer-list">
                  <li>
                    <a href="tel:+91235678987">+912 3567 8987</a>
                  </li>
                  <li>
                    <a href="tel:+91252523336">+912 5252 3336</a>
                  </li>
                </ul>
              </div>

              <div className="footer-section office-location">
                <div className="footer-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>OUR OFFICE LOCATION</h3>
                <ul className="footer-list">
                  <li>
                    <a
                      href="mailto:contact@interiordesignstudio.com"
                      style={{ color: '#555', textDecoration: 'none' }}
                    >
                      The Interior Design Studio Company
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.google.com/maps?q=The+Courtyard,+Al+Quoz+1,+Colorado,+USA"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#555', textDecoration: 'none' }}
                    >
                      The Courtyard, Al Quoz 1, Colorado, USA
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
      </div>
           {/* Chat Now Button positioned at bottom right */}
      <div
        className="chat-now-button"
        onClick={() => navigate('/virtual-assistant')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span>Chat Now</span>
      </div>
    
    </div>
    
  );
};

export default ContactPage;
