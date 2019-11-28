const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
import mongooose from 'mongoose';
import Enterprise from './models/Enterprise';
import User from './models/User'

const app = express();

const router = express.Router();

const url_enterprise = 'mongodb://localhost:27017/Enterprise';
const url_user = 'mongodb://localhost:27017/User';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.get('/ping', (req, res, next) => {
  res.status(200).json('pong!');
});

router.route('/register').post((req, res, next) => {
  mongooose.connect(url_user);
  const connection = mongooose.connection;
  let user = new User(req.body);
  console.log(user);
  user.save()
  .then(user => {
    jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
      if (err) {       
        res.status(422).json({
        status: 'error',
        errorMessage: err
      })} else {
      res.status(200).json({
        status: 'success',
        user : {
          email: user.email
        },
        user: {
          address: user.address
        },
        token: token,
        errorMessage: null
      })}
    });
  })
  .catch(err => {
    console.log(err)
      res.status(400).send('Failed to create new user');
  });
});


router.route('/login').post((req, res, next) => {
  mongooose.connect(url_user);
  const connection = mongooose.connection;
  const { body } = req;
  const { email } = body;
  const { password } = body;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        errorMessage: err
      })
    }
    if (!user) {
      res.status(422).json({
        status: 'error',
        errorMessage: err
      })
    } else {
      //checking to make sure the user entered the correct username/password combo
      if (email === user.email && password === user.password) {
        //if user log in success, generate a JWT token for the user with a secret key
        jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
          if (err) { 
            res.status(422).json({
            status: 'error',
            errorMessage: 'not matching user and password'
          }) } else {
          res.status(201).json({
            status: 'success',
            user : {
              email: email
            },
            token: token,
            errorMessage: null
          })}
        });
      } else {
        res.status(422).json({
          status: 'error',
          errorMessage: 'not matching user and password'
        })
      }
    }
  })
});

router.route('/register-enterprise').post((req, res, next) => {
  mongooose.connect(url_enterprise);
  const connection = mongooose.connection;
  let user = new Enterprise(req.body);
  console.log(user);
  user.save()
  .then(user => {
    jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
      if (err) {       
        res.status(422).json({
        status: 'error',
        errorMessage: err
      })} else {
      res.status(200).json({
        status: 'success',
        user : {
          email: user.email
        },
        user: {
          address: user.address
        },
        user: {
          enterprise: user.enterprise
        },
        user: {
          cif: user.cif
        },
        token: token,
        errorMessage: null
      })}
    });
  })
  .catch(err => {
    console.log(err)
      res.status(400).send('Failed to create new user');
  });
});


router.route('/login-enterprise').post((req, res, next) => {
  mongooose.connect(url_enterprise);
  const connection = mongooose.connection;
});

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;
      next();
  } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
  }
}

router.route('/users').get((req, res) => {
  mongooose.connect(url_user);
  const connection = mongooose.connection;
  User.find((err, users) => {
    if (err)
      console.log(err);
    else
      res.json(users);
  });
});


app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));