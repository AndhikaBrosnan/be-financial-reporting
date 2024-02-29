const jwt = require('jsonwebtoken')

module.exports = class JWTHelper {
    constructor() {
        this.jwt = jwt
        this.secret = 'this_token_is_a_dummy_token' // ambil dari mana ini??
    }

    generateJWTToken(payload) {
        return this.jwt.sign(payload, this.secret, {
            expiresIn: '30d'
        })
    }

    decodeJWTToken(token) {
        return this.jwt.verify(token, this.secret)
    }
}