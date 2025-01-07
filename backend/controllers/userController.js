// const User = require('../models/userModel');
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'authToken';

//create new user 
const createUser = async (req,res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json("Your account has been created successfuly.");
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
};

const getUser = async (req, res) =>{
    try{
        const {email, password } = req.body;
        if(!email || !password) {
            throw new Error('Email and Password are required.');
        }
        const user = await User.findOne(req.body);
        if(!user) return res.status(401).json('unauthorized');
        const token = jwt.sign({userId: user._id},SECRET_KEY, {expiresIn:'1h'});
        res.cookie('authToken', token, {httpOnly:true, secure:true});
        // Convert to a plain object
        const userObject = user.toObject();
        const { _id, ...userWithoutId } = userObject;
        res.status(200).json(userWithoutId);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const getUserFromToken = async (req, res) => {
    try {
        const token = req;
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error: 'User not found'});
        res.status(200).json(user);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users); 
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}

const deleteUsers = async (req, res) => {
    try{
        const users = await User.deleteMany({});
        res.status(200).json('Users data succesfully deleted')
    }
    catch(err){
        res.status(400).json({error:err.message});
    }
}


export default {createUser, getUsers, getUser, deleteUsers, getUserFromToken};
