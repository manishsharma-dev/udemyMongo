const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', () => {
    let jaya;

    beforeEach((done) => {
        jaya = new User({ name: 'jaya', postCount: 0 });
        jaya.save()
            .then((response) => { done(); })
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'manish');
                done();
            });
    }

    it('instance type using set and save', (done) => {
        jaya.set('name', 'manish');
        assertName(jaya.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(jaya.updateOne({ name: 'manish' }), done);
    });

    it('A model class can update', (done) => {
        assertName(
            User.updateMany({ name: 'jaya' }, { name: 'manish' }),
            done)
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'jaya' }, { name: 'manish' }),
            done
        )
    });

    it('A model class can find a record with an Id update', (done) => {
        assertName(
            User.findByIdAndUpdate(jaya._id, { name: 'manish' }),
            done
        )
    });

    it('A user can have there post count incremented by 1', (done) => {
        User.updateMany({ name: 'jaya' }, { $inc: { postCount: 10 } })
            .then(() => User.findOne({ name: 'jaya' }))
                .then((user) => {
                    assert(user.postCount == 10);
                    done();
                })
    })
});