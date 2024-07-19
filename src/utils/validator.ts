import * as Yup from "yup";

const objectIdValidation = Yup.string().matches(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

const productValidation = Yup.object().shape({
  name: Yup.string().required(),
  category: Yup.string().required(),
  service: Yup.string().required(),
  total: Yup.number().required(),
  price: Yup.number().required(),
  status: Yup.string().oneOf(["available", "not available"]).default("available"),
});

const orderValidation = Yup.object().shape({
  transactionId: objectIdValidation.nullable(),
  vipaymentId: Yup.string().nullable(),
  gameId: Yup.string().required(),
  product: objectIdValidation.required(),
  status: Yup.string().oneOf(["pending", "completed", "cancelled"]).default("pending"),
});

const transactionValidation = Yup.object({
  orderId: Yup.string().required(),
  status: Yup.string().required(),
  amount: Yup.number().required().positive(),
  paymentMethod: Yup.string().required(),
  paymentChannel: Yup.string().required(),
  paymentTime: Yup.date().nullable().default(null).transform((value, originalValue) => originalValue === '' ? null : value),
});

export {
  productValidation,
  orderValidation,
  transactionValidation,
}