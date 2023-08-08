import { createHash, isValidPassword, generateToken } from "../../shared/index.js";
import loginValidation from "../validations/LoginFormatValidation.js";
import UserManager from "./userManager.js";
import EmailManager from "./emailManager.js";

class SessionManager{

    async signUp(userData){
        const manager = new UserManager();

        const dto = {...userData,password: await createHash(userData.password,10)};

        const result = await manager.addOne(dto);

        return result;
    }

    async logIn(credentials){
        const { email, password } = credentials;
        loginValidation.parse({email, password});

        const manager = new UserManager();
        const user = await manager.getOneByEmail(email);

        const isPasswordValid = await isValidPassword(password, user.password);
        
        if (!isPasswordValid) {
          return { message: 'Login failed' };
        }


        
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