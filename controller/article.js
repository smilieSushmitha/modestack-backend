const Article = require("../models/article.js");

// To Create an article
exports.createArticle = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Create a new article object
    // req.body should strictly follow Article Model
    const article = new Article(req.body);

    // Save the object as document in MongoDb
    article.save()
        .then(
            createdArticle => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'Article added SuccessFully!',
                    'article': {
                        ...createdArticle._doc,
                        articleId: createdArticle._id
                    }
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}

// To get list of all Articles
exports.getArticles = (req, res, next) => {
    // Log This Request
    console.log(
        (new Date()).toISOString(),
        req.method,
        req.baseUrl
    );

    // Set up Article query
    const ArticleQuery = Article.find().sort({
        onDate: -1
    });
    // Execute article query
    ArticleQuery.then(
            articles => {
                if (!articles.length) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No Articles found!',
                        'articles': articles,
                        'articlesCount': articles.length
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'Articles Fetched Successfully!',
                    'articles': articles,
                    'articlesCount': articles.length
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}