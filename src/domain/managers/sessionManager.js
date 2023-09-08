import { createHash, isValidPassword, generateToken } from "../../shared/index.js";
import UserManager from "./userManager.js";
import EmailManager from "./emailManager.js";
import loginValidation from "../validations/Schemas/sessions/loginValidation.js";
import logger from "../../shared/pino/logger.js";

class SessionManager{

    async signUp(userData){
      const manager = new UserManager();

      const result = await manager.addOne(userData);

      return result;
    }

    async logIn(credentials){
      await loginValidation.parseAsync(credentials);
      const { email, password } = credentials;
        
      const manager = new UserManager();
      const user = await manager.getOneByEmail(email);

      const isPasswordValid = await isValidPassword(password, user.password);
        
      if (!isPasswordValid) {
        return { message: 'Login failed' };
      }

      await manager.updateLastConnection(user.id);
      return await generateToken(user);  
    }

  async forgotPassword(mail){
      const userManager = new UserManager();
      const emailManager = new EmailManager()

      const user = await userManager.getOneByEmail(mail);

      if (!user) {
        return { message: 'correo no existe' };
      }

      const templatePath = 'forgotPassword.hbs'
      const token = await generateToken(user);
      const data ={
        user: user.firstName,
        email: user.email,
        token,
        templatePath
      }
        
      const sendMail = emailManager.send( data);
    }

    async resetPassword(id,newpassword){
      const userManager = new UserManager();
      
      const hashPassword = await createHash(newpassword,10);
      const result = await userManager.updateOne(id,{password: hashPassword});

      return result
    }
  
};



export default SessionManager;