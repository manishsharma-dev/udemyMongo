const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database', () => {
    let jaya, manish, joe, zach
    beforeEach((done) => {
        jaya = new User({ name: 'jaya' });
        manish = new User({ name: 'manish' });
        joe = new User({ name: 'joe' });
        zach = new User({ name: 'zach' });
        Promise.all([jaya.save(), zach.save(), manish.save(), joe.save()])
            .then(() => {
                done();
            })

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

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                console.log(users);
                 assert(users.length === 2);
                assert(users[0].name === 'joe');
                assert(users[1].name === 'manish');
                done();
            })
    })


});