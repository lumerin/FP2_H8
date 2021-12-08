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

// user
route.post("/users/register", userController.register);
route.post("/users/login", userController.login);

// authentication middleware
route.use(authentication);

// user authorization middleware
route.use("/users/:id", userAuthorization);

route.put("/users/:id", userController.update);
route.delete("/users/:id", userController.delete);

// photos
route.post("/photos", photoController.create);
route.get("/photos", photoController.getAll);

// photos authorization middleware
route.use("/photos/:id", photoAuthorization);

route.put("/photos/:id", photoController.update);
route.delete("/photos/:id", photoController.delete);

module.exports = route

