import z from 'zod';
import idValidation from "../shared/idValidation.js";
import userValidation from './userValidation.js';


const userUpdateValidation = z.union([
  idValidation,
  userValidation
]);

export default userUpdateValidation;