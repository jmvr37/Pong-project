# Pong Game
### pong game is a replica of the pong game from RED Academy, is the second project of the course. we built the classic pong game using HTML and Js. it was challenging due the Js classes & constructors we used.

# Tech & Languages Used

* HTML
* Javascript

# Skills Learned

### The pong game was built using differents technologies like HTML and Js, we started using Js constructor classes to built it. I learned more how to use functions and classes to build games. I also learned about svg images and how control them.

# Browser Support

### Chrome, Safari, Firefox, Mozilla & IE

# Version

### 1.0

# Pong Game Starter

A starter project for a basic pong game using SVGs.

## Setup

Ensure you have [Node.js](https://nodejs.org/en/) installed first.

**Install dependencies:**

`$ npm install`

**Run locally with the Parcel dev server:**

`$ npm start`

Once you run the start command you can access your project at http://localhost:3000.

Read more about the [Parcel web application bundler here](https://parceljs.org/).

## Deploy

The deployment workflow for this project will be a bit different from what you've used when deploying simple static websites.

To deploy your finished Pong project as a GitHub page, you must first **update the `predeploy` script in the `package.json` file with the name of your repo.**

For example, if your repo URL is:

https://github.com/bob/pong-project

Update the `predeploy` script as follows:

```json
"predeploy": "rm -rf dist && parcel build index.html --public-url /pong-project",
```

Once you have done this, you can run:

`$ npm run deploy`

Now check out your deployed site 🙂
