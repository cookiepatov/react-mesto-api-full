const allowedCors = [
  'https://mesto-reinat.nomoredomains.club/',
  'http://mesto-reinat.nomoredomains.club/',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  next();
};
