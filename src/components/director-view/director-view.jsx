import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Helmet from "react-helmet";


export class DirectorView extends React.Component {



  render() {
    const { director, movies } = this.props;
    console.log(this.props);

    return (
      <div>
        <Helmet bodyAttributes={{ style: 'background-color : black' }} />

        <Card className="bg-dark text-white mt-5 mx-4" style={{ height: "24rem" }}>
          <Card.Body className="justify-content align-items" >
            <Card.Title style={{ height: "3rem" }}>{director.Name}</Card.Title>
            <Card.Text>Bio: {director.Bio}</Card.Text>
            <Card.Text>Birth year: {director.Birth}</Card.Text>
            <Card.Text>{director.Death}</Card.Text>


            <br />

          </Card.Body>
          <Card.Footer>
            <Button onClick={() => history.back()}>Back</Button>
          </Card.Footer>
        </Card>
      </div >
    );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  })
}

