"use strict";

const express = require("express");
const morgan = require("morgan");

const { users } = require("./data/users");

let currentUser = {};

const getFriends = (arr) => {
	return users.filter((user) => arr.includes(user._id));
};

// declare the 404 function
const handleFourOhFour = (req, res) => {
	res.status(404).send("I couldn't find what you're looking for.");
};

const handleHomepage = (req, res) => {
	res.status(200).render("pages/homepage", { users: users });
};

const handleProfilePage = (req, res) => {
	const userId = req.params._id;
	const user = users.find((elem) => {
		if (elem._id === userId) return true;
	});
	if (user) {
		res.status(200).render(`pages/profile`, {
			title: user,
			user: user,
			friends: getFriends(user.friends),
		});
	}
};

const handleSignin = (req, res) => {
  res.status(200).render('pages/signin');
}

const handleName = (req, res) => {
  const firstName = req.query.firstName;
  const user = users.find((elem) => {
    if (elem._id === firstName || elem.name.toLocaleLowerCase() === firstName.toLocaleLowerCase()) return true;
  });

  if (user) {
    currentUser = user;
    res.status(200).redirect(`users/${user._id}`);
  } else {
    res.status(404).redirect('/signin');
  }
};

// Questions: Change Sign In to greeting on someones profile
// CSS Hover transition snapping back

// -----------------------------------------------------
// server endpoints
express()
	.use(morgan("dev"))
	.use(express.static("public"))
	.use(express.urlencoded({ extended: false }))
	.set("view engine", "ejs")

	// endpoints

	.get("/", handleHomepage)
	.get("/users/:_id", handleProfilePage)
  .get("/signin", handleSignin)
  .get('/getname', handleName)

	// a catchall endpoint that will send the 404 message.
	.get("*", handleFourOhFour)

	.listen(8000, () => console.log("Listening on port 8000"));
