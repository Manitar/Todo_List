const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const secretKey = process.env.JWT_SECRET
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401)
    }

    try{
        const decoded = jwt.verify(token, secretKey)
        req.userId = decoded.userId
        next()
    } catch (err){
        console.error(err)
        return res.sendStatus(403)
    }

}

module.exports = authMiddleware

