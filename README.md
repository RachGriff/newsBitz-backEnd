## Northcoders news

<!-- - Talk about ability to POST in intro**
- Clone (not fork) to run locally**
- You can use actual repo here `$ git clone https://github.com/RachGriff/BE2-northcoders-news`**
- Good, clear instructions - sometimes a bit too specific (e.g. code .)**
- Use backticks to denote code in markdown**
- I’d have mongo in prerequisites**
- Assume knowledge of mongo etc.**
- Link to your hosted version**
- Describe what config should look like
- Remove `README.bak`**
- Explain how to seed dev db `seed:dev`**
- Give all endpoints and show shape of response -->

Link to the Northcoders news api: https://peaceful-temple-55135.herokuapp.com

Northcoders news is an API created to serve news articles on a range of topics. These articles have comments associated with them, along with user information linked to these comments. In addition to the 'GET' methods on various endpoints the API has POST methods available to allow data to be added to files, along with PATCH methods to amend data, such as altering votes for articles up/down. Files can also be removed using the DELETE method.

## Getting Started

### Prerequisites

You will need a text editor such as Visual Studio Code, Sublime Text or Atom in which to develop the project.
In addition, you will need have MongoDB installed on your machine. For futher information see https://www.mongodb.com

To begin you will need to clone the project from this project repository:
To do this, click on the forkclone/download button and copy the following link provided:`$ git clone https://github.com/RachGriff/BE2-northcoders-news`
In your terminal, navigate to the directory in which you wish to save your project, and then enter:

\$ git clone //paste in copied link here.

Next, use the 'cd' command to navigate into the project folder, and open the project.

### Installing

#Step 1:

\$npm install this will install the packages required.

This will create a basic package.json which can then be added to to meet the needs of the project.
These will include:
For this project you will need to install a number of key packages:

*dependencies:
body-parser
express
mongoose
*devDependencies:
chai
mocha
nodemon
supertest

#Step 2:

Config file set up:
Create a config folder and within this an index.js file.
Create a variable in which you set the environment to 'development':
`const env = process.env.NODE_ENV || "development`. This will need to be exported at the bottom of the page as follows:
`module.exports = config[env];`
The different environments will need to be set up with the correct DB URL as follows:

`test: {DB_URL: "mongodb://localhost:27017/northcoders_news_test" }, development: {DB_URL: "mongodb://localhost:27017/northcoders_news" },`
This means that for testing we can use localhost but for production, we will utilise heroku.

#Step 3:
Run the command `npm run seed` to seed the database.

Now you will be able to access the database using the command line. Here are some useful commands:
use northcoders_news//accesses the development database
use northcoders_news_test//accesses the test database
show dbs
show collections
db.<'insert collection name'>find().pretty()//returns contents of the search

#Step 4:

Using the command `npm run dev` will initialise the server.
To access the data in the browser:
enter http://localhost:9090/api/

This will bring up an html page listing the possible endpoints served.

From here you can enter these endpoints to access the data:

        GET /api/topics
        #Get all the topics.

        example data return:
        {
        "topics": [
        {
        "\_id": "5bddbd22b1195c1b2e6ebdba",
        "title": "Coding",
        "slug": "coding",
        "\_\_v": 0
        },

        GET /api/topics/:topic_slug/articles
        # Return all the articles for a certain topic
        # e.g: `/api/topics/football/articles`

        GET /api/articles
        # Returns all the articles

        example of data return for the above endpoints:


        {
        "articles": [
        {
        "_id": "5bddd4e6cc99a50c0470f0ff",
        "votes": 0,
        "title": "Running a Node App",
        "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
        "created_at": "2016-08-18T12:07:52.389Z",
        "belongs_to": "coding",
        "created_by": {
        "_id": "5bddd4e6cc99a50c0470f0fe",
        "username": "jessjelly",
        "name": "Jess Jelly",
        "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
        "**v": 0
        },
        "**v": 0,
        "commentCount": 8
        },

        GET /api/articles/:article_id
        # Get an individual article

        {
        "articles": [
        {
        "_id": "5bddd4e6cc99a50c0470f10b",
        "votes": 0,
        "title": "What does Jose Mourinho's handwriting say about his personality?",
        "body": "Jose Mourinho was at The O2 on Sunday night to watch Dominic Thiem in action against Novak Djokovic. Thiem took the first set before   Djokovic fought back to claim the victory, but Manchester United's manager was clearly impressed with the Austrian's performance.",
        "created_at": "2018-04-16T19:29:32.774Z",
        "belongs_to": "football",
        "created_by": {
        "_id": "5bddd4e6cc99a50c0470f0fd",
        "username": "weegembump",
        "name": "Gemma Bump",
        "avatar_url": "https://www.upandrunning.co.uk/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/m/r/mr-bump.jpg",
        "**v": 0
        },
        "**v": 0,
        "commentCount": 6
        }

        GET /api/articles/:article_id/comments
        # Get all the comments for a individual article

        example data return:
        {
        "comments": [
        {
        "_id": "5bddd4e7cc99a50c0470f131",
        "votes": 12,
        "body": "Voluptas enim dolores minima repellendus corporis mollitia omnis. Consectetur vitae quaerat possimus repellendus. Cumque maxime nisi itaque aliquid vel non non.",
        "belongs_to": "5bddd4e6cc99a50c0470f10b",
        "created_by": {
        "_id": "5bddd4e6cc99a50c0470f0fe",
        "username": "jessjelly",
        "name": "Jess Jelly",
        "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
        "**v": 0
        },
        "created_at": "2016-05-16T20:21:19.007Z",
        "**v": 0
        },
        {
        "_id": "5bddd4e7cc99a50c0470f136",
        "votes": 0,
        "body": "Libero explicabo aperiam esse quae. Dolores in ipsum vitae incidunt. Magnam ullam nihil voluptas enim veritatis et nobis architecto.",
        "belongs_to": "5bddd4e6cc99a50c0470f10b",
        "created_by": {
        "_id": "5bddd4e6cc99a50c0470f0fb",
        "username": "happyamy2016",
        "name": "Amy Happy",
        "avatar_url": "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
        "**v": 0
        },
        "created_at": "2017-08-06T19:33:51.940Z",
        "**v": 0
        },




        GET /api/users/:username
        # e.g: `/api/users/mitch123`
        # Returns a JSON object with the profile data for the specified user.
       example of data return:
        {
        "user": {
        "_id": "5bddd4e6cc99a50c0470f0fe",
        "username": "jessjelly",
        "name": "Jess Jelly",
        "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
        "__v": 0
    }

}
Further routes:
POST /api/articles/:article_id/comments # Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs # e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`

        POST /api/topics/:topic_slug/articles # Add a new article to a topic. This route requires a JSON body with title and body key value pairs # e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`

        PATCH /api/articles/:article_id # Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' # e.g: `/api/articles/:article_id?vote=up`

        PATCH /api/comments/:comment_id
        # Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
        # e.g: `/api/comments/:comment_id?vote=down`

        DELETE /api/comments/:comment_id
        # Deletes a comment.

### Testing

In the spec file are a suite of tests designed to ensure that the functionaltiy of the api works as expected, and that errors are handled in a way that provides information to the user.

To run the tests:

Seed the database using npm run seed.
Then use the command npm run test.

## Deployment

You can deploy on your local machine, or using the Heroku platform. See link at top, and for further information see https://www.heroku.com.

## Built With

- [Heroku](https://www.heroku.com)
- [Mlabs](https://mlab.com)
