
import container from "../../container.js";
import productUpdateValidation from "../validations/Schemas/products/productUpdateValidation.js";
import idValidation from "../validations/Schemas/shared/idValidation.js";

class ProductManager{

    constructor(){
       this.products = container.resolve('ProductRepository');
    }

    async getAll(paginate){
        return this.products.find(paginate);
    }

    async getOne(id){
        await idValidation.parseAsync(id);
        return this.products.findById(id);
    }

    async addOne(data){
        return this.products.create(data);
    }

    async updateOne(id, data){
        await productUpdateValidation.parseAsync(...data,id)
        return this.products.updateById(id, data);  
    }

    async deleteOne(id){
        await idValidation.parseAsync(id);
        return this.products.removeById(id);
    };


};
export default ProductManager;