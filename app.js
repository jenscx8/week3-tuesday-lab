import sample from 'lodash.sample'
import express from 'express';
import morgan from 'morgan';
import nunjucks from 'nunjucks';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${server.address().port}...`);
});

const COMPLIMENTS = [
  'awesome',
  'terrific',
  'fantastic',
  'neato',
  'fantabulous',
  'wowza',
  'oh-so-not-meh',
  'brilliant',
  'ducky',
  'coolio',
  'incredible',
  'wonderful',
  'smashing',
  'lovely',
];

// Display the homepage
app.get('/', (req, res) => {
  res.render('index.html');
});

// Display a form that asks for the user's name.
app.get('/hello', (req, res) => {
  res.render('hello.html');
});

// Handle the form from /hello and greet the user.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'stranger';
  const compliment = sample(COMPLIMENTS)
  res.render('greet.html.njk', { name: name, compliment: compliment });
});
// Handle the form from /game
app.get('/game', (req, res) => {
  if (req.query.play === 'yes') {
    res.render('game.html')
  } else {
    res.render('goodbye.html')
  }
})
// Handle the form from /madlib
app.get('/madlib', (req, res) => {
  const person = req.query.name
  const color = req.query.color
  const noun = req.query.noun
  const adjective = req.query.adjective

  res.render('madlibs.html.njk', { name: person, name: color, name: noun, name: adjective })
})