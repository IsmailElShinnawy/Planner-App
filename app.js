const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const List = require('./models/list');
const userRouter = require('./routes/userRoutes');
const listRouter = require('./routes/listRoutes');

require('dotenv').config();

const app = express();

const dbURI = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.3922v.mongodb.net/plannerDB?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000, () => console.log('listening to port 3000...')))
    .catch(err => console.log(err));

// app.listen(3000, () => console.log('listening to requests on PORT 3000'));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret string',
    resave: false,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    //redirects to login page if not logged in otherwise to home page
    res.redirect('/users/login');
});


app.use('/users', userRouter);
app.use('/lists', listRouter);

app.get('/home', (req, res) => {
    List.find({ userId: req.session.userId }).sort({ updatedAt: -1 })
        .then(results => res.render('home', { title: 'Home', lists: results }))
        .catch(err => console.log(err));
});
