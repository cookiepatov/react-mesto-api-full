const allowedCors = [
  'https://mesto-reinat.nomoredomains.club/',
  'http://mesto-reinat.nomoredomains.club/',
  'localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
