import { createContainer,asClass,Lifetime } from "awilix";
import UserMongooseRepository from "./data/repositories/Mongoose/userMongooseRepository.js";
import ProductMongooseRepository from "./data/repositories/Mongoose/productMongooseRepository.js";
import CartMongooseRepository from "./data/repositories/Mongoose/cartMongooseRepository.js";
import RoleMongooseRepository from "./data/repositories/Mongoose/roleMongooseRepository.js";
import TicketMongooseRepository from "./data/repositories/Mongoose/ticketMongooseRepository.js";


const container = createContainer();

container.register('UserRepository', asClass(UserMongooseRepository), {Lifetime: Lifetime.SINGLETON});
container.register('ProductRepository', asClass(ProductMongooseRepository), {Lifetime: Lifetime.SINGLETON});
container.register('CartRepository', asClass(CartMongooseRepository), {Lifetime: Lifetime.SINGLETON});
container.register('RoleRepository', asClass(RoleMongooseRepository), {Lifetime: Lifetime.SINGLETON});
container.register('TicketRepository', asClass(TicketMongooseRepository), {Lifetime: Lifetime.SINGLETON});


export default container;