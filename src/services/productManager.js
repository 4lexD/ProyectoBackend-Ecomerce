import ProductDao from "../data/productDAO.js";

class ProductManager{

    constructor(){
        this.products = new ProductDao();
    }

    async getAll(paginate){
        try {
            return this.products.find(paginate);
        } catch (error) {
            throw error;
        }
    }

    async getOne(id){
        try {
            return this.products.findById(id)
        } catch (error) {
            throw error;
        }
    }

    async addOne(data){
        try {
            return this.products.create(data);
        } catch (error) {
            throw error;
        }
        
    }

    async updateOne(id, data){
        try {
          return this.products.updateById(id, data);  
        } catch (error) {
            throw error;
        }
        
    }

    async deleteOne(id){
        try {
            return this.products.removeById(id);
        } catch (error) {
            throw error;
        }
    };


};
export default ProductManager;