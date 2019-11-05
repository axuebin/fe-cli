const sleep = () => new Promise(res => setTimeout(res, 2000));

module.exports = {
  sleep,
};