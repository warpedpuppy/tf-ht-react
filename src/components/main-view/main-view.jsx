import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { MovieCard } from '../movie-card/movie-card';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { FavoriteView } from '../fav-view/fav-view';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Navbar, Nav } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Moment from 'react-moment';
import moment from 'moment';
import Menu from '../menu/Menu';
export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: true,
      director: [],
      token: null,
      userInfo: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userInfo = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token'),

      });
      this.getMovies(accessToken);
      this.getUser(accessToken, userInfo);
    }
    console.log(this.props)
  }




  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      token: authData.token
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUser(authData.token, authData.user.Username)
  }

  onLoggedOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    // window.open('/', '_self');
  }
  getMovies(token) {
    axios.get('https://itshorrortime.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
  }

  getUser(token, user) {
    console.log("GET USER MAIN VIEW CALLED", token, user)
    axios.get(`https://itshorrortime.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('Got account Info');
        this.setState({
          userInfo: response.data,
        });

      })
      .catch(e => console.error(e))
  }

  onRegister(register) {
    this.setState({
      register
    });
  }



  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  toggleView(e) {
    e.preventDefault();
    this.setState({
      register: !this.state.register
    })

  }
  onUpdate(update) {
    this.setState({
      update
    });
    console.log(update)
  }


  render() {
    const { movies, selectedMovie, user, token, userInfo, register, FavoriteMovies } = this.state;

    console.log("main view user info = ", userInfo)

    //console.log(userInfo);
    // if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} toggleView={this.toggleView} />;
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleView={this.toggleView} />;


    return (

      <>

        <Router>

          <div className="main-view justify-content-md-center">

            <Menu user={user} logOut={this.onLoggedOut} />
            <br />

            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Container bsPrefix="custom" >
                  {
                    movies.map((m, i) => (
                      <div key={i} className="d-flex justify-content-center">
                        <Col className="flex-column p-4" bsPrefix="customCol" >
                          <MovieCard user={user} movie={m} token={token} />
                        </Col>
                      </div>
                    ))
                  }
                </Container>
              )
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />


            <Route path="/genres/:name" render={({ match }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={`/users/${user}`} render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.inLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />
              return <Col md={8}>
                <ProfileView user={user} movies={movies} getMovies={(token) => this.getMovies(token)} token={token} userInfo={userInfo} onBackClick={() => history.goBack()} />
              </Col>
            }} />



          </div>
        </Router>
      </>
    );
  }

}
export default MainView;