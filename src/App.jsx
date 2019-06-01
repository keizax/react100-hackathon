import React, { Component } from 'react';
import './App.css';
const axios = require('axios');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weather: '',
      joke: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.getJoke = this.getJoke.bind(this);
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit() {
    this.getWeather();
    this.getJoke();
  }

  getWeather() {
    const reqURL = "http://api.openweathermap.org/data/2.5/weather?q=" + this.state.city + "&APPID=74c7081a5b0e2e16de05649f7db7a09f";
    axios.get(reqURL)
    .then(res => { 
      this.setState({ 
        weather: res.data.weather[0].description 
      }) 
    })
    .catch(error => {
      if (error.response) {
        alert('Enter a city');
    }
  });
  }

  getJoke() {
    const reqURL2 = "https://api.chucknorris.io/jokes/random"
    axios.get(reqURL2)
    .then(res => {
      // console.log(res.data);
      this.setState({ 
        joke: res.data.value
      });
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weather with Chuck Norris</h1>
          <p className="App-intro">
            Enter a city to get its weather and learn a fun fact about Chuck Norris!
          </p>
        </header>

        <div className='body container-fluid' id='form1'>

          <div className='row'>
            <div className='col-md-6 col-sm-offset-3'>
              <div className='panel panel-default'>
                <div className='panel-heading' id='header'><h4>Enter City</h4></div>
                <div className='panel-body'>
                  <div className='form-group' onChange={this.handleChange}>
                    <input name='city' id='form1' type='text' placeholder="Enter City" className='form-control input-md text-center' defaultValue={this.state.city} />
                    <br />
                    <button id='submit' type='submit' className='btn btn-primary' onClick={this.submit}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='container-fluid'>
            <div className='output'>
              <div className='row'>

                <div className='col-md-6'>
                  <div className='panel panel-default'>
                    <div className='panel-heading' id='header'>Weather</div>
                    <div className='panel-body'>
                      <div id='weather' className='container-fluid' onChange={this.handleChange}>
                        {this.state.weather}
                      </div>
                    </div>
                  </div>
                </div>


                <div className='col-md-6'>
                  <div className='panel panel-default'>
                    <div className='panel-heading' id='header'>Chuck Norris Fun Fact</div>
                    <div className='panel-body'>
                      <div id='joke' className='container-fluid' onChange={this.handleChange}>
                        {this.state.joke}
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

