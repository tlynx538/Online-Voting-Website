const environment = 'testing'
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);