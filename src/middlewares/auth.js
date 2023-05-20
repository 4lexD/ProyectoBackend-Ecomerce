
const auth = (req, res, next) => {
    if (req.session.user && req.session.user.role === "user") {
      next();
    } else {
      res.status(401).send({ message: 'Usuario sin permiso' });
    }
};

export default auth;

  

