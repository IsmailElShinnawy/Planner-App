const List = require('../models/list');

const list_create_get = (req, res) => {
    res.render('create', { title: 'Create New List' });
}

const list_create_post = (req, res) => {
    const list = new List({
        title: req.body.title,
        description: req.body.shortdescription,
        items: [],
        userId: req.session.userId
    });

    list.save()
        .then((result) => res.redirect('/home'))
        .catch((err) => console.log(err));
}

const list_details_get = (req, res) => {
    List.findById(req.params.id)
        .then(result => res.render('details', { title: 'Details', list: result }))
        .catch(err => console.log(err));
}

function list_additem_put(req, res) {
    List.findById(req.params.id)
        .then(result => {
            result.items.push(req.body.newitem);
            result.save()
                .then(result => res.redirect(`/lists/${result.id}`))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

const list_deleteitem_delete = (req, res) => {
    List.findById(req.params.listid)
        .then(result => {
            result.items.splice(req.params.idx, 1);
            result.save()
                .then(result => res.json({ redirect: `/lists/${result.id}` }))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

const list_delete = (req, res) => {
    List.findByIdAndDelete(req.params.listid)
        .then(result => res.json({ redirect: '/home' }))
        .catch(err => console.log(err));
}

module.exports = {
    list_create_get,
    list_create_post,
    list_details_get,
    list_additem_put,
    list_delete,
    list_deleteitem_delete
}