import { productModel } from "../models/productModel.js";


class ProductDao {

    async create(data){
        try {

            const productDocument = await productModel.create(data);

            return {
                id: productDocument._id,
                title:productDocument.title,
                description: productDocument.description,
                price:productDocument.price,
                thumbnail: productDocument.thumbnail,
                code:productDocument.code,
                stock: productDocument.stock
            };            
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async find(){
        try {
            const productDocument = await productModel.find({status:true});

            return productDocument.map(document => ({
                id: document._id,
                title: document.title,
                description: document.description,
                price: document.price,
                thumbnail: document.thumbnail,
                code: document.code,
                stock: document.stock
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    async findById(id){
        try {
          const productDocument = await productModel.findOne({_id:id, status: true});  

            return {
                id: productDocument._id,
                title:productDocument.title,
                description: productDocument.description,
                price:productDocument.price,
                thumbnail: productDocument.thumbnail,
                code:productDocument.code,
                stock: productDocument.stock
            }  
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    }

    async updateById(id, data){
        try {
            const productDocument = await productModel.findOneAndUpdate({_id:id}, data,{new: true});

            return {
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                price: productDocument.price,
                thumbnail: productDocument.thumbnail,
                code: productDocument.code,
                stock: productDocument.stock
            }; 
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async removeById(id){
        try {

          const productDocument = await productModel.findByIdAndUpdate({_id:id}, {status: false} ,{new: true});
          return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            price: productDocument.price,
            thumbnail: productDocument.thumbnail,
            code: productDocument.code,
            stock: productDocument.stock
        }

        } catch (error) {
            console.error(error);
            throw error;
        }
        
    }


};

export default ProductDao;