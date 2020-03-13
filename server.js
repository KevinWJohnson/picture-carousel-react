const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const DATA_FILE = path.join(__dirname, 'slide-data.json');
//console.log("DATA_FILE: ", DATA_FILE);
//console.log("IN SERVER");

app.set('port', (process.env.API_PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/slides', (req, res) => {
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
    slides.push(newSlide);
    fs.writeFile(DATA_FILE, JSON.stringify(slides, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(slides);
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
    fs.writeFile(DATA_FILE, JSON.stringify(slides, null, 4), () => {
      res.json({});
    });
  });
});

app.delete('/api/slides', (req, res) => {
  console.log("Inside app.delete");
  console.log("Slide Id to Delete: " + req.body.id);
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