import { ticketModel } from "../../models/ticketModel.js";
import { nanoid } from "nanoid";
import Ticket from "../../../domain/entities/ticket.js"

class TicketMongooseRepository{
    async create(ticket){
        const ticketDocument = await ticketModel.create({
            code:nanoid(24),
            purchase_datetime: Date.now(),
            ...ticket
        })

        return new Ticket({
            id: ticketDocument?._id,
            code: ticketDocument?.code,
            purcharse_datatime: ticketDocument?.purcharse_datatime,
            amount: ticketDocument?.amount
        })
    }

    async getOne(id){
        const ticketDocument = await ticketModel.findById(id);
        return new Ticket({
            id: ticketDocument?._id,
            code: ticketDocument?.code,
            purcharse_datatime: ticketDocument?.purcharse_datatime,
            amount: ticketDocument?.amount
        })
    }

}

export default TicketMongooseRepository;