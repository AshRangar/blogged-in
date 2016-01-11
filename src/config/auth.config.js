module.exports = () => {
    return {
        googleId: process.env.GOOGLE_ID,
        googleSecret: process.env.GOOGLE_SECRET,
        twitterId: process.env.TWITTER_ID,
        twitterSecret: process.env.TWITTER_SECRET,
        facebookId: process.env.FACEBOOK_ID,
        facebookSecret: process.env.FACEBOOK_SECRET
    };
};