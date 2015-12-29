var Blog = require('../models/blog.server.model.js');

var newBlogController = () => {

    var createNewBlog = function (req, res) {
        var blog = new Blog;
        blog.title = req.body.title;
        blog.content = req.body.content;

        console.log(req.body);

        blog.save((err) => {
            //Needs to print the error!
            if (err) {
                console.log('Error. Couldn\'t add blog to database');
            }
            res.redirect('/my/newblog');
        });
    };

    return {
        createNewBlog: createNewBlog
    };
};

module.exports = newBlogController;

//module.exports = function (req, res) {
//    var blog = new Blog;
//    blog.title = req.body.title;
//    blog.content = req.body.content;
//
//    console.log(req.body);
//
//    blog.save((err) => {
//        //Needs to print the error!
//        if (err) {
//            console.log('Error. Couldn\'t add blog to database');
//        }
//        res.redirect('/my/newblog');
//    });
};