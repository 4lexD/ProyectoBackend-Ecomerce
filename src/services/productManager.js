import ProductDao from "../data/productDAO.js";

class ProductManager{

    constructor(){
        this.products = new ProductDao();
    }

    async getAll(paginate){
        return this.products.find(paginate);
    }

    async getOne(id){
        return this.products.findById(id);
    }

    async addOne(data){
        return this.products.create(data);
    }

    async updateOne(id, data){
        return this.products.updateById(id, data);  
    }

    async deleteOne(id){
        return this.products.removeById(id);
    };


};
export default ProductManager;