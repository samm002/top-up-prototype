import { Request, Response } from "express";
import { Invoice as InvoiceClient } from 'xendit-node';
import mongoose from "mongoose";

import { XENDIT_API_KEY } from "@/utils/env";
import { transactionValidation } from "@/utils/validator";
import vipaymentController from "./vipayment.controller";
import Product from "@/models/products.model";
import Order from "@/models/orders.model";
import Transaction from "@/models/transactions.model";

const xenditInvoiceClient = new InvoiceClient({ secretKey: XENDIT_API_KEY });

export default {
  async create(id: string) {
    try {
      const order = await Order.findById(id).populate("product");

      if (!order) {
        throw new Error(`Order with id ${id} not found`);
      }

      if (!order.product || !(order.product instanceof Product)) {
        throw new Error(`Product details not found for order with id ${id}`);
      }
      
      const amount = order.product.price;

      const paymentData = {
        "amount" : amount,
        "invoiceDuration" : "172800",
        "externalId" : String(order._id),
        "description" : `Invoice of ${order._id}`,
        "currency" : "IDR",
        "reminderTime" : 1
      };

      const response = await xenditInvoiceClient.createInvoice({
        data: paymentData
      });

      const paymentUrl = response.invoiceUrl;
      
      return paymentUrl;

    } catch (error) {      
      const err = error as Error;

      throw new Error(err.message);
    }
  },
  async callback(req: Request, res: Response) {
    const { status , external_id, payment_method, payment_channel, paid_at, amount, id } = req.body;
    const transactionId = new mongoose.Types.ObjectId(id);

    try {
      if (status == "PAID") {
        const validatedTransaction = await transactionValidation.validate({
          _id: transactionId, 
          orderId: external_id,
          status: status.toLowerCase(),
          amount: amount,
          paymentMethod: payment_method.toLowerCase(),
          paymentChannel: payment_channel.toLowerCase(),
          paymentTime: paid_at,
        });
  
        const transaction = await Transaction.create(validatedTransaction);
        
        if (!transaction) {
          return res.status(400).json({
            message: "Order payment failed",
            error: "failed to create transaction",
          });
        }

        const order = await Order.findByIdAndUpdate(
          { _id: external_id }, 
          { status: "completed" },
          { new: true },
        ).populate("product");
        
        if (!order) {
          return res.status(404).json({
            message: "Order payment failed",
            error: `Order with id ${id} not found`,
          });
        }

        if (!order.product || !(order.product instanceof Product)) {
          throw new Error(`Product details not found for order with id ${id}`);
        }
        
        const service = order.product.service;

        const topUpDetails = await vipaymentController.topup(service, order.gameId);
        
        const trxid = topUpDetails.data.trxid;
        
        order.vipaymentId = trxid;
        await order.save();

        console.log("Order payment success, order updated!", trxid);
        
        res.status(201).json({
          message: "Order payment success",
          trxid: trxid,
          topUpDetails: topUpDetails,
          order: order,
          transaction: transaction,
        });
      } else {
        console.log("Order payment success");
      }
    } catch (error) {      
      const err = error as Error;

      console.error(err);
      res.status(500).json({
        message: "Order payment failed",
        detail: err.message,
      });
    }
  }
}