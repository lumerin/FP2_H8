const route = require("express").Router();
const authentication = require("../middlewares/authentication");
const { userAuthorization, photoAuthorization, sosialMediaAuthorization } = require("../middlewares/authorization");
const userController = require("../controllers/userController");
const photoController = require("../controllers/photoController");
const sosialMediaController = require("../controllers/socialmediaController");
 
 
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
 
route.post("/socialmedias", sosialMediaController.inputSosialMedia)
route.get("/socialmedias", sosialMediaController.getSosialMedia)
route.use("/socialmedias/:id", sosialMediaAuthorization);
route.put("/socialmedias/:id", sosialMediaController.updateSosialMedia)
route.delete("/socialmedias/:id", sosialMediaController.deleteSosialMedia)
 
module.exports = route