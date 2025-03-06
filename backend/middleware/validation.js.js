const { body, validationResult } = require("express-validator");

const validateNOCApplication = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("mobile").notEmpty().withMessage("Mobile number is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("address").notEmpty().withMessage("Address is required"),
  body("buildingType").notEmpty().withMessage("Building type is required"),
  body("propertySize").notEmpty().withMessage("Property size is required"),
  body("hasFireSafety").isBoolean().withMessage("Invalid fire safety value"),
  body("declaration").isBoolean().withMessage("Declaration must be accepted"),
];

const validateUserRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("mobile").notEmpty().withMessage("Mobile number is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateNOCApplication, validateUserRegistration, validate };