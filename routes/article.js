const express = require('express');
const ArticleController = require('../controller/article');

const router = express.Router();

router.post('/', ArticleController.createArticle);

router.get('/', ArticleController.getArticles);

module.exports = router;