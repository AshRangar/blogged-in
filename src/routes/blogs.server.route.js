var express = require('express');
var blogsRouter = express.Router();

var Blog = require('../models/blog.server.model.js');

module.exports = (nav, info) => {
    blogsRouter.route('/:id')
        .get(function (req, res, next) {
            Blog.findById(req.params.id, function (err, blog) {
                if (!err) {
                    console.log(blog);
                    res.render('my/post', {
                        title: info.title,
                        caption: info.caption,
                        copyright: info.copyright,
                        blog: blog
                    });
                    //                    res.json(blogs);
                } else {
                    res.send('Error!');
                }
            });
        });

    return blogsRouter;
};