const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");

const partnerRouter = express.Router();
partnerRouter.use(bodyParser.json());
partnerRouter
  .route("/")
  .get((req, res) => {
    res.end("Will send all the partners to you");
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end(
      `Will add the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.end("Deleting all partners");
    }
  );

partnerRouter
  .route("/:partnerId")
  // .all((req, res, next) => {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/plain");
  //   next();
  // })
  .get((req, res) => {
    res.end(`Will send details of the partner: ${req.params.partnerId} to you`);
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.write(`Updating the partner: ${req.params.partnerId}\n`);
    res.end(`Will update the partner: ${req.body.name}
          with description: ${req.body.description}`);
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.end(`Deleting partner: ${req.params.partnerId}`);
    }
  );

module.exports = partnerRouter;
