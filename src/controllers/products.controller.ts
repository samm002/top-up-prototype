import { Request, Response } from "express";
import { productValidation } from "@/utils/validator";

import Product from "@/models/products.model";

export default {
  async create(req: Request, res: Response) {
    // const { category, service, total, price } = req.body;

    try {
      await productValidation.validate(req.body);
      const product = await Product.create(req.body);
      
      res.status(201).json({
        message: "Success create product",
        data: product,
      });
    } catch (error) {      
      const err = error as Error;

      res.status(500).json({
        message: "Create product failed",
        error: err.message,
      });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const products = await Product.find({});

      res.status(200).json({
        message: "Get all product success",
        data: products,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Get all product failed",
        error: err.message,
      });
    }
  },
  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({
          message: "Get product by id failed",
          error: `Product with id ${id} not found`,
        });
      }

      res.status(200).json({
        message: "Get product by id success",
        data: product,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Get product by id failed",
        error: err.message,
      });
    }
  },
}