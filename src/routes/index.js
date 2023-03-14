const router = require('express').Router();

router.use('/', require('./post.extract-pdf'));

module.exports = router;