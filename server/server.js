'use strict';

// load env variables (for development)
require('dotenv').config();

const express = require('express'),
  http = require('http'),
  compression = require('compression'),
  cookieParser = require('cookie-parser'),
  errorHandler = require('errorhandler'),
  session = require('cookie-session'),
  helmet = require('helmet');

// template with marko https://github.com/marko-js/marko
require('marko/express');
require('marko/node-require').install();
const template = require('./views/home.marko');
const errorTemplate = require('./views/error.marko');

const app = express();
const routes = require('./routes');
const verifyHeaders = require('./auth/verify-headers.js');
const passportMiddleware = require('./auth/passport-middleware.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.disable('x-powered-by');

// add pw protection if the following environment variables are provided (i.e on staging not prod)
if (process.env.BETA_LOGIN && process.env.BETA_PW) {
  app.use('/', require('./auth/password-protect'));
}

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  maxAge: 128000
}));

// get recent episodes to display on main page
app.get('/recent', verifyHeaders, routes.recentEpisodes);

// seach episode data (not currently used)
app.get('/search', routes.search);

// update episode data with latest info, or update/add invidividual episode
app.use('/api/3i8IDx8Xx0zF98q21O24yh8aB7j0tML3/update/', routes.update);

// redirect to get data for a specific show from cloudfront / s3
app.get('/d/:show', verifyHeaders, routes.getEpisode);
app.use('/api/3i8IDx8Xx0zF98q21O24yh8aB7j0tML3/episode/:show', routes.getEpisode);

// passport authentication
passportMiddleware.init(app);
app.use('/auth', routes.auth);

app.use(helmet());

// index route
app.get('/', function(req, res) {
  // load all episodes
  let latestEpisodes =  JSON.stringify( routes.allEpisodeData.getAllEpisodes().slice(0, 600) );
  if (!latestEpisodes) {
    latestEpisodes = undefined;
  }

  // inject latest episodes and app version into Marko HTML template
  res.marko(template, {
    // version of client JS code
    version: process.env.APP_VERSION,
    latestEpisodes: latestEpisodes,
    inactiveEpisodes: process.env.BAD_EPISODES,
    bugMuncherKey: process.env.BUG_MUNCHER_API_KEY
  });
});

app.get('/*', function (req, res, next) {
  if (req.url.indexOf("/assets") === 0 || req.url.indexOf(".js") > -1 || req.url.indexOf(".html") > -1 || req.url.indexOf(".ico") > -1) {
    if (req.url.indexOf('auth') > -1) {
      return next();
    }
    res.setHeader('Cache-Control', 'public, max-age=2592000');
    res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
  }
  next();
});

app.use(express.static('public', {
  maxAge: 128000
}));


// error handling

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') {
    console.error(err);
    if (res.headersSent) {
      return next(err);
    }
    return res.marko(errorTemplate, {
      errorMessage: 'Server error',
      errorAction: 'Please Submit a bug report'
    });
  }

  // handle CSRF token errors here
  res.status(403);
  res.send('form tampered with');
});

app.use(function(req, res, next) {
  if (res.headersSent) {
    return next();
  }
  else if (res.status >= 500) {
    return res.marko(errorTemplate, {
      errorMessage: 'Server error',
      errorAction: 'Please submit a bug report'
    });
  }
  return res.marko(errorTemplate, {
    errorMessage: 'Nothing to see here',
    errorAction: '404 — not found. <a href="/">Go home</a>'
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});