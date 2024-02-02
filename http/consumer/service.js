const axios = require('axios');

async function fetchStudyGroups(url) {
  const res = await axios.get(`${url}/studyGroups`);
  const { data } = res;

  return data;
}

module.exports = {
  fetchStudyGroups,
};
