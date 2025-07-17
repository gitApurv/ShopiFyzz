const Order = require("../models/Order");
const User = require("../models/User");
const PDFDocument = require("pdfkit");

exports.getOrders = async (req, res, next) => {
  const userId = req.user.id;
  const orders = await Order.find({ user: userId });
  res.status(200).json(orders);
};

exports.getOrderDetails = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.findById(orderId);
  res.status(200).json(order);
};

exports.createOrder = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate("cart.product");
  const cart = user.cart;
  let totalPrice = 0;
  cart.forEach((cp) => {
    totalPrice += cp.product.price * cp.quantity;
  });
  const products = cart.map((product) => {
    return { quantity: product.quantity, product: { ...product.product._doc } };
  });
  const orderDetails = {
    totalPrice: totalPrice,
    products: products,
    user: userId,
  };
  const updatedCart = [];
  await User.findByIdAndUpdate(userId, {
    $set: { cart: updatedCart },
  });
  Order.create(orderDetails);
  res.status(200).json({
    ok: true,
    message: "Order Placed",
  });
};

exports.downloadReceipt = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.findById(orderId);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=order-${orderId}.pdf`
  );
  const pdfDoc = new PDFDocument();
  pdfDoc.pipe(res);

  pdfDoc
    .fontSize(24)
    .font("Helvetica-Bold")
    .text("Order Receipt", { align: "center" });
  pdfDoc.moveDown(1.5);

  pdfDoc.fontSize(12).font("Helvetica");
  pdfDoc
    .text(`Order ID: `, { continued: true })
    .font("Helvetica-Bold")
    .text(order._id);

  pdfDoc
    .font("Helvetica")
    .text(`User ID: `, { continued: true })
    .font("Helvetica-Bold")
    .text(order.user);

  pdfDoc
    .font("Helvetica")
    .text(`Order Date: `, { continued: true })
    .font("Helvetica-Bold")
    .text(new Date(order.createdAt).toLocaleString());

  pdfDoc
    .font("Helvetica")
    .text(`Total Amount: `, { continued: true })
    .font("Helvetica-Bold")
    .text(`RS. ${order.totalPrice.toFixed(2)}`);

  pdfDoc.moveDown();

  pdfDoc
    .moveTo(pdfDoc.page.margins.left, pdfDoc.y)
    .lineTo(pdfDoc.page.width - pdfDoc.page.margins.right, pdfDoc.y)
    .stroke();
  pdfDoc.moveDown(1);

  const headerY = pdfDoc.y;
  pdfDoc.font("Helvetica-Bold").fontSize(12);
  pdfDoc.text("S.No", 50, headerY, { width: 30 });
  pdfDoc.text("Product", 90, headerY, { width: 180 });
  pdfDoc.text("Qty", 280, headerY, { width: 40 });
  pdfDoc.text("Price", 330, headerY, { width: 70 });
  pdfDoc.text("Subtotal", 410, headerY, { width: 90 });
  pdfDoc.moveDown(0.5);

  pdfDoc.font("Helvetica").fontSize(12);

  order.products.forEach((item, index) => {
    const productName = item.product?.title;
    const price = item.product?.price;
    const qty = item.quantity;
    const subtotal = price * qty;
    const y = pdfDoc.y;
    pdfDoc.text(`${index + 1}`, 50, y, { width: 30 });
    pdfDoc.text(productName, 90, y, {
      width: 180,
      align: "left",
    });
    pdfDoc.text(`${qty}`, 280, y, { width: 40 });
    pdfDoc.text(`Rs. ${price}`, 330, y, { width: 70 });
    pdfDoc.text(`Rs. ${subtotal}`, 410, y, { width: 90 });
    pdfDoc.moveDown(1);
  });

  pdfDoc.moveDown(2);
  pdfDoc
    .font("Helvetica-Oblique")
    .fontSize(12)
    .fillColor("gray")
    .text("Thank you for your purchase!", pdfDoc.page.margins.left, pdfDoc.y, {
      align: "center",
    });

  pdfDoc.end();
};
