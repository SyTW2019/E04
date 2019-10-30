var cors =  require('cors');
var bodyParser = require('body-parser');
var mongooose = require('mongoose'); 
var express = require('express');
var User = require('./models/User')
var runInNewContext = require('vm');


const app = express();
const router = express.Router();

app.use(cors())
app.use(bodyParser.json());

mongooose.connect('mongodb://localhost:27017//users');

const connection = mongooose.connection;

connection.once('open', () => {
    console.log('MongoDB database connecion established successfully!');
})

router.route('/users').get((req, res) => {
    User.find((err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});

router.route('/users/:id').get((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err)
            console.log(err);
        else
            res.json(user);
    });
});

router.route('/issue/add').post((req, res) => {
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.status(200).json({'user': 'Added successfully'})
    })
    .catch(err => {
        res.status(400).send('Failed to create new user');
    });
});

router.route('/users/update/:id').post((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(!user)
            return runInNewContext(new Error("Could not load user"));
        else{
            user.email = req.body.email;
            user.password = req.body.password;

            user.save().then(user => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/users/delete/:id').get((req, res) => {
    user.findByIdAndRemove({_id: req.params.id}, (err, user) => {
        if(err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

app.use('/', router);
app.listen(4000, () => console.log('Express server running on port 4000'));