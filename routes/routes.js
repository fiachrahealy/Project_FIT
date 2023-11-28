var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads');
  }
});

const upload = multer({ storage: storage });

// Controllers

const securityController = require('../controllers/security.controller');
const searchController = require('../controllers/search.controller');
const imageController = require('../controllers/image.controller');

// Tesco

router.get('/getTescoItems/:query', securityController.checkValidUser, searchController.getTescoItems);
router.get('/getTescoItemInfo/:productRef', securityController.checkValidUser, searchController.getTescoItemInfo);

// Dunnes

router.get('/getDunnesItems/:query', securityController.checkValidUser, searchController.getDunnesItems);
router.get('/getDunnesItemInfo/:productRef', securityController.checkValidUser, searchController.getDunnesItemInfo);

// Aldi

router.get('/getAldiItems/:query', securityController.checkValidUser, searchController.getAldiItems);
router.get('/getAldiItemInfo/:productRef', securityController.checkValidUser, searchController.getAldiItemsInfo);

// Upload Image

router.post('/uploadImage', upload.single('image'), securityController.checkValidUser, imageController.uploadImage);

// 404

router.get('**', function (req, res) {
  res.sendStatus(404);
});

module.exports = router;