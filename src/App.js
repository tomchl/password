import React, { Component } from 'react';
import './App.css';

/*
function fetchData(value) {
  return fetch('http://www.passwordrandom.com/query?command=password&format=json&count=1')
    .then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      return data.results;
    })
}
*/
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isFetching: false,
      score: 0
    }

  }
  change(e) {
    const value = e.target.value;
    let state = this.state;
    state.password = value;
    if (value.length > 4) {
      state.score = 20;
      if (value.match(/[a-z]/)) {
        state.score += 20;
      }
      if (value.match(/[A-Z]/)) {
        state.score += 20;
      }
      if(value.match(/(?=.*?[#?!@$%^&*-.,+-_)(])/)){
        state.score+=20;
      }
      if(value.length>10){
        state.score+=20;
      }
    }
    if (value.length < 4) {
      state.score = 0;
    }
    this.setState(state);
  }



  render() {
    const password = this.state.password;
    const isFetching = this.state.isFetching;
    const score = this.state.score;

    return (
      <html>
        <body>
          <input style={isFetching ? { "backgroundColor": "#eee" } : {}} type="text" value={password} onChange={(e) => this.change(e) }/>

          Your password strength:
          <progress value={score} max="100">
          </progress>
        </body>
      </html>
    );
  }
}

export default App;
