const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/Order");
const mongoose = require("mongoose");
const moment = require("moment");
const nodemailer = require("nodemailer");

/// GET  Orders///

orderRouter.get("/get", (req, res, next) => {
  Order.find()
    .select(
      "customerID customerName _id customerEmail address city postalCode orderItems totalAmount publishDate orderStatus paymentMethod"
    )
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        orders: docs.map((doc) => {
          console.log(doc);
          return {
            cutomerId: doc.customerID,
            customerName: doc.customerName,
            customerEmail: doc.customerEmail,
            address: doc.address,
            city: doc.city,
            postalCode: doc.postalCode,
            orderItems: doc.orderItems,
            totalAmount: doc.totalAmount,
            publishDate: doc.publishDate,
            orderStatus: doc.orderStatus,
            paymentMethod: doc.paymentMethod,
            _id: doc._id,
          };
        }),
      };

      res.status(200).json(response);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
/// Get Orders By Id
orderRouter.get("/get/:id", (req, res, next) => {
  const customerID = req.params.id;
  const order = Order.find({ customerID })

    .then((result) => {
      res.status(200).json({
        order: result,
      });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/// Post Order ///
orderRouter.post("/post", (req, res, next) => {
  console.log(req.body);
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    customerID: req.body.customerID,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
    orderItems: req.body.orderItems,
    totalAmount: req.body.totalAmount,
    publishDate: moment().toJSON(),
    orderStatus: req.body.orderStatus,
    paymentMethod: req.body.paymentMethod,
  });

  order

    .save()
    .then((result) => {
      var transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "axianshaikhy@gmail.com",
          pass: "SP17-BSE-018",
        },
      });
      var mailOptions = {
        from: "info@PharmaDoc.com",
        to: order.customerEmail,

        subject: "Order confirmation from PharmaDoc",
        html: `
        <p>Your order of --- having total amount ${order.totalAmount} from PharmaDoc by ${order.paymentMethod} is confirmed.
        You will receive your order in 2,3 days from ${order.publishDate}.</p>
                  `,
      };
      transpoter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(error);
        }
      });
      console.log(order);
      res.status(201).json({
        message: "Created  Order successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

/// Update Order///

orderRouter.patch("/update/:id", async (req, res, next) => {
  const id = req.params.id;
  await Order.findByIdAndUpdate({ _id: id }, req.body).then(function (data) {
    if (!Order) {
      console.log("Invalid Id");
    } else {
      Order.findOne({ _id: id }).then(function (data) {
        res.send(data);
      });
    }
  });
});

/// Delete Order ///
orderRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Order.findByIdAndRemove(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

orderRouter.get("/getfiltered", async (req, res, next) => {
  const { userID } = req.query;
  console.log(userID);

  Order.find(userID)
    .select(
      "customerID customerName _id customerEmail address city postalCode orderItems totalAmount publishDate orderStatus paymentMethod"
    )
    .exec()
    .then((orders) => {
      console.log(".THEN order", orders);
      const response = {
        count: orders.length,
        order: orders.map((order) => {
          console.log("order", order);
          return {
            customerID: order.customerID,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            address: order.address,
            city: order.city,
            postalCode: order.postalCode,
            orderItems: order.orderItems,
            totalAmount: order.totalAmount,
            publishDate: moment().toJSON(),
            orderStatus: order.orderStatus,
            paymentMethod: order.paymentMethod,
          };
        }),
      };
      res.status(200).json(response);
      console.log("response", response);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = orderRouter;
