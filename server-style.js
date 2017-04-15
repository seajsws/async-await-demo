
//Fetches data from a list of urls in parallel
const request = require('request');

var enumResults = function(data) {
  for (var i of data) {
    console.log(`URL RESPONSE \n`);
    for (var obj of i) {
      console.log(obj);
    }
  }
};

var requestAsync = function(url) {
    return new Promise((resolve, reject) => {
        var req = request(url, (err, response, body) => {
            if (err) return reject(err, response, body);
            resolve(JSON.parse(body));
        });
    });
};

const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums',
    'https://jsonplaceholder.typicode.com/users'
];

var getParallel = async function() {
    try {
        var data = await Promise.all(urls.map(requestAsync));
        enumResults(data);
    } catch (err) {
        console.error(err);
    }
}

getParallel();