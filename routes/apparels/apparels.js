const apparelsExpress = require('express');
const apparelsRouter = apparelsExpress.Router();

//curl -X GET -H "Host: mail.example.com" localhost:3000

/* GET home page. */
apparelsRouter.get('/', function(req, res, next) {
    console.log(req.hostname);
    res.send('apparels');
});

module.exports = apparelsRouter;