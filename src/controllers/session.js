import SessionManager from "../services/sessionManager.js";

class SessionController{
  static SignUp = async (req,res,next)=>{
    try {
      const userData = req.body;

      const sessionManager = new SessionManager();

      const result = await sessionManager.signUp(userData);

      res.status(201).send({ status: 'success', result, message: 'User created.' });

    } catch (e) {
       next(e);
    }

  }

  static logIn = async (req,res,next) => {
    try {
      const credentials = req.body;

      const sessionManager = new SessionManager();

      const accessToken = await sessionManager.logIn(credentials);

      res
        .cookie('accessToken', accessToken,{
          maxAge: 60 * 60 * 1000,
          httpOnly: true
        })
        .status(200)
        .send({ message: 'Login success!' });
    } catch (e) {
      next(e);
    }
  }

  static logOut = async (req,res,next) => {
    try {
      res.status(200).send({ status: 'success', message: "logout exitoso" });
    } catch (e) {
      next(e);
    }
  }

  static private = async (req, res,next) => {
    try {
      if (req.user.role !== "user") {
        return res.status(403).send({ message: 'No tienes los permisos adecuados' });
      }
      res.send({ message: 'Ruta protegida para usuarios con el rol "user"' });
    } catch (e) {
      next(e)
    }
  }
}

export default SessionController;