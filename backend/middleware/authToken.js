import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];
    if(!token) return res.status(403).send('Access denied');
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        console.error('Token verification failed:', err.message);
        res.status(401).json({message:'Unauthorized: Invalid token'})
    }
}

export default authenticateToken;