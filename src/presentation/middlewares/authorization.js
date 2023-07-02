
import Jwt from "jsonwebtoken";

const authorization = (permission) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token de acceso' });
      }

      const decodedToken = Jwt.verify(token, process.env.PRIVATE_KEY); 

      req.user = decodedToken.user;

      if (!req.user.role?.permissions.includes(permission)) {
        return res.status(401).send({ message: 'No tienes autorización' });
      }

      next();
    } catch (error) {
      return res.status(401).send({ message: 'Token inválido' });
    }
  };
};

export default authorization;