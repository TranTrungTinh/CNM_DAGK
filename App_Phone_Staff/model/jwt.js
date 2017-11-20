const {sign , verify} = require('jsonwebtoken');
const KEY = 'i2u1e812udjsacnfq2qy412321dsadsa&%$687542';

function createToken(obj) {
    return new Promise((resolve, reject) => {
        sign(obj, KEY, { expiresIn: '2 days' }, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        verify(token, KEY, (err, obj) => {
            if (err) return reject(err);
            delete obj.iat;
            delete obj.exp;
            resolve(obj);
        });
    });
}
module.exports = {createToken ,verifyToken};