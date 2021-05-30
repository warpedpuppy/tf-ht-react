import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Helmet from "react-helmet";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'react-router-dom'
import { useHistory } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [validated, setValidated] = useState(false);


  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  }


  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    axios.post('https://itshorrortime.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }).then(response => {
      const data = response.data;
      // props.onRegister(data);
      window.open('/', '_self');
    }).catch(e => {
      console.log('Error Registering User');
    });

    setValidated(true);
  };

  return (
    <Container className="container1 justify-content-center">
      <Helmet bodyAttributes={{ style: 'background-color : black' }} />

      <Container className="container2">
        <Form.Row className="justify-content-center mt-5">

          <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='validationCustomUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  required
                  minLength="6"
                  maxLength="12"
                  placeholder='Enter Username'
                  onChange={e => setUsername(e.target.value)}
                />

                <Form.Control.Feedback type="invalid">Please enter Username between 6 and 12 characters</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='validationCustomPassword'>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type='password'
                  required
                  minLength="6"
                  placeholder='Alphanumeric (6-12 characters)'
                  onChange={e => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Please enter an alphanumeric password at least 6 characters long.</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='customValidationEmail'>
                <Form.Label column sm={2}>Email: </Form.Label>
                <Form.Control
                  type='email'
                  required
                  placeholder='example@example.com'
                  onChange={e => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Please include @ in the email address</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>


            <Form.Row className="justify-content-center">
              <Form.Group as={Row} controlId='customValidationbirthday'>
                <Form.Label >Birthday: </Form.Label>
                <Form.Control
                  type='date'
                  required
                  onChange={e => setBirthday(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Please enter your birthday</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Container>
              <Form.Row className="justify-content-center mb-3">
                <Button variant="dark" block type='submit' onClick={handleSubmit}> Submit</Button>

                <Button variant="outline-dark" block onClick={() => handleClick('/')}>Already have an account?</Button>
              </Form.Row>
            </Container>
          </Form >
        </Form.Row>
      </Container>
    </Container>
  )
}
