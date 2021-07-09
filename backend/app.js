const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate } = require('celebrate');
require('dotenv').config();

const celebrateErrorHandler = require('./middlewares/celebrateErrorHandler');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
/* const cors = require('./middlewares/cors'); */

const { login, createUser } = require('./controllers/users');

const NotFoundError = require('./utils/customErrors/NotFoundError');
const { loginValidation, createUserValidation } = require('./utils/serverValidation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

const allowedCors = [
  'https://mesto-reinat.nomoredomains.club',
  'http://mesto-reinat.nomoredomains.club',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

app.use((req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).send();
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200).send();
  }

  next();
});

app.post('/signin', celebrate(loginValidation), login);
app.post('/signup', celebrate(createUserValidation), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(() => {
  throw new NotFoundError('Такой страницы не существует');
});

app.use(errorLogger);

app.use(celebrateErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is running');
});
