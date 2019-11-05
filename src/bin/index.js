#!/usr/bin/env node
const update = require('../lib/utils/update');

(async function() {
  await update();
  require('./command');
})();
