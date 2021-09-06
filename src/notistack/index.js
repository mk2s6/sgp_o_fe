'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./notistack.esm.js');
} else {
  module.exports = require('./notistack.esm.js');
}
