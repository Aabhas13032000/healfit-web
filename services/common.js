const pool = require('../database/connection');

//File upload multer
const sharp = require("sharp");
const fs =  require('fs');
const path = require('path');

const imageUploadPath = 'public/images/uploads';
const userUploadPath = 'public/images/user';

module.exports ={
    //Get admin profile
    uploadEditorImage: async (req,res,next) => {
        var html = '';
        var compressedimage = path.join(__dirname,'../',imageUploadPath,new Date().getTime() + ".webp");
        await sharp(req.file.path).webp({
            quality: 50
        }).resize({
            width: 600
            }).toFile(compressedimage,(err,info) => {
            if(err){
              console.log(err);
            }
            fs.unlink(req.file.path,(err) => {
                if(err) {
                  console.log(err);
                } else {
                html = "";
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     = \"/images/uploads/" + compressedimage.split('/')[compressedimage.split('/').length - 1] + "\";";
                html += "    var message = \"Uploaded file successfully\";";
                html += "";
                html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                html += "</script>";

                res.send(html);
                }
            });
        });
    },
    uploadMultipleImages : async (req,res,next) =>{
        var array_of_names = [];
        var counter = 0;
        for (let i=0; i<req.files.length; i++) {
          task(i,req.files[i]);
       }
         
       function task(i,file) {
         setTimeout(function() {
              var compressedimage = path.join(__dirname,'../',imageUploadPath,new Date().getTime() + ".webp");
              var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
              sharp(file.path).webp({
                quality: 50
              }).resize({
                  width: 600
                }).toFile(compressedimage,(err,info) => {
                if(err){
                  console.log(err);
                }
                fs.unlink(file.path,(err) => {
                  if(err) {
                    console.log(err);
                  } else {
                    array_of_names.push(name);
                    counter++;
                    // console.log(counter);
                    check_counter(counter);
                  }
                });
              });
         }, 2000 * i);
       }
        function check_counter(counter1){
          if(counter1 == req.files.length){
            res.json({files: array_of_names});
          }
        }
      },
      uploadSingleImage: async (req,res,next) => {
        var compressedimage = path.join(__dirname,'../',imageUploadPath,new Date().getTime() + ".webp");
        var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
        await sharp(req.file.path).webp({
          quality: 50
        }).resize({
            width: 600
          }).toFile(compressedimage,(err,info) => {
            if(err){
              console.log(err);
            }
            fs.unlink(req.file.path,(err) => {
              if(err) {
                console.log(err);
              } else {
                res.json({path: name});
              }
            });
          });
      },
      deleteImage: (req,res,next) =>{
        var path = `public${req.body.path}`;
        fs.unlink(path,(err) => {
          if(err) {
            console.log(err);
          } else {
            res.json({message: 'success'});
          }
        });
      },
      deleteEditImage :(req,res,next) => {
        var path = `public${req.body.path}`;
        const query2  = "DELETE FROM `images` WHERE `path` = '"+ req.body.path +"'";
        pool.query(query2,function(err,results,fields){
          if(err) {
            console.log(err);
          } else {
            fs.unlink(path,(err) => {
              if(err) {
                console.log(err);
              } else {
                res.json({message: 'success'});
              }
            });
          }
        }); 
      },
      saveEditImages : async (req,res,next) => {
        var array_of_names = [];
        var counter = 0;
        for (let i=0; i<req.files.length; i++) {
          task(i,req.files[i]);
       }
         
       function task(i,file) {
         setTimeout(function() {
              var compressedimage = path.join(__dirname,'../',imageUploadPath,new Date().getTime() + ".webp");
              var name = 'public/images/uploads/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
              sharp(file.path).webp({
                quality: 50
              }).resize({
                  width: 600
                }).toFile(compressedimage,(err,info) => {
                if(err){
                  console.log(err);
                }
                fs.unlink(file.path,(err) => {
                  if(err) {
                    console.log(err);
                  } else {
                    array_of_names.push(name);
                    var query  = "INSERT INTO `images` (`path`,`iv_category`,`item_category`,`item_id`) VALUES ('"+ name.slice(6,name.length) +"','image','"+ req.params.value +"','"+ req.params.id +"')";
                    pool.query(query,function(err,results,fields){
                        if(err) {
                          console.log(err);
                        } else {
                            counter++;
                            // console.log(counter);
                            check_counter(counter);
                        }
                    });
                  }
                });
              });
         }, 2000 * i);
       }
        function check_counter(counter1){
          if(counter1 == req.files.length){
            res.json({files: array_of_names});
          }
        }
      },
      savePdf : async (req,res,next) =>{
        res.json({files: req.files}); 
      },
      saveEditPdf: async (req,res,next) => {
        for(var i=0;i<req.files.length;i++) {
          var path = req.files[i].path.slice(6,req.files[i].path.length);
          if(req.params.value == 'books') {
            var query = "UPDATE `books` SET `pdf` = '"+ path +"' WHERE `id` = '"+ req.params.id +"'"
          } else if(req.params.value == 'subscription-pdf') {
            var query = "UPDATE `subscription` SET `pdf_path` = '"+ path +"' WHERE `id` = '"+ req.params.id +"'"
          }
          pool.query(query,function(err,results,fields){
              if(err) {
                console.log(err);
                  // break;
              } else {
              }
          });
        }
        res.json({files: req.files}); 
      },
      deletePdf: async (req,res,next) => {
        var path = `public${req.body.path}`;
        fs.unlink(path,(err) => {
          if(err) {
            console.log(err);
          } else {
            res.json({message: 'success'});
          }
        });
      },
      saveUserImage : async (req,res,next) => {
        var compressedimage = path.join(__dirname,'../',userUploadPath,new Date().getTime() + ".webp");
        var name = 'public/images/user/'+ compressedimage.split('/')[compressedimage.split('/').length - 1];
        await sharp(req.file.path).webp({
          quality: 50
          // lossless: true
        }).resize({
            width: 600
          }).toFile(compressedimage,(err,info) => {
            if(err){
              console.log(err);
            }
            // console.log(info);
            fs.unlink(req.file.path,(err) => {
              if(err) {
                console.log(err);
              } else {
                // res.json({message: 'success'});
                console.log(name);
                res.json({path: name.slice(6,name.length)});
              }
            });
          });
      }
}