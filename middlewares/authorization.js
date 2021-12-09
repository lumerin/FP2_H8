const { User, Photo, SocialMedia } = require("../models");
 
function userAuthorization(req, res, next) {
  const userId = req.params.id;
  const authenticationUser = res.locals.user;
 
  User.findOne({
    where: {
      id: userId
    }
  })
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(404).json({
          name: "Data not found",
          message: `User with id "${userId}" not found`
        });
      }
      if (user.id === authenticationUser.id) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization error",
          message: `User with email "${authenticationUser.email}" does not have permission to access User with email "${authenticationUser.email}"`
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}
 
function photoAuthorization(req, res, next) {
  const photoId = req.params.id;
  const authenticationUser = res.locals.user;
 
  Photo.findOne({
    where: {
      id: photoId
    }
  })
    .then(photo => {
      if (!photo) {
        return res.status(404).json({
          name: "Data not found",
          message: `Photo with id "${id}" not found`
        });
      }
      if (photo.userid === authenticationUser.id) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization error",
          message: `User with email "${authenticationUser.email}" does not have permission to access User with email "${authenticationUser.email}"`
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}
 
function sosialMediaAuthorization(req, res, next) {
  const sosmedId = req.params.id;
  const authenticationUser = res.locals.user;
 
  SocialMedia.findOne({
    where: {
      id: sosmedId
    }
  })
    .then(sosmed => {
      if (!sosmed) {
        return res.status(404).json({
          name: "Data not found",
          message: `Sosial media with id "${id}" not found`
        });
      }
      if (sosmed.userid === authenticationUser.id) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization error",
          message: `User with email "${authenticationUser.email}" does not have permission to access User with email "${authenticationUser.email}"`
        });
      }
    })
    .catch(err => {
      return res.status(500).json(err);
    })
}
 
module.exports = {
  userAuthorization,
  photoAuthorization,
  sosialMediaAuthorization
}