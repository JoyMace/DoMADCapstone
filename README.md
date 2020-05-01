# DoMADCapstone
New Repo for DoMAD Capstone 2019/2020
## Who are we?

We are the Donations Make a Difference (DoMAD) Capstone team for the 2019/20 Senior Capstone project

- **Joy Mace ([@JoyMace](https://github.com/JoyMace))** - SCRUM Master
- **Shelby Keupp ([@sbkeupp](https://github.com/sbkeupp))**
- **Duaa Alahmed ([@dual8794](https://github.com/dual8794))**
- **Yuxuan Luo ([@yulu9243](https://github.com/yulu9243))**
- **Tanner O'Rourke ([@torourke14](https://github.com/torourke14))**
- **Christoph Uhl ([@Christoph98](https://github.com/christoph98))**
- **Thomas Young ([@thyo9470](https://github.com/thyo9470))** - Backend Lead
- **Natnael Abraha ([@natnaelmesfun](https://github.com/natnaelmesfun))**

## Project Plan
We are using Trello to track progress 
-**([Trello Link](https://trello.com/b/hu36FAx3/domad))**

## Navigating this repository
Here's a breakdown of what you'll find in this repo:

- `code/` - The code for the social network itself
  - `client/` - React framework files.
    - `public/` - Contains flags that show up on country page.
    - `src/` - Contains React files.
      - `components/` - Contains all files
        - `Backdrop/` - Contains files that render the background when the side drawer is open.
        - `CountryPages/` - Contains all files for the tabs on the country/explore page.
        - `Footer/` - Footer files.
        - `Navbar/` - Navbar files.
        - `Pages/` - Contains files (both .js and .css) for each of the pages on the site.
        - `SideDrawer/` - Contains files that create the side drawer that appears when the browser is too small.
      - `images/` - Folder of all images used on the website besides flags, which is in /public.
        - `Founder/` - Contains images that appear on the About Us page, found in about.js.
        - `png_icons/` - Contains image used as the default image for all blogs and on account page trips.
      - `App.js` - Contains the routing and rendering of all pages.
  - `config/` - Environment variables and setup.
  - `models/` - [Mongoose](https://mongoosejs.com/docs/guide.html) database schemas and models.
  - `routers/` - Application routes that handle client side requests.
  - `test/` - Folder that holds all tests files. Testing is done using Mocha, Chai, Supertest, and Sinon. Look in the [Unit Test](https://github.com/JoyMace/DoMADCapstone/wiki/Unit-Test) for more inofrmation.
  - `app.js` - Main file for running Nodejs express server.
  - `package.json` - Tells [Node](https://nodejs.org/en/) how to run the server, how to run tests on it, how to set up the database, and what modules it needs to install the server.
  - `package-lock.json` - Nodejs packages.
