const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
require('dotenv').config();

const app = express();

const DATA_FILE = path.join(__dirname, 'slide-data.json');
//console.log("DATA_FILE: ", DATA_FILE);
//console.log("IN SERVER");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.set('port', (process.env.API_PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const isAuthenticated = exjwt({
  secret: process.env.TOKEN
});

const encyptedPasswordAsync = "$2a$10$a1mMahKpaJKQJvRo003R3uxP4EcQCSDL7VsI4W3jElEt.FVJq3a52";
function verifyPassword (password, cb) {
  bcrypt.compare(password, encyptedPasswordAsync, function(err, isMatch) {
    if (isMatch === true) {
      return cb(null, isMatch);
    }
    else {
      return cb(err);
    }
    
  });
};


// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  verifyPassword(req.body.password, (err, isMatch) => {
      if(isMatch) {
        let token = jwt.sign({ user: "admin" }, process.env.TOKEN, { expiresIn: 129600 }); // Sigining the token
        res.json({success: true, message: "Token Issued!", token: token, user: "admin"});
      } else {
        res.status(401).json({success: false, message: "Authentication failed. Wrong password."});
      }
  })
});


app.get('/api/slides', (req, res) => {
  //console.log("In server.js - app.get - before readFile");
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});


app.post('/api/slides', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const slides = JSON.parse(data);
    const newSlide = {
      title: req.body.title,
      author: req.body.author,
      period: req.body.period,
      id: req.body.id,
      imageUrl: req.body.imageUrl,
      rotate: req.body.rotate,
      width: req.body.width,
      height: req.body.height,
    };
    new Promise((resolve, reject) => {
      resolve(newSlide);
    }).then((newSlide) => {
      slides.push(newSlide);
      return slides;
    }).then((slides) => {
      slides.sort(function(a, b) {
        var authorA = a.author.toUpperCase(); // ignore upper and lowercase
        var authorB = b.author.toUpperCase(); // ignore upper and lowercase
        if (authorA < authorB) {
          return -1;
        }
        if (authorA > authorB) {
          return 1;
        }
        // authors must be equal
        return 0;
      });
      return slides;
    }).then((slides) => {
      fs.writeFile(DATA_FILE, JSON.stringify(slides, null, 4), () => {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(slides);
      });
    }).catch(function (error) {
      console.log(error); //handle error
    });
    
  });
});

app.put('/api/slides', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const slides = JSON.parse(data);
    slides.forEach((slide) => {
      if (slide.id === req.body.id) {
        slide.title = req.body.title;
        slide.author = req.body.author;
        slide.period = req.body.period;
        slide.id = req.body.id;
        slide.imageUrl = req.body.imageUrl;
        slide.rotate = req.body.rotate;
        slide.width = req.body.width;
        slide.height = req.body.height;
      }
    });
    new Promise((resolve, reject) => {
      resolve(slides);
    }).then((slides) => {
      slides.sort(function(a, b) {
        var authorA = a.author.toUpperCase(); // ignore upper and lowercase
        var authorB = b.author.toUpperCase(); // ignore upper and lowercase
        if (authorA < authorB) {
          return -1;
        }
        if (authorA > authorB) {
          return 1;
        }
        // authors must be equal
        return 0;
      });
      return slides;
    }).then((slides) => {
      fs.writeFile(DATA_FILE, JSON.stringify(slides, null, 4), () => {
      res.json({});
      });
    }).catch(function (error) {
      console.log(error); //handle error
    });
  });
});

app.delete('/api/slides', (req, res) => {
  // console.log("Inside app.delete");
  // console.log("Slide Id to Delete: " + req.body.id);
  fs.readFile(DATA_FILE, (err, data) => {
    let slides = JSON.parse(data);
    slides = slides.reduce((memo, slide) => {
      if (slide.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(slide);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(slides, null, 4), () => {
      res.json({});
    });
  });
});

export default app;
