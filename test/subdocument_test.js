const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create a new Subdocument', (done) => {
        const joe = new User({
            name: 'jaya',
            posts: [{ title: 'A new post' }]
        })
        joe.save()
            .then(() => User.findOne({ name: 'jaya' }))
            .then((user) => {
                assert(user.posts[0].title === 'A new post');
                done();
            })
    })

    it('can add subDocuments to an existing record', (done) => {
        const joe = new User({
            name: 'joe',
            posts: []
        })
        joe.save()
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                user.posts.push({ title: 'A new post' });
                return user.save()
            })
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'A new post');
                done();
            })

    })

    it('can remove an existing subdocument', (done) => {
        const joe = new User({
            name: 'joe',
            posts: [{ title: 'A new post' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                const post = user.posts[0];
                user.posts.pull(post);
                return user.save();
            })
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            })
    })
});

//user.posts.pull(post);