import { createHash, isValidPassword } from "../shared/bcryptHash.js";
import UserManager from "../services/userManager.js";

class SessionController{
    static SignUp = async (req,res)=>{
        try {
            const manager = new UserManager();
        
            const document = {...req.body, password: await createHash(req.body.password,10)}
        
            const result = await manager.addOne(document);

            es.status(201).send({ status: 'success', result, message: 'User created.' });

        } catch (error) {
            res.status(500).send({error: error.message});
        }

    }

    static logIn = async (req, res) => {
        try {
          const { email, password } = req.body;
          const manager = new UserManager();
          const user = await manager.getOneByEmail(email);
          const isPasswordValid = await isValidPassword(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).send({ message: 'Login failed' });
          }
      
          req.session.user = { email, role: user.role };
          res.send({ message: 'Login success!' });
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
    }

}

export default SessionController;