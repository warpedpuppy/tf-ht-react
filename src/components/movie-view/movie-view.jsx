import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Helmet from "react-helmet";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import { DirectorView } from '../director-view/director-view';
import axios from 'axios';
export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: ''

    }

  }
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }


  render() {
    const { movie, onBackClick, user } = this.props;

    return (
      <>


        <Helmet bodyAttributes={{ style: 'background-color : black' }} />

        <CardGroup className="bg-dark my-5 mx-5">
          <Card className='movie-view bg-dark text-white my-5 mx-5 justify-content-center align-items-center'>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Title className='label justify-content-center'>{movie.Title} </Card.Title>
            <Card.Body className='movie-description'>Description: {movie.Description}</Card.Body>
            <Card.Body className='movie-Genre'>Genre: {movie.Genre.Name}</Card.Body>
            <Card.Body className='movie-director'>
              <span className='label'>Director: </span>
              <span className='value'>{movie.Director.Name}</span>
              <br />
              <span className='label'>Bio: </span>
              <span className='value'>{movie.Director.Bio}</span>
              <br />
              <span className='label'>Birth year: </span>
              <span className='value'>{movie.Director.Birth}</span>
            </Card.Body>
            <Row>
              <Col className="justify-content-center my-5">
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="dark">Director</Button>
                </Link>
              </Col>
              <Col className="justify-content-center">
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="dark" className='my-5'>Genre</Button>
                </Link>
                <Button onClick={() => history.back()}>Back</Button>
              </Col>
            </Row>
          </Card>
        </CardGroup>

      </>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired
};