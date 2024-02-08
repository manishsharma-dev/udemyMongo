const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database', () => {
    let jaya
    beforeEach((done) => {
        jaya = new User({ name: 'jaya' });
        jaya.save()
            .then((response) => { done(); })
    })

    it('finds all users with name of jaya', (done) => {
        User.find({ name: 'jaya' }).then((users) => {
            assert(users[0]._id.toString() === jaya._id.toString());
            done()
        });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: jaya._id }).then((user) => {
            assert(user.name === 'jaya');
            done();
        })


    })
})