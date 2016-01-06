module.exports = function () {
    var nav = [
        {
            item: 'Home',
            link: '/'
        },
        {
            item: 'My Posts',
            link: '/my/posts/'
        },
        {
            item: 'New Post',
            link: '/my/newpost'
        },
        {
            item: 'All Users',
            link: '/users/'
        },
        {
            item: 'All Posts',
            link: '/posts/'
        },
        {
            item: 'Logout',
            link: '/auth/signout/'
        }
    ];

    return nav;
};