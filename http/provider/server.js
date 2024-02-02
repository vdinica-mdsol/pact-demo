const express = require('express');

// act as data from provider database
const studyGroupsList = require('../../fixtures/studyGroups.json');

const app = express();
app.use(express.json());

app.get('/studyGroups', (req, res) => {
  res.send(studyGroupsList);
});

module.exports = {
  server: app,
};
