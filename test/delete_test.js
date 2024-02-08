const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let jaya;
    beforeEach((done) => {
        jaya = new User({ name: 'jaya' });
        jaya.save()
            .then((response) => { done(); })
    });
    it('model instance remove', (done) => {
        jaya.deleteOne()
            .then((response) => {
                User.findOne({ name: 'jaya' })
            })
            .then((user) => {
                assert(!user)
                done();
            });
    });

    it('class method remove', (done) => {
        User.deleteOne({ name: 'jaya' })
            .then((response) => {
                User.findOne({ name: 'jaya' })
            })
            .then((user) => {
                assert(!user)
                done();
            });
    })
    it('class method findOneAndRemove', (done) => {
        User.findOneAndDelete({ name: 'jaya' }).then((response) => {
            User.findOne({ name: 'jaya' })
        })
            .then((user) => {
                assert(!user)
                done();
            });
    })
    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndDelete(jaya._id).then((response) => {
            User.findOne({ name: 'jaya' })
        })
            .then((user) => {
                assert(!user)
                done();
            });
    });
});