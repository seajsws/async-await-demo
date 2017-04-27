const request = require('request');

var enumResults = function(data) {
  let counter = 1;
  for (var i of data) {
    console.log(`URL ${counter++} RESPONSE`);
    for (var obj of i) {
      console.log(obj);
    }
  }
};

//This is similar to how the fetch() works in the client-side version (script.js).
//Fetch returns a promise and has a built-in .json() method for parsing responses.
//We can simulate both of these features here by manually constructing
//our promises and calling JSON.parse() on each result.
var requestAsync = function(url) {
    return new Promise((resolve, reject) => {
        var req = request(url, (err, response, body) => {
            if (err) return Promise.reject(err)
              .then((err) => console.log(err));
            resolve(JSON.parse(body));
        });
    });
};

//Fetches data from a list of urls in parallel
var getParallel = async function(urls) {
    try {
        var data = await Promise.all(urls.map(requestAsync));
        enumResults(data);
    } catch (err) {
        console.error(err);
    }
}

const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums',
    'https://jsonplaceholder.typicode.com/users'
];


getParallel(urls);