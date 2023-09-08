import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from "fs"
import { resolve } from 'path';
import config from '../config/config.js';
import cron from 'node-cron';

const {PRIVATE_KEY} = config;
export const createHash = async (password) =>
{
    return await bcrypt.hash(password, 10)
}

export const isValidPassword = async (password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user)=>{
    return await jwt.sign({user:{...user,password:undefined}}, PRIVATE_KEY , {expiresIn: '15m'});
}
export const  decodeToken = async (token)=>{
    return await jwt.verify(token,PRIVATE_KEY);
}
export const getTemplateSource = (templateFile) =>{
    const templatePath = resolve(`src/presentation/templates/${templateFile}`);
    const source = fs.readFileSync(templatePath).toString();

    return source
}

export const cronSchedule =(pattern, task)=>{
    cron.schedule(pattern, task);
}