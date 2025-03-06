const express = require('express');
const router = express.Router();
const nocController = require('../controllers/noc.controller');
const upload = require('../middleware/multer');

router.post('/apply', 
  upload.fields([
    { name: 'aadhaarCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'fireSafetyCert', maxCount: 1 }
  ]),
  nocController.applyNOC
);
router.get('/all', nocController.getAllNOCApplications);
router.get('/:id', nocController.getNOCApplication);
router.put('/:id/status', nocController.updateNOCStatus);

module.exports = router;
