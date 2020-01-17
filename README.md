# DoMADCapstone
New Repo for DoMAD Capstone 2019/2020
## Who are we?

We are the DoMAD Capstone team for the 2019/20 Senior Capstone project

- **Joy Mace ([@JoyMace](https://github.com/JoyMace))** - SCRUM master
- **Shelby Keupp ([@sbkeupp](https://github.com/sbkeupp))**
- **Duaa Alahmed**
- **Yuxuan Luo**
- **Tanner O'Rourke**
- **Christoph Uhl** ([@Christoph98](https://github.com/christoph98))**
- **Thomas Young**
- **Natnael Abraha**

## Project Plan
We are using Trello to track progress 
-**([Trello Link](https://trello.com/b/hu36FAx3/domad))**

## Navigating this repository
 **the following is more of a template as none of this is currently in the repo and we are not likely to use the exact same things**
Here's a breakdown of what you'll find in this repo:

- `code/` - the code for the social network itself
  - `sass/` - stylesheets that will be compiled to CSS files ([learn more](https://sass-lang.com/))
  - `server_resources/` - a couple utility JS files used by the server
  - `sql/` - code for setting up the database locally and on Travis
  - `static/` - non-HTML files used by the website, like scripts, styles, and images. Includes the site's logo
  - `views/` - HTML-like files used by [Nunjucks](https://mozilla.github.io/nunjucks/) used by the server to generate HTML files
    - `templates/` - files used by many Nunjucks files, like the navigation links
  - `index.js` - the code for the server. It uses [Express](http://expressjs.com/) to handle HTTP requests
  - `package.json` - tells [Node](https://nodejs.org/en/) how to run the server, how to run tests on it, how to set up the database, and what modules it needs to install the server
  - `test.js` - our test suite (see below)
- `meeting_notes/` - word documents containing the notes from our weekly meetings
- `milestones/` - word documents marking our progress at certain points throughout the development process
- `travis.yml` - configuration for our Travis CI testing ([look at it go!](https://travis-ci.org/mrjacobbloom/teamWORK))
- `package.json` - a dummy manifest file, which directs Heroku to run the server in the `code/` folder

![Git_Daily_Workflow](https://www.sonassi.com/media/catalog/2012/07/simple_git_daily_workflow.pdf)
