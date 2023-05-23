import { createHash, isValidPassword, generateToken } from "../shared/index.js";
import loginValidation from "../validations/LoginFormatValidation.js";
import UserManager from "./userManager.js";

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

        const accessToken = await generateToken(user);

        return accessToken;  
    }


};

export default SessionManager;