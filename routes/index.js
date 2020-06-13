  var express = require('express');
  var router = express.Router();
  var jwt = require('express-jwt');
  var auth = jwt({
      secret: 'MY_SECRET',
      userProperty: 'payload'
  });

  var ctrlArticle = require('../controller/article');
  var ctrlAuth = require('../controller/authentication');

  //get and articles if authenticated 
  router.get('/articles', auth, ctrlArticle.getArticles);
  router.post('/articles', auth, ctrlArticle.createArticle);

  router.post('/register', ctrlAuth.register);
  router.post('/login', ctrlAuth.login);

  module.exports = router;