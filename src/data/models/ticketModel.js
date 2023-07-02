import { Schema, model } from "mongoose";



const TicketCollection = 'tickets'

const TicketSchema = Schema({
    code:{
      type: Schema.Types.String,
      required: true,
      unique: true
    },

    purchase_datetime: {
      type: Schema.Types.Date,
      required: true,
      default: Date.now
    },
    amount: {
      type: String,
      required: true
    },

    purchaser: {
      type: String,
      required: true
    }
});


export const ticketModel = model(TicketCollection,TicketSchema);