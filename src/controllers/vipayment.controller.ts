import { Request, Response } from "express";
import axios from "axios";

import { TopUpResponseInterface } from "@/utils/interface";
import { VIPAYMENT_KEY, VIPAYMENT_SIGN  } from "@/utils/env";

export default {
  async checkNickname(req: Request, res: Response) {
    const { userId, zoneId } = req.body;
    const vipaymenUrl = "https://vip-reseller.co.id/api/game-feature";

    const payload = new URLSearchParams();
    payload.append("key", VIPAYMENT_KEY);
    payload.append("sign", VIPAYMENT_SIGN);
    payload.append("type", "get-nickname");
    payload.append("code", "mobile-legends");
    payload.append("target", userId);
    payload.append("additional_target", zoneId);

    try {
      console.log("Checking nickname");
      const response = await axios.post(vipaymenUrl, payload.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Checking nickname done");

      res.status(200).json({
        message: "Check nickname success",
        data: response.data,
      });
    } catch (error) {
      const err = error as Error;

      res.status(500).json({
        message: "Check nickname failed",
        error: err.message,
      });
    }
  },
  async topup(service: string, data_no: string): Promise<TopUpResponseInterface> {
    const vipaymenUrl = "https://vip-reseller.co.id/api/game-feature";
    
    const payload = new URLSearchParams();
    payload.append("key", VIPAYMENT_KEY);
    payload.append("sign", VIPAYMENT_SIGN);
    payload.append("type", "order");
    payload.append("service", service);
    payload.append("data_no", data_no);
  
    try {
      console.log("Top up start");
      const response = await axios.post(vipaymenUrl, payload.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log("Top up success");
      console.log("response :", response.data);
  
      return response.data;
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  }
}