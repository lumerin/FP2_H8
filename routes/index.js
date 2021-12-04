const route = require("express").Router();
const authentication = require("../middlewares/authentication");
const { userAuthorization, photoAuthorization } = require("../middlewares/authorization");
const userController = require("../controllers/userController");
const photoController = require("../controllers/photoController");


route.get("/", (req, res) => {
	res.json({
		page: "home",
	});
});

route.post("/users/register", userController.register)
route.post("/users/login", userController.login)

// authentication middleware
route.use(authentication);

// user authorization middleware
route.use("/users/:id", userAuthorization);

route.put("/users/:id", userController.update)
route.delete("/users/:id", userController.delete)

// route.post("/api/v1/login", userController.login);
// route.post("/api/v1/register", userController.register);

module.exports = route

