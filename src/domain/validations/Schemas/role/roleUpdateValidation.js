import z from 'zod';
import idValidation from "../shared/idValidation.js";
import roleValidation from './roleValidation.js';


const roleUpdateValidation = z.union([
  idValidation,
  roleValidation
]);

export default roleUpdateValidation;