const jwt = require('jsonwebtoken')
const jwtToken = (user) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    return token
}

module.exports = jwtToken