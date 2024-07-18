import { Request, Response } from "express";

import { orderValidation } from "@/utils/validator";
import paymentController from "./payment.controller";
import Order from "@/models/orders.model";

export default {
  async create(req: Request, res: Response) {
    // const { service, total, price } = req.body;

    try {
      await orderValidation.validate(req.body);
      const order = await Order.create(req.body);

      const paymentUrl = await paymentController.create(order._id.toString())
      
      res.status(201).json({
        message: "Success create order",
        paymentUrl: paymentUrl,
        data: order,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Create order failed",
        detail: err.message,
      });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const orders = await Order.find({}).populate("product");

      res.status(200).json({
        message: "Get all order success",
        data: orders,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Get all order failed",
        error: err.message,
      });
    }
  },
  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          message: "Get order by id failed",
          error: `Order with id ${id} not found`,
        });
      }

      res.status(200).json({
        message: "Get order by id success",
        data: order,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Get order by id failed",
        error: err.message,
      });
    }
  },
}