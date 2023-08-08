import { decodeToken } from "../../shared/index.js";


const verifyToken = async (req, res, next) =>{
    try {
        const {token} = req.params; 

        const decodedToken = await decodeToken(token)
        req.decodedToken = decodedToken;

        next()
    } catch (error) {
        res.status(401).send('Invalid token');
    }

}

export default verifyToken;