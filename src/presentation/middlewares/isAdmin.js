import jwt from 'jsonwebtoken';

const isAdmin = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    return res.status(401).send({ message: 'Empty authentication' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);

    if (!decodedToken.user.isAdmin) {
      return res.status(403).send({ message: 'Access denied. Administrator permission is required' });
    }

    next();
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

export default isAdmin;