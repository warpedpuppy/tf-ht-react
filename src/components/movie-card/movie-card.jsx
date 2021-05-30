import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { DirectorView } from '../director-view/director-view';
import Container from 'react-bootstrap';
import './movie-card.scss';
import Col from 'react-bootstrap';

export class MovieCard extends React.Component {


  addFav(movie, user, token, userInfo) {

    console.log(this.props.movie._id);
    console.log(movie);


    axios.post(`https://itshorrortime.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {
      FavoriteMovies: this.props.FavoriteMovies
    },
      {
        headers: {
          'Authorization': `Bearer ${token} `,
          'Content-Type': 'application/json',
        }
      }
    ).then((response) => {
      const data = response;
      console.log(response);
      console.log(movie);
      this.setState({
        FavoriteMovies: response.data
      })
    })
  }


  render() {
    const { movie, onMovieClick, user, token } = this.props;
    const App = () => {
      const alert = useAlert()
    }

    return (
      <>

        <Helmet bodyAttributes={{ style: 'background-color : black' }} />



        <Card body bsPrefix="maximumW" className="bg-dark text-white mt-5 mx-2" style={{ height: "24rem" }}>
          <Card.Header className="mb-0">
            <Button className="mb-2" block variant="primary" onClick={() => { alert.show('Movie Added') }} onClick={(e) => this.addFav(movie, user, token)}>Add</Button>
          </Card.Header>
          <Card.Body className="justify-content-center align-items-center" >
            <Card.Img variant="top" src={movie.ImagePath} style={{ height: "11rem" }} />
            <Card.Title className="my-2" >{movie.Title}</Card.Title>
            <Card.Footer className="mb-4">
              <Link to={`/movies/${movie._id}`}>
                <Button variant="dark">Movie Info</Button>
              </Link>
            </Card.Footer>
          </Card.Body>
        </Card>


      </>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
    Year: PropTypes.string
  }).isRequired,


};