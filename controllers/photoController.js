const { Photo, Comment, User } = require("../models");

class photoController {

    static create(req, res) {
        const user = res.locals.user;
        let input = {
			title: req.body.title,
            caption: req.body.caption,
            poster_image_url: req.body.poster_image_url,
            userid: user.id
		};
        Photo.create(input)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err.errors[0].message
            });
        });
    }

    static getAll(req, res) {
        const user = res.locals.user;
        Photo.findAll({
            where: { userid: user.id },
            include: [
                {
                    model: Comment,
                    attributes: [ 'comment' ],
                    include: [
                        {
                            model: User,
                            attributes: [ 'username' ]
                        }
                    ]
                },
                {
                    model: User,
                    attributes: [
                        'id',
                        'username',
                        'profile_image_url'
                    ]
                }
            ]
        })
        .then(result => {
            res.status(200).json({
                photos: result
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }

    static update(req, res) {
        let id = req.params.id;
        let input = {
			title: req.body.title,
            caption: req.body.caption,
            poster_image_url: req.body.poster_image_url
		};
        Photo.update(
            input,
            {
                where: {
                    id: id
                },
                returning: true
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                message: err.errors[0].message
            });
        });
    }

    static delete(req, res) {
        let id = req.params.id;
        Photo.destroy({
            where: {
                id: id
            }
        })
        .then(result => {
            if (!result) {
                res.status(500).json({ message: "Photo does not exist" });
            } else {
                res.status(200).json({ message: "Your photo has been successfully deleted" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
    }

}

module.exports = photoController;