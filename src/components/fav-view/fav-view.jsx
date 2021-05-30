
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Helmet from "react-helmet";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export class FavoriteView extends React.Component {





  render() {
    const { movies, onMovieClick, FavoriteMovieList, user, token } = this.props;
    /* console.log(this.FavoriteMovieList);*/

    return (
      <>

        <Helmet bodyAttributes={{ style: 'background-color : black' }} />



        <Card body bsPrefix="maximumW" className="bg-dark text-white mt-5 mx-2" style={{ height: "24rem" }}>
          <Card.Header className="mb-0"><Link to={`/movies/${this.props.movies._id}`}>
            <Button className="mb-2" block variant="primary" onClick={(e) => this.addFav(movie, user, token)}>Add</Button>
          </Link></Card.Header>
          <Card.Body className="justify-content-center align-items-center" >
            <Card.Title className="my-2" >{this.state.Title}</Card.Title>
            <Card.Footer className="mb-4">
              <Link to={`/movies/${this.props.movies._id}`}>
                <Button variant="dark">Movie Info</Button>
              </Link>
            </Card.Footer>
          </Card.Body>
        </Card>


      </>
    );
  }
}



