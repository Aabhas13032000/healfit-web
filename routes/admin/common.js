const express = require('express');
const router = express.Router();

//Middlewares
const commonMiddlewares = require('../../services/common');

//File upload multer
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
  destination: (req,file,callback) => {
    callback(null,'public/images/uploads');
  },
  filename : (req,file,callback) => {
    callback(null,Date.now() + '--' + file.originalname)
  }
});

const upload = multer({
  storage : fileStorageEngine,
  // limits: {fileSize: maxSize}
});

/* Image upload functions */

// Upload CKeditor Images
router.post('/upload',upload.single('upload'),commonMiddlewares.uploadEditorImage);
//Save multiple images
router.post('/saveBookImages',upload.array('book_images'),commonMiddlewares.uploadMultipleImages);
//Upload Single Images
router.post('/uploadSingleImage',upload.single('slider_image'),commonMiddlewares.uploadSingleImage);
//Delete photo
router.post('/deletePhoto',commonMiddlewares.deleteImage);
//Delete edit images
router.post('/deleteEditPhoto',commonMiddlewares.deleteEditImage);
//Save Edit images
router.post('/saveEditImages/:id/:value',upload.array('book_images'),commonMiddlewares.saveEditImages);
//Save PDF
router.post('/savePdf',upload.array('pdf'),commonMiddlewares.savePdf);
//Save Edited pdf
router.post('/saveEditPdf/:id/:value',upload.array('pdf'),commonMiddlewares.saveEditPdf);
//Delete Pdf
router.post('/deletePDF',commonMiddlewares.deletePdf);

module.exports = router;