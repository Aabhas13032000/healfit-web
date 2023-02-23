const pool = require('../../database/connection');

module.exports = {
  getProductsInitialData: (req,res,next) => {
      var clothCategories = "SELECT * FROM `cloth_category` WHERE `status` = 1";
      var productCategories = "SELECT * FROM `product_categories` WHERE `status` = 1 AND `imp` = 1";
      var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `imp` = 1 ORDER BY `id`";
      pool.query(clothCategories,function(err,clothCategories){
        pool.query(productCategories,function(err,productCategories){
          pool.query(impProducts,function(err,impProducts){
            if(err) {
              console.log(err);
                res.json({
                    message:'Database_connection_error',
                    clothCategories: [],
                    impProducts:[],
                    productCategories:[],
                });
            } else {
                res.json({
                  message:'success',
                  clothCategories:clothCategories,
                  impProducts:impProducts,
                  productCategories:productCategories,
                });
            }
          });
        });
      });
    },
    getProductsByGender: (req,res,next) => {
        var offset = req.query.offset;
        var clothCategory = "SELECT `cloth_category` FROM `products` WHERE `gender` LIKE '%"+ req.query.gender +"%' GROUP BY cloth_category";
        if(req.query.gender == 'All') {
          if(req.query.category){
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1 AND `cloth_category` = '"+ req.query.category +"'";
            var query = "SELECT * FROM `products` WHERE `status` = 1 AND `cloth_category` = '"+ req.query.category +"' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `cloth_category` = '"+ req.query.category +"' AND `imp` = 1 ORDER BY `id`";
          } else {
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1";
            var query = "SELECT * FROM `products` WHERE `status` = 1 ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `imp` = 1 ORDER BY `id`";
          }
        } else {
          if(req.query.category){
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%' AND `cloth_category` = '"+ req.query.category +"'";
            var query = "SELECT * FROM `products` WHERE `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%'  AND `cloth_category` = '"+ req.query.category +"' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%' AND `cloth_category` = '"+ req.query.category +"' AND `imp` = 1 ORDER BY `id`";
          } else {
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%'";
            var query = "SELECT * FROM `products` WHERE `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%' AND `imp` = 1 ORDER BY `id`";
          }
        }
        pool.query(query,function(err,query){
          pool.query(impProducts,function(err,impProducts){
            pool.query(totalProducts,function(err,totalProducts){
              pool.query(clothCategory,function(err,clothCategory){
                if(err) {
                    console.log(err);
                      res.json({
                          message:'Database_connection_error',
                          products: [],
                          clothCategory:[],
                          totalProducts:0,
                          impProducts:[],
                      });
                } else {
                    clothCategory.unshift({ cloth_category: 'ALL' });
                    res.json({
                      message:'success',
                      products:query,
                      clothCategory:clothCategory,
                      impProducts:impProducts,
                      totalProducts: totalProducts.length != 0 ? totalProducts[0].totalProducts : 0,
                    });
                }
              });
            });
          });
        });
    },
    getProductsByCategory: (req,res,next) => {
        var offset = req.query.offset;
        var clothCategory = "SELECT `cloth_category` FROM `products` WHERE `category` LIKE '%"+ req.query.category +"%' GROUP BY cloth_category";
        if(req.query.cloth_category == 'ALL') {
          if(req.query.category){
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1 AND `category` LIKE '%"+ req.query.category +"%'";
            var query = "SELECT * FROM `products` WHERE `status` = 1 AND `category` LIKE '%"+ req.query.category +"%' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `category` LIKE '%"+ req.query.category +"%' AND `imp` = 1 ORDER BY `id`";
          } else {
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1";
            var query = "SELECT * FROM `products` WHERE `status` = 1 ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `imp` = 1 ORDER BY `id`";
          }
        } else {
          if(req.query.category){
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1 AND `category` LIKE '%"+ req.query.category +"%' AND `cloth_category` = '"+ req.query.cloth_category +"'";
            var query = "SELECT * FROM `products` WHERE `status` = 1 AND `category` LIKE '%"+ req.query.category +"%'  AND `cloth_category` = '"+ req.query.cloth_category +"' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `category` LIKE '%"+ req.query.category +"%' AND `cloth_category` = '"+ req.query.cloth_category +"' AND `imp` = 1 ORDER BY `id`";
          } else {
            var totalProducts = "SELECT COUNT(*) AS totalProducts FROM `products` WHERE `status` = 1 AND `cloth_category` = '"+ req.query.cloth_category +"'";
            var query = "SELECT * FROM `products` WHERE `status` = 1 AND `cloth_category` = '"+ req.query.cloth_category +"' ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            var impProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `cloth_category` = '"+ req.query.cloth_category +"' AND `imp` = 1 ORDER BY `id`";
          }
        }
        pool.query(query,function(err,query){
          pool.query(impProducts,function(err,impProducts){
            pool.query(totalProducts,function(err,totalProducts){
              pool.query(clothCategory,function(err,clothCategory){
                if(err) {
                    console.log(err);
                      res.json({
                          message:'Database_connection_error',
                          products: [],
                          totalProducts:0,
                          impProducts:[],
                          clothCategory:[],
                      });
                } else {
                    clothCategory.unshift({ cloth_category: 'ALL' });
                    res.json({
                      message:'success',
                      products:query,
                      impProducts:impProducts,
                      clothCategory:clothCategory,
                      totalProducts: totalProducts.length != 0 ? totalProducts[0].totalProducts : 0,
                    });
                }
            });
          });
          });
        });
    },
    getSearchProductsByGender : (req,res,next) => {
        var queryData = req.query;
        if(req.query.gender == 'All') {
          if(req.query.category){
            var query = "SELECT * FROM `products` WHERE `name` LIKE '%"+ queryData.name +"%' AND `cloth_category` = '"+ req.query.category +"' AND `status` = 1 ORDER BY `id` DESC";
          } else {
            var query = "SELECT * FROM `products` WHERE `name` LIKE '%"+ queryData.name +"%' AND `status` = 1 ORDER BY `id` DESC";
          }
        } else {
          if(req.query.category){
            var query = "SELECT * FROM `products` WHERE  `name` LIKE '%"+ queryData.name +"%' AND `cloth_category` = '"+ req.query.category +"' AND `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%' ORDER BY `id` DESC";
          } else {
            var query = "SELECT * FROM `products` WHERE  `name` LIKE '%"+ queryData.name +"%' AND `status` = 1 AND `gender` LIKE '%"+ req.query.gender +"%' ORDER BY `id` DESC";
          }
        }
        pool.query(query,function(err,query){
            if(err) {
                console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      products: [],
                  });
            } else {
                res.json({
                  message:'success',
                  products:query,
                });
            }
        });
    },
    getSearchProductsByCategory : (req,res,next) => {
        var queryData = req.query;
        if(req.query.cloth_category == 'ALL') {
          if(req.query.category){
            var query = "SELECT * FROM `products` WHERE `name` LIKE '%"+ queryData.name +"%' AND `category` LIKE '%"+ req.query.category +"%' AND `status` = 1 ORDER BY `id` DESC";
          } else {
            var query = "SELECT * FROM `products` WHERE `name` LIKE '%"+ queryData.name +"%' AND `status` = 1 ORDER BY `id` DESC";
          }
        } else {
          if(req.query.category){
            var query = "SELECT * FROM `products` WHERE  `name` LIKE '%"+ queryData.name +"%' AND `category` LIKE '%"+ req.query.category +"%' AND `status` = 1 AND `cloth_category` = '"+ req.query.cloth_category +"' ORDER BY `id` DESC";
          } else {
            var query = "SELECT * FROM `products` WHERE  `name` LIKE '%"+ queryData.name +"%' AND `status` = 1 AND `cloth_category` = '"+ req.query.cloth_category +"' ORDER BY `id` DESC";
          }
        }
        pool.query(query,function(err,query){
            if(err) {
                console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      products: [],
                  });
            } else {
                res.json({
                  message:'success',
                  products:query,
                });
            }
        });
    },
    getEachProduct: (req,res,next) => {
      if(req.headers.token) {
        var query = "SELECT * FROM `products` WHERE `status` = 1 AND `id` = '"+ req.query.id +"'";
        var eachQuantity = "SELECT * FROM `product_size_quantity` WHERE `item_id` = '"+ req.query.id +"'";
        var images = "SELECT * FROM `images` WHERE `iv_category` = 'image' AND `item_category` = 'products' AND `item_id` = '"+ req.query.id +"'";
        pool.query(images,function(err,images){
            pool.query(query,function(err,query){
              pool.query(eachQuantity,function(err,eachQuantity){
                var similiarColors = "SELECT * FROM `products` WHERE `status` = 1 AND `id` <> '"+ req.query.id +"' AND `name` = '"+ query[0].name +"'";
                var moreProducts = "SELECT * FROM `products` WHERE `status` = 1 AND `id` <> '"+ req.query.id +"' AND `cloth_category` = '"+ query[0].cloth_category +"' ORDER BY RAND() DESC LIMIT 3 OFFSET 0";
                pool.query(moreProducts,function(err,moreProducts){
                  pool.query(similiarColors,function(err,similiarColors){
                    if(err) {
                        console.log(err);
                          res.json({
                              message:'Database_connection_error',
                              data: [],
                              images: [],
                              moreProducts: [],
                              eachQuantity:[],
                              similiarColors:[],
                              sizeChart:'',
                          });
                      } else {
                        var size_chart = '';
                        if(query[0].cloth_category == "RAGLAN CROP TOPS") {
                          size_chart = '/images/local/crop_top.jpg';
                        } else if(query[0].cloth_category == "REGULAR CREW NECK") {
                          size_chart = '/images/local/regular_fit.jpg';
                        } else if(query[0].cloth_category == "OVERSIZED CREW NECK") {
                          size_chart = '/images/local/oversize.jpg';
                        }
                        res.json({
                          message:'success',
                          data:query,
                          images: images,
                          moreProducts: moreProducts,
                          eachQuantity:eachQuantity,
                          similiarColors:similiarColors,
                          sizeChart:size_chart,
                        });
                      }
                  });
                });
              });
            });
          });
      } else {
        res.json({
          message : 'Auth_token_failure',
        });
      }
    },
    getUserProductOrders: (req,res,next) => {
      if(req.headers.token) {
        var query = "SELECT o.*,p.`name` AS productName , p.`cover_photo` FROM `orders` o INNER JOIN `products` p ON p.`id` = o.`item_id` WHERE o.`item_category` = 'product' AND o.`user_id` = '"+ req.query.user_id +"' ORDER BY o.`date_purchased` DESC LIMIT 20 OFFSET "+ req.query.offset +"";
        var totalOrders = "SELECT COUNT(*) AS totalOrders FROM `orders` WHERE `item_category` = 'product' AND `user_id` = '"+ req.query.user_id +"'";
        pool.query(query,function(err,query){
          pool.query(totalOrders,function(err,totalOrders){
            if(err) {
                console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      data: [],
                      totalOrders: 0,
                  });
              } else {
                res.json({
                  message:'success',
                  data:query,
                  totalOrders: totalOrders.length != 0 ? totalOrders[0].totalOrders : 0,
                });
              }
          });
        });
      } else {
        res.json({
          message : 'Auth_token_failure',
        });
      }
    },
    changeOrderStatus : (req,res,next) => {
      var itemId = req.query.item_id;
      var quantity = req.query.quantity;
      var details = req.query.details;
      var query2  = "UPDATE `orders` SET `status` = '"+ req.query.status +"'  WHERE `id` = '"+ req.body.id +"'";
      var updateProductQuantity = "UPDATE `product_size_quantity` SET `quantity` = `quantity` + "+ (parseInt(quantity)) +"  WHERE `item_id` = '"+ itemId +"' AND `size` = '"+ details +"'";
      pool.query(query2,function(err,results,fields){
          if(err) {
              res.json({message:'Database connection error !!'});
          } else {
              if(req.query.status == 'CANCELLED') {
                  pool.query(updateProductQuantity,function(err,updateProductQuantity,fields){
                      if(err) {
                          res.json({message:'Database connection error !!'});
                      } else {
                          res.json({data:results});
                      }
                  });
              } else {
                  res.json({data:results});
              }
          }
      });
    },
    getSearchUserProductOrders: (req,res,next) => {
      if(req.headers.token) {
        var date = new Date(req.query.to);
        date.setDate(date.getDate() + 1);
        var query = "SELECT o.*,p.`name` AS productName , p.`cover_photo` FROM `orders` o INNER JOIN `products` p ON p.`id` = o.`item_id` WHERE o.`item_category` = 'product' AND o.`user_id` = '"+ req.query.user_id +"' AND o.`date_purchased` BETWEEN str_to_date('"+ req.query.from +"', '%Y-%m-%d') AND str_to_date('"+ date.toISOString().split('T')[0] +"', '%Y-%m-%d') ORDER BY o.`date_purchased` DESC LIMIT 20 OFFSET "+ req.query.offset +"";
        // console.log(query);
        pool.query(query,function(err,query){
            if(err) {
                console.log(err);
                  res.json({
                      message:'Database_connection_error',
                      data: [],
                      totalOrders: 0,
                  });
              } else {
                res.json({
                  message:'success',
                  data:query,
                  totalOrders: 0,
                });
              }
          });
      } else {
        res.json({
          message : 'Auth_token_failure',
        });
      }
    },
}