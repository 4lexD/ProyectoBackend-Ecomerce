import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from "fs"
import { resolve } from 'path';

export const createHash = async (password) =>
{
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user)=>{
    return await jwt.sign({user:{...user,password:undefined}}, process.env.PRIVATE_KEY , {expiresIn: '2m'});
}
export const  decodeToken = async (token)=>{
    return await jwt.verify(token,process.env.PRIVATE_KEY);
}
export const getTemplateSource = (templateFile) =>{
    const templatePath = resolve(`src/presentation/templates/${templateFile}`);
    const source = fs.readFileSync(templatePath).toString();

    return source
}