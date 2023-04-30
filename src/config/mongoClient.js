import mongoose from "mongoose";

class DataBase{
    static connect = async ()=>{
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB');
         } catch (error) {
             console.error('Error al conectar a MongoDB:', error.message);
         };
    }
}
export default DataBase;