Multi-user blog site

* Uses Express.js for routing.
* Connects to Mongolab using Mongoose.
* Uses the EJS template engine.
* Encrypts users' passwords using brcypt.
* Uses Passport.js for OAuth.
* Allows authentication using Twitter, Facebook and Google.
* Flashes messages to client using flash-connect.

Features: <br />
    Login: <br />
    &nbsp;Login using Email, Facebook, Twitter or Google <br />
    New Post: <br />
    &nbsp;Create new post <br />
    All Posts: <br />
    &nbsp;Display all the posts of all the users <br />
    All Users: <br />
    &nbsp;Display all the users. Click on the user to view thier posts <br />

How to run? <br />

1. Clone the project
2. Navigate to the project folder using terminal and run the following command to install the required modules "npm modules"
3. configure the environmental variables for the following
    export GOOGLE_ID=XXX <br />
    export GOOGLE_SECRET=XXX <br />
    export TWITTER_ID=XXX <br />
    export TWITTER_SECRET=XXX <br />
    export FACEBOOK_ID=XXX <br />
    export FACEBOOK_SECRET=XXX <br />
    export DB_URL=mongodb://XXX <br />
    
    Replace XXX with the appropriate values. DB_URL should contain the value of the mongodb database URL. The other variables should contain the values of the OAuth values.
4. Run the command "gulp serve" to start the node.js application
5. Open the browser and enter the address https://localhost:5000 to access the application

