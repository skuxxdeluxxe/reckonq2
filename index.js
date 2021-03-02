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
    var data = stringLocator.locate(textToSearch.data, subText.data);
    return axios.post('https://join.reckon.com/test2/submitResults', data)
  })
  .then((response) => res.send(response.data))
  .catch((error) => {
    console.log(error);
    res.send('Something when wrong check the logs');
  });
});


app.listen(port, function() {
  console.log(`Server listening on port ${port}`);
});