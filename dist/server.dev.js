"use strict";

var express = require("express");

var app = express();

var moment = require("moment");

var _require = require("resend"),
    Resend = _require.Resend;

app.set("view engine", "pug");
var user = {
  name: "john Doe",
  date: moment().format('MMMM Do yyyy, h:mm:ss a'),
  order: 1587648,
  img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80",
  description: "Size: 32X30 Athletic",
  price: 250,
  time: 8
};
app.get("/order", function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            res.render('./order', {
              title: 'Thank you',
              header: user.name,
              // header: `Thank you for your order, ${user.name}`,
              date: user.date,
              orderNo: user.order,
              img: user.img,
              perday: user.price,
              time: user.time // total: `฿ ${user.price*user.time}`,
              // disposit: `฿ ${user.price*user.time*0.3}`,
              // totalPrice:`฿ ${user.price*user.time*1.3}`

            }, function _callee(err, html) {
              var resend, data;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!err) {
                        _context.next = 2;
                        break;
                      }

                      return _context.abrupt("return", next(err));

                    case 2:
                      resend = new Resend("re_gewDnB4G_GiZB7QiuDx6nquiXV81WtERW");
                      _context.next = 5;
                      return regeneratorRuntime.awrap(resend.emails.send({
                        "to": ["supawit.chukiat@gmail.com"],
                        "from": "onboarding@resend.dev",
                        "html": html,
                        "text": "This is TEXT",
                        "subject": "THIS IS SUBJECT"
                      }));

                    case 5:
                      data = _context.sent;
                      res.status(200).json({
                        message: "done"
                      });

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          } catch (error) {
            console.log(error);
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(8000, function () {
  return console.log("run");
});