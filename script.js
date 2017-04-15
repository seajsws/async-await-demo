install.batch("fs", "wait", "util").then(async function([fs, wait, util]) {

  //code goes here
  
  console.log("hello");
  
  // quick intro to promises:
  var p = wait.waitPromise(1000);
  p.then(() => fs.readFilePromise())
    .then(file => console.log("promise file", file));
  
  // Promise.all() lets us coalesce multiple promises into a single super-promise
  var all = Promise.all([
    fs.readFilePromise(),
    new Promise(ok => fs.readFileCallback(ok))
  ]);
  
  all.then(function([a, b]) {
    console.log("all", a, b);
  });
  
  // await means that we can skip then() and go straight to the value
  var file = await fs.readFilePromise();
  console.log("await for file", file);
  
  // we can also await a Promise.all() wrapper, to fire parallel requests
  // otherwise, multiple lines of `await` will be sequential (i.e., slow)
  try {
    var [a, b, c, d] = await Promise.all([
      fs.readFilePromise(),
      fs.readFilePromise(),
      fs.readFilePromise(),
      fs.readFilePromise()
    ]);
  } catch (err) {
    console.error(err);
  }
  
  console.log("using all with await", a, b, c);
  
  // We can also use await with new browser APIs like fetch().
  // var [text, second] = await Promise.all([
  //   fetch("file.json", {mode: 'no-cors'}).then(p => p.text()),
  //   fetch("fs.js", {mode: 'no-cors'}).then(p => p.text())
  //   ]);
    
  // console.log("fetch example", text, second.length);
  
  // finally, I built the module system for this presentation around `async` and `await`.
  // `await install("module")` is basically an async `require("module")` from CommonJS
  var util = await install("util");

var enumResults = function(data) {
  for (var i of data) {
    console.log(`URL RESPONSE \n`);
    for (var obj of i) {
      util.log(obj);
    }
  }
};

var asynchronizer = async function (urls) {
  try {
    var data = await Promise.all(
      /* Alternatively store each in an array */
    // var [x, y, z] = await Promise.all([
      // fetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
      //   console.log('fetch 1 complete');
      //   return response.json()
      // }),
      // fetch('https://jsonplaceholder.typicode.com/albums').then((response) => {
      //   console.log('fetch 2 complete');
      //   return response.json()
      // }),
      // fetch('https://jsonplaceholder.typicode.com/users').then((response) => {
      //   console.log('fetch 3 complete');        
      //   return response.json()
      // })

      //could add cases to handle different types of fetch responses: 
      // .arrayBuffer()
      // .blob()
      // .formData()
      // .json()
      // .text()      
      urls.map((url) => {
        return fetch(url).then((response) => response.json());
      })
    );

    enumResults(data);

  } catch (error) {
    console.log(error);
  }

};

var urlsArray = [
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums',
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/todos'
  ]

asynchronizer(urlsArray);

});  