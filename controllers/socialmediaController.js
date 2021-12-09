const { SocialMedia, User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
 
 
class SosialMediaController {
 
  static inputSosialMedia(req, res) {
    var userId = verifyToken(req.headers.token).id
    Object.assign(req.body, { userid: userId })
    SocialMedia.create(req.body)
      .then(result => {
        res.status(201).json({
          social_media: result.dataValues
        });
      })
      .catch((err => {
        res.status(500).json({
          message: err.errors[0].message
        });
      }));
  }
 
  static getSosialMedia(req, res) {
    SocialMedia.belongsTo(User, { foreignKey: 'userid' })
    User.hasMany(SocialMedia, { foreignKey: 'id' })
    SocialMedia.findAll({
      include: [User],
    }).then(result => {
      var newData = result.map(r => {
        return {
          "id": r.id,
          "name": r.name,
          "social_media_url": r.social_media_url,
          "userid": r.userid,
          "createdAt": r.createdAt,
          "updatedAt": r.updatedAt,
          "User": {
            "id": r.User.id,
            "username": r.User.username,
            "profile_image_url": r.User.profile_image_url
          }
        }
      })
      res.status(201).json({
        social_media: newData
      });
    }).catch((err => {
      res.status(500).json({
        message: err.errors[0].message
      });
    }));
  }
 
  static updateSosialMedia(req, res) {
    SocialMedia.update(req.body,
      {
        where: {
          id: req.params.id
        },
        returning: true
      }).then(result => {
        res.status(201).json({
          social_media: result[1][0]
        });
      })
      .catch((err => {
        res.status(500).json({
          message: err.errors[0].message
        });
      }));
  }
 
  static deleteSosialMedia(req, res) {
    SocialMedia.destroy(
      {
        where: {
          id: req.params.id
        },
      }).then((result) => {
        if (!result) {
          res.status(500).json({ message: "Account does not exist" })
        } else {
          res.status(201).json({
            message: "Your social media has been successfully deleted"
          });
        }
      })
      .catch((err => {
        res.status(500).json(err)
      }));
  }
}
 
module.exports = SosialMediaController;