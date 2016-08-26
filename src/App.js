import React, { Component } from 'react';
import './App.css';

const API_KEY = '4aa883f95999ec813b8bfaf319f3972b';

function  fetchData(value){
  return fetch(`http://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)
  .then(response=>{
    return response.json();
  }).then(data=>{
    return data.results;
  })
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      movies : [],
      isFetching : false
    }

  } 
  change(e){
    const value = e.target.value;  
    let state  = this.state;
    state.search = value;
  
    if(value.length > 3){
      state.isFetching = true;
      fetchData(value).then((movies)=>{
        state.isFetching=false;
        state.movies=movies;
        this.setState(state);
      });
    }
    this.setState(state);
  }



  render() {
    const search = this.state.search.toLowerCase();
    const movies = this.state.movies;
    const isFetching = this.state.isFetching;

    return (
      <div>
      <input style={isFetching ? {"backgroundColor":"#eee"} : {}} type="text" value={search} onChange={(e)=>this.change(e)}/>
      <ul>
        { movies.map((item) => (
          <li>
          {item.original_title}
          </li>
        ))}
        </ul>
        </div>
    );
  }
}

export default App;
