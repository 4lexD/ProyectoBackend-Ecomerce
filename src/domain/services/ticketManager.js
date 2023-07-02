import container from "../../container.js";


class ticketManager{
    constructor(){
        this.ticket = container.resolve('TicketRepository');
    }

    async create(data){
        return this.ticket.create(data);
    }

    async getOne(id){
        return this.ticket.getOne(id);
    }
}

export default ticketManager;