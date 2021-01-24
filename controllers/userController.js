const User = require('../models/user');

const user_login_get = (req, res) => {
    res.render('login', { title: 'Login' });
}

const user_login_post = async (req, res) => {
    let user = await User.findOne({ username: req.body.username, password: req.body.password });
    if (user) {
        req.session.userId = user._id;
        res.redirect('/home');
    } else {
        console.log('user doesn\'t exist');
        res.render('login', { title: 'Login' });
    }
}

const user_register_get = (req, res) => {
    res.render('register', { title: 'Register' });
}

const user_register_post = async (req, res) => {
    let user = await User.findOne({ username: req.body.username });

    if (user) {
        console.log('user already exists');
        res.render('register', { title: 'Register' });
    } else {
        user = new User(req.body);
        user.save()
            .then(result => res.redirect('/'))
            .catch(err => console.log(err));
    }
}


module.exports = {
    user_login_get,
    user_login_post,
    user_register_get,
    user_register_post
}

