const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  URL: process.env.MONGOOSE_URI,
  PORT: process.env.PORT
};