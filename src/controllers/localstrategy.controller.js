var mongodb = require('mongodb').MongoClient;
var objectID = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/bloggedin';

var localStrategyController = () => {
    var authenticateLogin = (username, password, done) => {
        mongodb.connect(url, (err, db) => {
            var collection = db.collection('users');
            collection.findOne({
                username: username
            }, (err, result) => {
                if (result != null && result.password === password) {
                    done(null, result);
                } else {
                    done(null, false, {
                        message: 'Bad username/password combo'
                    });
                }
            });
        });
    };

    return {
        authenticateLogin: authenticateLogin
    };
};

module.exports = localStrategyController;