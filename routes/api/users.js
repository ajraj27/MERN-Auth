const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../../validation/Register");
const validateLoginInput = require("../../validation/Login");

const User = require("../../Models/User");
const secret=process.env.SECRET || "anuj";

router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.send({errors,status:400});
    }

  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.send({errors:{ email: "Email already exists"},status:400});
      }

  const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.status(200).send(user))
              .catch(err => console.log(err));
          });
        });
    });
});

router.post("/login", (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.send({errors,status:400});
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
      if (!user) {
        return res.send({ errors:{emailnotfound: "Email not found"} ,status:400});
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name
          };

          jwt.sign(
            payload,
            secret,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
                name:user.name
              });
            }
          );
        } else {
          return res.send({ errors:{passwordincorrect: "Password incorrect"},status:400 });
        }
      });
    });
  });

  module.exports=router;
