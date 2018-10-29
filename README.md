## Northcoders news

Here is the link to the Northcoders news api: https://peaceful-temple-55135.herokuapp.com

An API to serve news articles on a range of topics. These articles have comments associated with them, and user information linked to these comments. Up and down votes can be added to the articles and comments.

## Getting Started

### Prerequisites

You will need a text editor such as Visual Studio Code, Sublime Text or Atom in which to develop the project.

To begin you will need to fork and clone your own repository of the project.
To do this, click on the fork button and copy the link provided.
In your terminal, navigate to the directory in which you wish to save your project, and then enter:

$ git clone //paste in copied link here.

Next, use the 'cd' command to navigate into the project folder, and open the project. For example, in VS code, it would look like this:

$cd northcoders_news
$code .

### Installing

#Step 1:

$npm install this will install the packages required.

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

You will need have mongo installed on your machine. For futher information see https://www.mongodb.com

#Step 3:
Run the command npm run seed to seed the database.
Now you will be able to access the database using the command line. Here are some useful commands:
use northcoders_news//accesses the development database
use northcoders_news_test//accesses the test database
show dbs
show collections
db.<'insert collection name'>find().pretty()//returns contents of the search

To access the data in the browser:
enter http://localhost:9090/api/

This will bring up an html page listing the possible endpoints served.

From here you can enter these endpoints to access the data.

### Testing

In the spec file are a suite of tests designed to ensure that the functionaltiy of the api works as expected, and that errors are handled in a way that provides information to the user.

To run the tests:

Seed the database using npm run seed.
Then use the command npm run test.

## Deployment

You can deploy on your local machine, or using a platform such as Heroku. For further information see https://www.heroku.com.

## Built With

- [Heroku](https://www.heroku.com)
- [Mlabs](https://mlab.com)
