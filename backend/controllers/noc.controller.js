const NOC = require('../models/noc.model');
const generateApplicationId = require("../controllers/generateApplicationId")
// Apply for NOC
exports.applyNOC = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      address,
      buildingType,
      propertySize,
      hasFireSafety,
      extinguishers,
      smokeDetectors,
      waterSprinklers,
      declaration,
    } = req.body;

    // File paths from multer
    const aadhaarCard = req.files['aadhaarCard'] ? req.files['aadhaarCard'][0].path : null;
    const panCard = req.files['panCard'] ? req.files['panCard'][0].path : null;
    const fireSafetyCert = req.files['fireSafetyCert'] ? req.files['fireSafetyCert'][0].path : null;

    // Generate application ID
    const applicationId = await generateApplicationId();

    // Create a new NOC application
    const nocApplication = await NOC.create({
      fullName,
      mobile,
      email,
      address,
      buildingType,
      propertySize,
      hasFireSafety,
      extinguishers,
      smokeDetectors,
      waterSprinklers,
      aadhaarCard,
      panCard,
      fireSafetyCert,
      declaration,
      applicationId, // Store the generated application ID
    });

    // Return the application ID in the response
    res.status(201).json({ 
      message: 'NOC application submitted successfully',
      applicationId: nocApplication.applicationId,
      data: nocApplication,
    });
  } catch (error) {
    console.error('Error creating NOC application:', error);
    res.status(500).json({ message: 'Failed to create NOC application' });
  }
};

// Get all NOC applications (Admin)
exports.getAllNOCApplications = async (req, res) => {
  try {
    const nocApplications = await NOC.find();
    res.status(200).json(nocApplications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
};

// Get a specific NOC application
exports.getNOCApplication = async (req, res) => {
  try {
    const noc = await NOC.findById(req.params.id);
    if (!noc) return res.status(404).json({ message: 'NOC Application not found' });
    res.status(200).json(noc);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
};

// Update NOC status (Admin)
exports.updateNOCStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedNOC = await NOC.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedNOC) return res.status(404).json({ message: 'NOC Application not found' });
await sendEmail(
  updatedNOC.email,
  "NOC Application Status Updated",
  `Your NOC application (ID: ${updatedNOC.applicationId}) status has been updated to ${status}.`
);
    res.status(200).json({ message: 'NOC status updated', data: updatedNOC });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};




// const NOC = require("../models/noc.model");
// const generateApplicationId = require("../utils/generateApplicationId");
// const sendEmail = require("../utils/sendEmail.js");

// // Apply for NOC
// exports.applyNOC = async (req, res, next) => {
//   try {
//     const {
//       fullName,
//       mobile,
//       email,
//       address,
//       buildingType,
//       propertySize,
//       hasFireSafety,
//       extinguishers,
//       smokeDetectors,
//       waterSprinklers,
//       declaration,
//     } = req.body;

//     const aadhaarCard = req.files["aadhaarCard"] ? req.files["aadhaarCard"][0].path : null;
//     const panCard = req.files["panCard"] ? req.files["panCard"][0].path : null;
//     const fireSafetyCert = req.files["fireSafetyCert"] ? req.files["fireSafetyCert"][0].path : null;

//     const applicationId = await generateApplicationId();

//     const nocApplication = await NOC.create({
//       fullName,
//       mobile,
//       email,
//       address,
//       buildingType,
//       propertySize,
//       hasFireSafety,
//       extinguishers,
//       smokeDetectors,
//       waterSprinklers,
//       aadhaarCard,
//       panCard,
//       fireSafetyCert,
//       declaration,
//       applicationId,
//     });

//     // Send confirmation email
//     await sendEmail(
//       email,
//       "NOC Application Submitted",
//       `Your NOC application (ID: ${applicationId}) has been submitted successfully.`
//     );

//     res.status(201).json({
//       message: "NOC application submitted successfully",
//       applicationId: nocApplication.applicationId,
//       data: nocApplication,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all NOC applications (Admin)
// exports.getAllNOCApplications = async (req, res, next) => {
//   try {
//     const nocApplications = await NOC.find();
//     res.status(200).json(nocApplications);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get a specific NOC application
// exports.getNOCApplication = async (req, res, next) => {
//   try {
//     const noc = await NOC.findById(req.params.id);
//     if (!noc) return res.status(404).json({ message: "NOC Application not found" });
//     res.status(200).json(noc);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update NOC status (Admin)
// exports.updateNOCStatus = async (req, res, next) => {
//   try {
//     const { status } = req.body;
//     const updatedNOC = await NOC.findByIdAndUpdate(req.params.id, { status }, { new: true });
//     if (!updatedNOC) return res.status(404).json({ message: "NOC Application not found" });

//     // Send status update email
//     await sendEmail(
//       updatedNOC.email,
//       "NOC Application Status Updated",
//       `Your NOC application (ID: ${updatedNOC.applicationId}) status has been updated to ${status}.`
//     );

//     res.status(200).json({ message: "NOC status updated", data: updatedNOC });
//   } catch (error) {
//     next(error);
//   }
// };