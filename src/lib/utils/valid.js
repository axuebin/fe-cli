const valid = {
  validName(name) {
    return /^[a-z][a-z0-9\-_]+$/.test(name);
  },
};

module.exports = valid;
