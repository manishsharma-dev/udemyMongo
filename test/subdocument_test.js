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
});