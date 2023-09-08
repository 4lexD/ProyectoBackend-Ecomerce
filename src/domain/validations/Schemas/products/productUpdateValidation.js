import z from 'zod';
import idValidation from "../shared/idValidation.js";
import productValidation from './productValidation.js';


const productUpdateValidation = z.union([
  idValidation,
  productValidation
]);

export default productUpdateValidation;