const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

route.get("/", (req, res) => {
	res.json({
		page: "home",
	});
});

// route.post("/api/v1/login", userController.login);
// route.post("/api/v1/register", userController.register);

module.exports = route

