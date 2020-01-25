const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
import mongooose from 'mongoose';
import Enterprise from './models/Enterprise';
import User from './models/User';
import Product from './models/Product';

const app = express();

const router = express.Router();

const url = 'mongodb://localhost:27017/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());



app.get('/ping', (req, res, next) => {
  res.status(200).json('pong!');
});

//
//     @namespace register
//     This function register an user of type influencer.
//     @Params:
//     user: object of type user, have next attributes
//     user.email: email of user you want to register
//     user.password: password of user you want to register
//     @Return:
//     json with this attributes:
//     status(code): 422 errror
//     status(string): status of the answer success, error..
//     errorMessage: if it has an error you can see the type here
//     user: if it is success it returns an user
//
router.route('/register').post((req, res, next) => {
  mongooose.connect(url);
  const connection = mongooose.connection;
  let user = new User(req.body);
  console.log(user);
  Enterprise.findOne({email: user.email}, (err, auxEnterprise) => {
      if(!auxEnterprise){
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
              token: token,
              errorMessage: null
            })}
          });
        })
        .catch(err => {
          console.log(err)
          res.status(400).send('Failed to create new user');
        });
      } else {
      res.status(400).send('Failed to create new user');
      }
  })
})

//     @namespace login
//     This function check if the user received is correct, if it is correct
//     it generates a jwt tocken of authentification for the session
//     @Params:
//     email: email of the user
//     password: password of the user without encript
//     @Return:
//     json with the attributes:
//     if success
//       status: success
//       type: type of the user (User | Enterprise)
//       token: token generated
//     if error
//       code of error
//       status: error
//       errorMessage
// 
router.route('/login').post((req, res, next) => {
  mongooose.connect(url);
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
      Enterprise.findOne({ email: email}, (err, enterprise) => {
        if(email === enterprise.email && password === enterprise.password) {
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
            type: 'enterprise',
            token: token,
            errorMessage: null
          })}
        });
        }
      })
    } else {
      if (email === user.email && password === user.password) {
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
            type: 'user',
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

//     @namespace register-enterprise
//     This function register an user of type enterprise.
//     @Params:
//     user: object of type enterprise, have next attributes
//     user.email: email of user you want to register
//     user.password: password of user you want to register
//     @Return:
//     json with this attributes:
//     status(code): 422 errror
//     status(string): status of the answer success, error..
//     errorMessage: if it has an error you can see the type here
//     user: if it is success it returns an user
//
router.route('/register-enterprise').post((req, res, next) => {
  mongooose.connect(url);
  const connection = mongooose.connection;
  let user = new Enterprise(req.body);
  console.log(user);
  User.findOne({ email: user.email }, (err, auxUser) => {
  if (err) {
    res.status(422).json({
      status: 'error',
      errorMessage: err
    })
  }
  if (!auxUser) {
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
            token: token,
            errorMessage: null
          })}
        });
      })
      .catch(err => {
        console.log(err)
        res.status(400).send('Failed to create new user');
      });
    } else {
      res.status(400).send('Failed to create new user');
    }
  });
});

//   @namespace checkToken
//   This function Check to make sure header is not undefined, if so, return Forbidden (403)
//   @Params: 
//   req: the request
//   @Return: 
//     if success 
//     return token
//     else
//     status(403)
//
const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;
      next();
  } else {
      res.sendStatus(403)
  }
}

//   @namespace users
//   This runctions return all users from bbdd
//   @Return:
//   json with all users.
//
router.route('/users').get((req, res) => {
  mongooose.connect(url);
  const connection = mongooose.connection;
  User.find((err, users) => {
    if (err)
      console.log(err);
    else
      res.json(users);
  });
});


//  @namespace user
//   This function return the complete user object from bbdd
//   @Params:
//   email: email of the user
//   @Return: 
//   user: the complete user from the bbdd
//
router.route('/user').post((req, res) => {
  mongooose.connect(url);
  const connection = mongooose.connection;
  let email = req.body.email;
  console.log(req.body);
  console.log(email);
  User.findOne({"email": {$regex : ".*" + email + ".*"}},(err, user) => {
    if(err) {
      console.log(err)
    }else{
      res.json({
        message: 'user returned',
        user
      });
    }
  })
})

//  @namespace products
//  This function return all the products from bbdd
//  Check that the jwt token is correct 
//  @Params:
//  req.token: we check the token in order to return the products
//  @Return:
//  if token is correct:
//  products: all the products from bbdd
//  if fail:
//  status(403): direction protected 
// 
router.get('/products', checkToken, (req, res) => {
  jwt.verify(req.token, 'privatekey', (err, products) => {
    if(err){
        console.log('ERROR: Could not connect to the protected route');
        res.sendStatus(403);
    } else {
        mongooose.connect(url);
        const connection = mongooose.connection;
        Product.find((err, products) => {
          if(err) {
            console.log(err)
          }else{
            res.json({
              message: 'products returned',
              products
            });
          }
        }
      )
    }
  });
})



//  @namespace products-filter
//  This function return all the products from bbdd with the filter
//  Check that the jwt token is correct 
//  @Params:
//  req.token: we check the token in order to return the products
//  req.filter: string that is contained in the products
//  @Return:
//  if token is correct:
//  products: all the products from bbdd with the filter
//  if fail:
//  status(403): direction protected 
// 
router.post('/products-filter', checkToken, (req, res) => {
  jwt.verify(req.token, 'privatekey', (err, ) =>{
    if(err){
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      mongooose.connect(url);
      const connection = mongooose.connection;
      let filter = req.body.filter;
      console.log(filter);
      let filterRegex = '".*'+ filter +'.*"';
      console.log(filter);

      Product.find(
        {"name": {$regex : ".*" + filter + ".*"}}
      , (err, products) => {
        if(err) {
          console.log(err)
        }else{
          console.log(products);
          res.json({
            message: 'products returned',
            products
          });
        }
      });
    }
  })
})

//   @namespace add-product
//   This function add a product to the bbdd
//   @Params:
//   product: the product that will be aded
//   @Return:
//   if error:
//   status(400)
//
router.route('/add-product').post((req, res, next) => {
  console.log(req.body);
      let product = new Product(req.body);
      console.log(product);
      Product.findOne({name: product.name}, (err, auxProduct) => {
          if(!auxProduct){
            product.save()
            .catch(err => {
              console.log(err)
              res.status(400).send('Failed to create new product');
          });
        } else {
          res.status(400).send('Product code exist yet');
        }
      })
  })

//
//   This function add a like to a product, is for a future feature
//   @Params:
//   Product: the product that is liked
//   liker: the person who gives like
//   @Return:
//   if error
//   status(400)
//
router.route('/like-product').post((req, res, next) => {
  jwt.verify(req.token, 'privatekey', (err, res) => {
    if(err){
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      mongooose.connect(url);
      const connection = mongoose.connection;
      let code = req.body;
      let liker = new User(req.body);
      console.log(code);
      Product.findOne({code: code}, (err, product) => {
        if(product){
          let users = Array.from(product.users);
          console.log(users.push(liker));
          console.log(users);
          product.users = users;
          product.save().catch(err => {
            console.log(err)
            res.status(400).send('Failed to like product');
          })
        } else {
          res.status(400).send('Failed to like product');
        }
      })
    } 
  })
})

//   @namespace edit-product
//   This function allow the user to edit his product
//   No complete
//   // TODO
//
router.route('/edit-product').post((req, res, next) => {
  jwt.verify(req.token, 'privatekey', (err, res) => {
    if(err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      mongooose.connect(url);
      const connection = mongooose.connection;
      let product = req.body;
      console.log(product);
      Product.findOne({code: product.code}, (err, productAux) => {
        if(productAux){
          productAux = product;
          productAux.save().catch(err => {
            console.log(err)
            res.status(400).send('Failed to edit product');
          })
        } else {
          res.status(400).send('Failed to edit product');
        }
      })
    } 
  })
})




app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));