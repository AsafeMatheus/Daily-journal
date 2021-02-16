const express = require("express");
const bodyParser = require("body-parser");
const lodash = require("lodash")
const ejs = require("ejs");
const { toLower } = require("lodash");

let posts = []

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// HOME
app.get('/', (req, res) => {
  res.render('home', {
    homePosts: posts
  })
})

// ABOUT
app.get('/about', (req, res) => {
  res.render('about')
})

// CONTACT
app.get('/contact', (req, res) => {
  res.render('contact')
})

// COMPOSE
app.get('/compose', (req, res) => {
  res.render('compose')
})
app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    body: req.body.postContent,
  }
  posts.push(post)

  res.redirect('/')
})

// PARAMS
app.get('/posts/:topic', (req, res) => {
  const requestedTitle = lodash.lowerCase(req.params.topic)

  posts.forEach((content) => {
    const postTitle = lodash.lowerCase(content.title)

    if (postTitle == requestedTitle){
      res.render('post', {
        postTitle: content.title,
        postBody: content.body
      })
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});