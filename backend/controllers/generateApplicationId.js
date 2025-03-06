const NOC = require('../models/noc.model');
const generateApplicationId = async () => {
    const currentYear = new Date().getFullYear(); // Get current year (e.g., 2024)
    const lastApplication = await NOC.findOne().sort({ createdAt: -1 }); // Find the last application
  
    let sequenceNumber = 1; // Default sequence number
  
    if (lastApplication && lastApplication.applicationId) {
      const lastId = lastApplication.applicationId;
  
      // Extract the year and sequence number from the last application ID
      const lastIdParts = lastId.split('-'); // Split into ["NOC", "YYYYXXX"]
      if (lastIdParts.length === 2) {
        const lastYear = parseInt(lastIdParts[1].slice(0, 4)); // Extract the year (first 4 digits)
        const lastSequence = parseInt(lastIdParts[1].slice(4)); // Extract the sequence number (last 3 digits)
  
        if (lastYear === currentYear) {
          // If the last application ID is from the same year, increment the sequence number
          sequenceNumber = lastSequence + 1;
        } else {
          // If the last application ID is from a previous year, reset the sequence number to 1
          sequenceNumber = 1;
        }
      }
    }
  
    // Pad the sequence number with leading zeros (e.g., 1 -> "001", 12 -> "012")
    const paddedSequence = sequenceNumber.toString().padStart(3, '0');
  
    // Return the application ID in the format NOC-YYYYXXX
    return `NOC-${currentYear}${paddedSequence}`;
  };
  module.exports = generateApplicationId