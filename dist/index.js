
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./token-list-bridge-utils.cjs.production.min.js')
} else {
  module.exports = require('./token-list-bridge-utils.cjs.development.js')
}
