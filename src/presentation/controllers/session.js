import SessionManager from "../../domain/services/sessionManager.js";

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
        .send({ accessToken, message: 'Login success!' });
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

  static current = async (req, res,next) => {
    try {
      res.status(200).send({ status: 'Success', payload: req.user });
    } catch (e) {
      next(e)
    }
  }
}

export default SessionController;