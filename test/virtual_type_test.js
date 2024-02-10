const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postcount returns number of posts', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'A new post' }]
        });
        joe.save()
            .then(() => User.findOne({ name: 'joe' }))
            .then((user) => {
                assert(joe.postCount === 1);
                done();
            })
    })
})