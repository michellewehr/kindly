# KINDLY

![GitHub repo size](https://img.shields.io/github/repo-size/brentocracy/kindly?style=rounded) ![GitHub last commit](https://img.shields.io/github/last-commit/brentocracy/kindly?color=red&style=rounded-square) [![Updated Badge](https://badges.pufler.dev/updated/brentocracy/kindly)](https://badges.pufler.dev)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-00B2FF?style=for-the-badge&logo=mongodb&logoColor=green) ![Express](https://img.shields.io/badge/Express-black?style=for-the-badge&logo=express&logoColor=white) 

![Tailwind](https://img.shields.io/badge/TailwindCSS-orange?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React-gray?style=for-the-badge&logo=react&logoColor=blue)
![GraphQL](https://img.shields.io/badge/GraphQL-purple?style=for-the-badge&logo=graphql&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) 


<br>

## TABLE OF CONTENTS
  1. [Description](#description)
  2. [Installation](#installation)
  3. [Usage](#usage)
  4. [Technologies](#technologies)
  5. [Contribution](#contribution)
  7. [License](#licensing)
  8. [About](#about)

## Description

A social volunteering application for doing good deeds and participating in volunteering events in your area. Discuss and plan in a comment/reply message board format. Earn Kindly Points with your participation as events get verified by those who attended.

### This project can be found:

- [GitHub Respository](https://github.com/brentocracy/kindly)
- [Live Deployment](https://kindly-volunteer.herokuapp.com/)

---

## Installation

Make sure you have at least version 6.14.15 of `npm` installed.

Go to the [repository](https://github.com/brentocracy/kindly) and clone it by entering ``` git clone https://github.com/brentocracy/kindly.git```. You may also fork the repo.

Run `npm install` to include all dependencies. The dependencies include:

**ROOT DEPENDENCIES**

- `Concurrently`
- `React-Router-DOM`
- `cors`
- `Apollo-Server-Express`
- `GraphQL` (also utilized for server and client)

**SERVER-SIDE DEPENDENCIES**
- `bcrypt`
- `dotenv`
- `Express`
- `faker`
- `Mongoose`
- `jsonwebtoken`

**CLIENT-SIDE DEPENDENCIES**
- `Apollo Client`
- `GraphQL-Tag`
- `JWT-Decode`
- `React`
- `Jest-DOM`

To run both the back and front end servers, enter command `npm run develop` from the project root. This will use `concurrently` to run both servers.

You will be able to view `GraphQL`'s playground for the databses `queries` and `mutations` via `localhost:3001/graphql`.

Feel free to open a feature branch, make your changes, and open a pull request for review.

---

## Usage

Kindly can be used by anyone interested in doing good work within their communities. Right now, it is a general free-for-all regarding location, so make sure to check the locations of posted events and good deeds. A future iteration of the application will allow for robustly-verified and neighborhood-specific groupings of users and events. Users without an account (or if they are not logged in) can view events and good deeds but cannot interact with them or the other users, so be sure to get an account to get full functionality and engagement of Kindly.

### General

As a user of Kindly, one can do a bunch of things.

#### Signing Up and Logging In

`JSON Web Tokens` are used to authorize users and give them application permissions. If a user is not logged in, events and good deeds will still be shown but there will be no ability to interact with them. An account is necessary to participate in all of the fun stuff!

#### Kindly User Engagements

The landing page consists of two columns: the left-hand side for user-specific information (including events and good deeds only pertaining to that user). The right-hand side will show all events and good deeds (they can be toggled), with the ability to join, leave, and verify. Users can post comments within events to discuss planning and clown around if need be.

-- ***HOSTING EVENTS***

Click the Create an Event button, input your info, and voila. Your event will show in your sidebar as well as in the list of all events, which will still be organized by date happening.

You may also ask for help by posting a Good Deed, or help someone in need and volunteering to be the helper for one already posted.

-- ***USER PROFILES***

Users can click on their name on the sidebar to view a specific profile with an extensive list of their upcoming events and good deeds.

-- ***THE POINTS SYSTEM***

This is the good stuff.

Once an event has passed, all attending users will see a button to verify that the event happened successfully. Once half of the attendees have verified the event, Kindly Points are awarded to all of them and their points are updated on their profiles in real-time. Show it off!

---

## Technologies

> The following were used for this project:

- `HTML`
- `CSS`
- `TailwindCSS`
- `JavaScript`
- `Node`
- `Express`
- `MongoDB`
- `Mongoose`
- `React`
- `GraphQL`
- `Apollo Server` and `Apollo Client`
- `Git`
- Coded in `VS Code`

---

## Contribution

We welcome contributions from other fine developers.

If you would like to contribute to this project:

Navigate to your workspace in your terminal and clone the repository code there using `git clone`. Make sure to create your own branch with `git checkout -b branch-name` and open up a pull request to push changes. 

---

## Licensing

This application is not operating under a license, but as noted above, pull requests and collaborations are encouraged.

## About

This application was a happy collaboration between:

# *Brent Gaines:*

<img src="https://raw.githubusercontent.com/brentocracy/brentocracy/main/header.png">

I am a Full-Stack Web Developer committed to building fun and efficient projects!

Kindly reach out at <brentmatthewgaines@gmail.com>!

Connect with me:

<a href="https://twitter.com/brentocracy" target="blank"><img src="https://img.shields.io/twitter/follow/brentocracy?logo=twitter&style=for-the-badge" alt="Link to follow Brent on Twitter"></a>
<a href="https://linkedin.com/in/brent-gaines" target="blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Link to follow Brent on LinkedIn"></a>
</p>

### [GITHUB PROFILE](https://github.com/brentocracy)
### [PORTFOLIO](https://brenternet.netlify.app)

# *Michelle Wehr:*

<img src="https://user-images.githubusercontent.com/85959444/137572061-7dd1beba-44b9-4bc5-8a0d-c08d466d5f06.gif">

Passionate full-stack developer.

You can reach me at <michelle_wehr@icloud.com>. 

### [GITHUB PROFILE](https://github.com/michellewehr)
### [PORTFOLIO](https://michellewehr.github.io/react-portfolio-2/)

# *Maki A Maki:*

I'm Maki (pronounced Mekki) from CT USA, and I am a Full-Stack Web Developer. I am passionate about helping create solutions to big problems and collaborating with a team of passionate programmers.

### [GITHUB PROFILE](https://github.com/Makispear)
### [PORTFOLIO](https://makispear.github.io/Makispear/)

# *Dave Toth:*

### [GITHUB PROFILE](https://github.com/DaveToth77)
### [PORTFOLIO](https://portfolio-davetoth77.vercel.app/)

