const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const user = new User({ name: 'Jaya' });
        user.save().then(() => {
                assert(!user.isNew);
                done();
            });
    })
})