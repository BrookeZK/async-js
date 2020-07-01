import { WeatherService } from './weather-service.js';
import $ from 'jquery'

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    /////////////////////////////////////////////////////////////////
    //   // plain XHR 
    //   let request = new XMLHttpRequest();
    //   const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    //   request.onreadystatechange = function() {
    //     if (this.readyState === 4 && this.status === 200) {
    //       const response = JSON.parse(this.responseText);
    //       getElements(response);
    //     }
    //   }

    //   request.open("GET", url, true);
    //   request.send();

    //  const getElements = function(response) {
    //     $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    //     $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    //   }

    /////////////////////////////////////////////////////////////////
    //   // XMLHTTPREQ with promise
    // let promise = new Promise(function(resolve, reject) {
    //   let request = new XMLHttpRequest();
    //   const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    //   request.onload = function() {
    //     if (this.status === 200) {
    //       resolve(request.response);
    //     } else {
    //       reject(request.response);
    //     }
    //   }
    //   request.open("GET", url, true);
    //   request.send();
    // });

    // promise.then(function(response) {
    //   const body = JSON.parse(response);
    //   $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
    //   $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    //   $('.showErrors').text("");
    // }, function(error) {
    //   $('.showErrors').text(`There was an error processing your request: ${error}`);
    //   $('.showHumidity').text("");
    //   $('.showTemp').text("");
    // });

    /////////////////////////////////////////////////////////////////
    // // fetch()
    function getElements(response) {
      if (response.main) {
        $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
        $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
        $('.showErrors').text("");
      } else {
        $('.showHumidity').text("");
        $('.showTemp').text("");
        $('.showErrors').text(`There was an error: ${response.message}`);
      }
    }

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
      .then(function(response) { // resolve
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function(error) { // reject
        return error;
      })
      .then(function(jsonifiedResponse) { // execute after the first .then() or the .catch()
        getElements(jsonifiedResponse);
      });

    /////////////////////////////////////////////////////////////////
    // // async / await / fetch()
    // function showElements(response) {
    //   $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    //   $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    //   $('.showErrors').text("");
    // }
    
    // function showError(error) {
    //   $('.showErrors').text(`There was an issue: ${error}.`);
    //   $('.showHumidity').text("");
    //   $('.showTemp').text("");
    // }
    // async function asyncApiCall() {
    //   try {
    //     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
    //     if (!response.ok) { // 200 OK  response.ok === boolean
    //       showError(response.statusText);
    //     } else {
    //       const jsonifiedResponse = await response.json();
    //       showElements(jsonifiedResponse);
    //     }
    //     // returned / thrown
    //   } catch(error) {
    //     console.log(error);
    //   }
    // }
    // asyncApiCall();

    /////////////////////////////////////////////////////////////////
    // // IIFE
    // function showElements(response) {
    //   $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    //   $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    //   $('.showErrors').text("");
    // }
    
    // function showError(error) {
    //   $('.showErrors').text(`There was an issue: ${error}.`);
    //   $('.showHumidity').text("");
    //   $('.showTemp').text("");
    // }

    // (async () => {
    //     try {
    //     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
    //     if (!response.ok) {
    //       showError(response.statusText);
    //     } else {
    //       const jsonifiedResponse = await response.json();
    //       showElements(jsonifiedResponse);
    //     }
    //   } catch(error) {
    //     console.log(error);
    //   }
    // })();

    /////////////////////////////////////////////////////////////////
    // separating biz + UI logic
    // (async () => {
    //   let weatherService = new WeatherService();
    //   const response = await weatherService.getWeatherByCity(city);
    //   getElements(response);
    // })();

    // function getElements(response) {
    //   if (response) {
    //     $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    //     $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    //   } else {
    //     $('.showHumidity').text(`There was an error handling your request.`);
    //     $('.showTemp').text(`Please check your inputs and try again!`);
    //   }
    // }
  });
});