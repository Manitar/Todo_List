const User = require('../models/User'); // Assuming User model is in models/User.js
const bcrypt = require('bcrypt'); // For password hashing

async function findUserByEmail(email){
    try{
        const user = await User.findOne({email})
        if(!user){
            throw new Error(`User with email ${email} not found`); 
        }
        return user
    } catch(err){
        res.status(500).json({ error: err.message });
    }
}

async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err){
        throw new Error(`Error with hashing password`)
    }
 
}

async function comparePassword(userInputPassword, passwordInDb){
    try{
        const isMatch = await bcrypt.compare(userInputPassword, passwordInDb)
        return isMatch
    } catch (err){
        throw new Error(`Error with comparing passwords`)
    }
}


const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await findUserByEmail(email)
        const isMatch = await comparePassword(password, user.password)
        if(!isMatch){
            return res.status(401).json({error: `Wrong credentials`})
        }
        res.status(200).json({userId: user._id.toString()})
    } catch (err){
        res.status(500).json({error: `Could not login user with email ${req.body.email}`})
    }

}

const registerUser = async(req, res) => {
    try{
        const {email, password} = req.body
        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({email, password: hashedPassword})
        
        res.status(201).json({message: `User created successfully`})
    } catch (err){
        res.status(500).json({error:`Could not register user with email ${req.body.email}` })
    }



    
}

module.exports = {
    loginUser,
    registerUser
  };

