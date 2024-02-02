const express = require('express');

// act as data from provider database
const studyGroupsList = require('../../fixtures/studyGroups.json');

const app = express();
app.use(express.json());

app.get('/studyGroups', (req, res) => {
  res.send(studyGroupsList);
});

function start(port = 8000) {
  const server = app.listen(port, () => {
    console.log(`Http server running on port: ${port}`);
  });

  return server;
}

module.exports = {
  start,
};
