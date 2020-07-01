// A promise allows us to wrap async code and then wait for the result of that code before moving on.
let myPromise = new Promise(function(resolve, reject) {
  // make an aync api call
  // evaluate some aync code

  // I'm using this as a simple example
  let iLoveJS = false;
  //we get to decide the conditions on which to resolve / reject
  if (iLoveJS) {
    resolve("100%") // can pass in any arugment - a string, or the response from your api call
  } else {
    reject("Oh no no no!")
  }
});

myPromise.then(function(success){ // the first callback connects to the resolve()
  console.log(success)
}, function(failure) { // the second callback connects to the reject()
  console.log(failure)
})

// can also use a .catch() to handle the promise rejection
myPromise.then(function(success){
  console.log(success)
}).catch(function(failure) {
  console.log(failure)
})

// two chained .then() will not handle handle the promise rejection
myPromise.then(function(success) {
  console.log(success)
}).then(function(failure) { // this won't handle the rejection!!!
  console.log(failure)
}) 