var express = require('express');
var router = express.Router();

router.get('/timestamp', function(req, res, next) {
    res.render('timestamp', { title: 'Timestamp' });
});

router.get('/headerparser', function(req, res, next) {
    res.render('headerparser', { title: 'Request Header Parser' });
});

router.get('/urlshortener', function(req, res, next) {
    res.render('urlshortener', { title: 'URL Shortener' });
});

router.get('/exercise', function(req, res, next) {
    res.render('exercise', { title: 'Exercise Tracker' });
});

router.get('/filemetadata', function(req, res, next) {
    res.render('filemetadata', { title: 'File Metadata' });
});


module.exports = router;