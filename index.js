const express = require("express");
const axios = require('axios').default;
const axiosRetry = require('axios-retry');
const Promise = require("bluebird");
const app = express();
const stringLocator = require('./stringLocator.js');
const port = 9999;

axiosRetry(axios, { retries: 3 });

app.get("/", (req, res) => {
  Promise.all([
    axios.get('https://join.reckon.com/test2/textToSearch'),
    axios.get('https://join.reckon.com/test2/subTexts')
  ])
  .spread((textToSearch, subText) => { 
    console.log(textToSearch.data);
    console.log(subText.data);
    var response = stringLocator.locate(textToSearch.data, subText.data);
    res.send(response); 
  });
});


app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});