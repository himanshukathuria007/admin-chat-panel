const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');

const users = express.Router()
const cors = require('cors')


users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            const payload = {
              _id: user._id,
              username: user.username,
             
              email: user.email
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        const payload = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users

// // register
// router.post('/register', (req, res, next) => {
//   let response = { success: false };
//   if (!(req.body.password == req.body.confirmPass)) {
//     let err = "The passwords don't match";
//     return next(err);
//   } else {
//     let newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     User.addUser(newUser, (err, user) => {
//       if (err) {
//         response.msg = err.msg || 'Failed to register user';
//         res.json(response);
//       } else {
//         response.success = true;
//         response.msg = 'User registered successfuly';
//         response.user = {
//           id: user._id,
//           username: user.username,
//         };
//         console.log('[%s] registered successfuly', user.username);
//         res.json(response);
//       }
//     });
//   }
// });

// router.post('/authenticate', (req, res, next) => {
//   let body = req.body;
//   let response = { success: false };

//   User.authenticate(body.username.trim(), body.password.trim(), (err, user) => {
//     if (err) {
//       response.msg = err.msg;
//       res.json(response);
//     } else {
//       // create the unique token for the user
//       let signData = {
//         id: user._id,
//         username: user.username,
//       };
//       let token = jwt.sign(signData, config.secret, {
//         expiresIn: 604800,
//       });

//       response.token = 'JWT ' + token;
//       response.user = signData;
//       response.success = true;
//       response.msg = 'User authenticated successfuly';

//       console.log('[%s] authenticated successfuly', user.username);
//       res.json(response);
//     }
//   });
// });

// // profile
// router.get(
//   '/profile',
//   passport.authenticate('jwt', { session: false }),
//   (req, res, next) => {
//     let response = { success: true };
//     response.msg = 'Profile retrieved successfuly';
//     response.user = req.user;
//     res.json(response);
//   }
// );

// // user list
// router.get('/', (req, res, next) => {
//   User.getUsers()
//     .then(users => {
//       let response = {
//         success: true,
//         users: users,
//       };
//       return res.json(response);
//     })
//     .catch(err => {
//       log.err('mongo', 'failed to get users', err.message || err);
//       return next(new Error('Failed to get users'));
//     });
// });

// module.exports = router;
