// const https = require('https');
// const Promise = require('bluebird');
// const request = Promise.promisify(require('request'));

// const urls = [
//     'https://jsonplaceholder.typicode.com/posts',
//     'https://jsonplaceholder.typicode.com/albums',
//     'https://jsonplaceholder.typicode.com/users'
// ];

// async function getDataFromURLsAsync () {

//     try {

//         var results = await Promise.all([
//         // var results = await Promise.all([

//             urls.map(request)

//         ]);

//         console.log(results);

//     } catch (error) {

//         console.log(error);

//     }

// }

// getDataFromURLsAsync();

//Fetches data from a list of urls in parallel
const request = require('request');

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
    //transform into request Promises, await all
    try {
        var data = await Promise.all(urls.map(requestAsync));
    } catch (err) {
        console.error(err);
    }
    console.log(data);
}

getParallel();