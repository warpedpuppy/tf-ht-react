import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Helmet from "react-helmet";
import './login-view.scss';
import { InputGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export function LoginView(props) {

  
  const [username, setUsername] = useState('');



  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    history.push("/register");
  }

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    e.preventDefault();
    axios.post(' https://itshorrortime.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
      .catch(e => {
        console.log('Invalid Username or Password');
      });

    setValidated(true);
  };


  return (

    <Container className="container1">
      <Helmet bodyAttributes={{ style: 'background-color : black' }} />

      <Container>
        <Form.Row className="justify-content-center mt-5">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="container2 justify-content-enter">

            <Form.Row className="justify-content-center">
              <Form.Group controlId='validationCustomUsername'>
                <Form.Label>Username:</Form.Label>

                <Form.Control
                  type='text'
                  placeholder='Enter Username'
                  required
                  aria-describedby="inputGroupPrepend"
                  onChange={e => setUsername(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Please enter your username</Form.Control.Feedback>

              </Form.Group>
            </Form.Row>


            <Form.Row className="justify-content-center">
              <Form.Group controlId='validationCustomPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter Password'
                  required
                  className=""
                  aria-describedby="inputGroupPrepend"
                  onChange={e => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Please enter your Password</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>


            <Container>
              <Form.Row className="justify-content-center mb-3">
                <Button variant="dark" block type='submit' onClick={handleSubmit}>Submit</Button>
                <Button variant="outline-dark" block onClick={() => handleClick('/')}>Don't have an account?</Button>
              </Form.Row>
            </Container>

          </Form>
        </Form.Row >
      </Container>
    </Container>
  )
}