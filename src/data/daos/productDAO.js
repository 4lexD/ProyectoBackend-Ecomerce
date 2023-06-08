import { productModel } from "../models/productModel.js";


class ProductDao {

    async create(data){

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


    }

    async find(paginate){

        // const productDocument = await productModel.find({status:true});
        const { limit = 10, page = 1, sort, query } = paginate;

        const options = {
            limit,
            page,
            sort: sort && { price: SORTVALUE[sort] },
        };

        const filters = {
            status: true,
            filter: query && { filter: { query } }
        };

        const { docs, ...rest } = await productModel.paginate(filters, options)
        const productDocument = docs.map(document => ({
            id: document._id,
            title: document.title,
            description: document.description,
            price: document.price,
            thumbnail: document.thumbnail,
            code: document.code,
            stock: document.stock
        }));

        return { payload: productDocument, ...rest };
    }

    async findById(id){
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
    }

    async updateById(id, data){
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
    }

    async removeById(id){
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
  
    }


};

export default ProductDao;