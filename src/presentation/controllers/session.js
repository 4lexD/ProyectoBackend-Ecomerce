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
      res.status(200).send({ status: 'Success', message: "logout exitoso"});
    } catch (e) {
      next(e)
    }
  }

  static forgotPassword = async (req, res,next) => {
    try {
      const {email} = req.body
      const sessionManager = new SessionManager();
      sessionManager.forgotPassword(email);
      res.status(200).send({ status: 'Success', message: "email enviado"});
    } catch (e) {
      next(e)
    }
  }
  static resetPassword = async (req, res,next) => {
    try {
      const {user} = req.decodedToken;
      const {password} = req.body;
      const sessionManager = new SessionManager();
      sessionManager.resetPassword(user.id,password);
      res.status(200).send({ status: 'Success', message: "contraseña cambiada"});
    } catch (e) {
      next(e)
    }
  }


  
}

export default SessionController;