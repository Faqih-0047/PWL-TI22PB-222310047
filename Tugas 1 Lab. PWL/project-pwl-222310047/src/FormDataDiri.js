import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';

const FormDataDiri = () => {
  const [formData, setFormData] = useState({
    npm: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: '',
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [age, setAge] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const calculateAge = (birthdate) => {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.npm || isNaN(formData.npm) || formData.npm.length !== 9) {
      newErrors.npm = 'NPM harus terdiri dari 10 digit angka.';
      valid = false;
    }
    if (!formData.firstName) {
      newErrors.firstName = 'First Name harus diisi.';
      valid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name harus diisi.';
      valid = false;
    }
    if (!formData.birthdate) {
      newErrors.birthdate = 'Birthdate harus diisi.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAge(calculateAge(formData.birthdate));
      setShowModal(true);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Form Data Diri</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="npm">
              <Form.Label>NPM</Form.Label>
              <Form.Control
                type="text"
                name="npm"
                value={formData.npm}
                onChange={handleChange}
                maxLength="10"
                isInvalid={!!errors.npm}
              />
              <Form.Control.Feedback type="invalid">{errors.npm}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="middleName">
              <Form.Label>Middle Name (Opsional)</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="birthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                isInvalid={!!errors.birthdate}
              />
              <Form.Control.Feedback type="invalid">{errors.birthdate}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Data Diri</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>NPM:</strong> {formData.npm}</p>
          <p><strong>Fullname:</strong> {`${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim()}</p>
          <p><strong>Age:</strong> {age}th</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FormDataDiri;
