const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

module.exports = new MockAdapter(axios);
