const express = require('express');
const studyGroupsList = require('../../fixtures/studyGroups.json');

const app = express();
app.use(express.json());

app.get('/studyGroups', (req, res) => {
  res.send(studyGroupsList);
});

module.exports = {
  server: app,
};
