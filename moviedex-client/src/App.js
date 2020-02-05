import React from 'react';
import './App.css';
import Movie from './Movie';
import NuevaMovie from './NuevoHoby';
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component {
  constructor( props ){
    super ( props )
    this.state = {
    
    movies : [],
    apiURL : 'http://localhost:8080'
    }
  }

  agregaMovie = (movie) => {
    let listaNueva = [...this.state.movies, movie];
    this.setState({
    movies : listaNueva
    });
  }

  componentDidMount(){
    let url = `${this.state.apiURL}/api/moviedex`;
    let settings = {
      method : 'GET'
    }
    fetch(url, settings)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJSON => {
        this.setState({
          movies : responseJSON
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  render(){
      return (
        <BrowserRouter>
        <div>
        <NuevaMovie agregaMovie={this.agregaMovie}/>
        <div>
        {this.state.movies.map((movie,index) => {
          return (
            <Movie accion={movie.film_title} test={index} />
            <Movie accion={movie.year} test={index} />
            <Movie accion={movie.rating} test={index} />
          )
        })}
        </div>
        </div>
        </BrowserRouter>
      )
    }
}
export default App;