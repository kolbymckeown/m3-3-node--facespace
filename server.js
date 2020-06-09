'use strict';

const express = require('express');
const morgan = require('morgan');

const { users } = require('./data/users');

let currentUser = {};

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

const handleHomepage = (req, res) => {
  res.status(200).render('pages/homepage', { users: users });
};

const handleProfilePage = (req, res) => {
  const userId = req.params._id
  const user = users.find((elem) => {
    if (elem._id === userId) return true;
  })
  if (user) {
  res.status(200).render(`pages/profile`, { 
    title: user,
    user: user }) // outputting blank page (Not showing users.name)

}

};

// -----------------------------------------------------
// server endpoints
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints

  .get('/', handleHomepage)
  .get('/users/:_id', handleProfilePage)


  // a catchall endpoint that will send the 404 message.
  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'));
