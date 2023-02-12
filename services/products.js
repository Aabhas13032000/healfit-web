const pool = require('../database/connection');

const fs =  require('fs');

module.exports = {
    //Get user details
    getProducts: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `products` WHERE `status` <> 3";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT * FROM `products` WHERE `status` <> 3 ORDER BY `id` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT * FROM `products` WHERE `status` <> 3 ORDER BY `id` DESC";
            req.offset = 0;
            req.page = 0;
        }
        pool.query(query,function(err,results){
            pool.query(totalUsers,function(err,totalUsers){
                if(err) {
                    req.error = 'Database error';
                } else {
                    req.data = results;
                    req.totalUsers = totalUsers.length > 0 ? totalUsers[0].total : 0;
                    req.searchPage = false;
                    req.searchValue = '';
                    req.statusValue = '';
                }
                next();
            });
        });
    },
    getSearchProducts : (req,res,next) => {
        var queryData = req.query;
        if(queryData.searchedCategory.length != 0){
            var query = "SELECT * FROM `products` WHERE `name` LIKE '%"+ queryData.searchedTitle +"%' AND `gender` LIKE '%"+ queryData.searchedCategory +"%' AND `status` <> 3 ORDER BY `created_at` DESC";
        } else {
            var query = "SELECT * FROM `products` WHERE `name` LIKE '%"+ queryData.searchedTitle +"%' AND `status` <> 3 ORDER BY `created_at` DESC";
        }
        console.log(query);
        pool.query(query,function(err,results,fields){
            if(err) {
                req.error = 'Database error';
            } else {
                req.data = results;
                req.totalUsers = 0;
                req.offset = 0;
                req.page = 0;
                req.searchPage = true;
                req.searchValue = queryData.searchedTitle;
                req.statusValue = queryData.searchedCategory;
            }
            next();
        });
    },
    getProductSizesQuantity: (req,res,next) => {
        var productSizesQuantity = "SELECT * FROM `product_size_quantity` WHERE `item_id` = '"+ req.query.product_id +"'";
        pool.query(productSizesQuantity,function(err,productSizesQuantity){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    productSizesQuantity: productSizesQuantity,
                })
            }
        });
    },
    addProduct : (req,res,next) => {
        var images_array = [];
        var pdf_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        const query  = "INSERT INTO `products` (`name`,`description`,`gender`,`cloth_category`,`category`,`price`,`discount_price`,`cover_photo`,`stock`,`sizes`,`color`) VALUES ('"+ req.body.name +"','"+ req.body.description +"','"+ req.body.gender +"','"+ req.body.cloth_category +"','"+ req.body.category +"','"+ req.body.price +"','"+ req.body.discount_price +"','"+ images_array[0] +"','"+ req.body.stock +"','"+ req.body.sizes +"','"+ req.body.color +"')";
        var sizes_quantity = JSON.parse(req.body.size_quantity);
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                for(var i=0;i<images_array.length;i++) {
                    var query  = "INSERT INTO `images` (`path`,`iv_category`,`item_category`,`item_id`) VALUES ('"+ images_array[i] +"','image','products','"+ results.insertId +"')";
                    pool.query(query,function(err,results,fields){
                        if(err) {
                            console.log(err);
                            // break;
                        } else {
                        }
                    });
                }
                var counter = 0;
                for (let i=0; i<sizes_quantity.length; i++) {
                    task(i,sizes_quantity[i]);
                }
                function task(i,size_quantity) {
                    setTimeout(function() {
                        var query  = "INSERT INTO `product_size_quantity` (`size`,`quantity`,`item_id`) VALUES ('"+ size_quantity.size +"','"+ size_quantity.quantity +"','"+ results.insertId +"')";
                        pool.query(query,function(err,results,fields){
                            if(err) {
                                console.log(err);
                                // break;
                            } else {
                                counter++;
                                check_counter(counter);
                            }
                        });
                    }, 500 * i);
                }
            }
        });
        function check_counter(counter1){
            if(counter1 == sizes_quantity.length){
                res.json({
                    message: 'success',
                });
            }
        }
    },
    saveProduct : (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[4])[1] != 'string'){
            images_array = (Object.entries(req.body)[4])[1];
        } else {
            images_array.push((Object.entries(req.body)[4])[1]);
        }
        var sizes_quantity = JSON.parse(req.body.size_quantity);
        // console.log(req.body);
        const query  = "UPDATE `products` SET `name` = '"+ req.body.name +"',`description` = '"+ req.body.description +"',`gender` = '"+ req.body.gender +"',`cloth_category` = '"+ req.body.cloth_category +"',`category` = '"+ req.body.category +"',`price` = '"+ req.body.price +"',`discount_price` = '"+ req.body.discount_price +"',`stock` = '"+ req.body.stock +"',`sizes` = '"+ req.body.sizes +"',`color` = '"+ req.body.color +"' WHERE `id` =  '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                var counter = 0;
                for (let i=0; i<sizes_quantity.length; i++) {
                    task(i,sizes_quantity[i]);
                }
                function task(i,size_quantity) {
                    setTimeout(function() {
                        var query  = "UPDATE `product_size_quantity` SET `quantity` = '"+ size_quantity.quantity +"' WHERE `size` = '"+ size_quantity.size +"' AND `item_id` = '"+ req.body.id +"'";
                        var insertQuery  = "INSERT INTO `product_size_quantity` (`size`,`quantity`,`item_id`) VALUES ('"+ size_quantity.size +"','"+ size_quantity.quantity +"','"+ req.body.id +"')";
                        pool.query(query,function(err,results,fields){
                            if(err) {
                                console.log(err);
                                // break;
                            } else {
                                if(results.affectedRows == 0) {
                                    pool.query(insertQuery,function(err,results,fields){
                                        if(err) {
                                            console.log(err);
                                            // break;
                                        } else {
                                            counter++;
                                            check_counter(counter);
                                        }
                                    });
                                } else {
                                    counter++;
                                    check_counter(counter);
                                }
                            }
                        });
                    }, 500 * i);
                }
            }
        });
        function check_counter(counter1){
            if(counter1 == sizes_quantity.length){
                res.json({
                    message: 'success',
                });
            }
        }
    },
    saveCoverImage : (req,res,next) => {
        const query  = "UPDATE `products` SET `cover_photo` = '"+ req.body.path +"' WHERE `id` =  '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({
                    data: results,
                });
            }
        });
    },
    getCategories: (req,res,next) => {
        var categories = "SELECT * FROM `product_categories` WHERE `status` = 1";
        var clothCategories = "SELECT * FROM `cloth_category` WHERE `status` = 1";
        pool.query(categories,function(err,categories){
            pool.query(clothCategories,function(err,clothCategories){
                if(err) {
                    req.error = 'Database error';
                } else {
                    req.categories = categories;
                    req.clothCategories = clothCategories;
                }
                next();
            });
        });
    },
    addCategories: (req,res,next) => {
        var categories = "INSERT INTO `product_categories` (`name`) VALUES ('"+ req.body.value +"')";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: categories,
                })
            }
        });
    },
    checkCategory: (req,res,next) => {
        var categories = "SELECT * FROM `product_categories` WHERE name = '"+ req.params.name +"' AND `status` = 1";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: categories,
                })
            }
        });
    },
    updateProductCategoryImage: (req,res,next) => {
        if(req.body.value == 'web') {
            var categories = "UPDATE `product_categories` SET `web_slider` = '"+ req.body.path +"'  WHERE `id` = '"+ req.body.id +"'";
        } else {
            var categories = "UPDATE `product_categories` SET `mobile_slider` = '"+ req.body.path +"'  WHERE `id` = '"+ req.body.id +"'";
        }
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    message: 'success',
                })
            }
        });
    },
    deleteProductCategoryImage: (req,res,next) => {
        var path = `public${req.body.path}`;
        fs.unlink(path,(err) => {
          if(err) {
            console.log(err);
          } else {
            if(req.body.value == 'web') {
                var categories = "UPDATE `product_categories` SET `web_slider` = NULL  WHERE `id` = '"+ req.body.id +"'";
            } else {
                var categories = "UPDATE `product_categories` SET `mobile_slider` = NULL  WHERE `id` = '"+ req.body.id +"'";
            }
            pool.query(categories,function(err,categories){
                if(err) {
                    req.error = 'Database error';
                } else {
                    res.json({
                        message: 'success',
                    })
                }
            });
          }
        });
    },
    addClothCategories: (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[1])[1] != 'string'){
            images_array = (Object.entries(req.body)[1])[1];
        } else {
            images_array.push((Object.entries(req.body)[1])[1]);
        }
        var categories = "INSERT INTO `cloth_category` (`name`,`cover_photo`) VALUES ('"+ req.body.value +"','"+ images_array[0] +"')";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: categories,
                })
            }
        });
    },
    saveClothCategoryCoverPhoto: (req,res,next) => {
        var images_array = [];
        if(typeof (Object.entries(req.body)[0])[1] != 'string'){
            images_array = (Object.entries(req.body)[0])[1];
        } else {
            images_array.push((Object.entries(req.body)[0])[1]);
        }
        var categories = "UPDATE `cloth_category` SET `cover_photo` = '"+ images_array[0] +"'  WHERE `id` = '"+ req.params.id +"'";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    message: 'success',
                })
            }
        });
    },
    deleteClothCategoryCoverPhoto: (req,res,next) => {
        var path = `public${req.body.path}`;
        fs.unlink(path,(err) => {
          if(err) {
            console.log(err);
          } else {
            var categories = "UPDATE `cloth_category` SET `cover_photo` = NULL  WHERE `id` = '"+ req.body.id +"'";
            pool.query(categories,function(err,categories){
                if(err) {
                    req.error = 'Database error';
                } else {
                    res.json({
                        message: 'success',
                    })
                }
            });
          }
        });
    },
    checkClothCategory: (req,res,next) => {
        var categories = "SELECT * FROM `cloth_category` WHERE name = '"+ req.params.name +"' AND `status` = 1";
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    data: categories,
                })
            }
        });
    },
    updateClothCategoryImage: (req,res,next) => {
        if(req.body.value == 'web') {
            var categories = "UPDATE `cloth_category` SET `web_slider` = '"+ req.body.path +"'  WHERE `id` = '"+ req.body.id +"'";
        } else {
            var categories = "UPDATE `cloth_category` SET `mobile_slider` = '"+ req.body.path +"'  WHERE `id` = '"+ req.body.id +"'";
        }
        pool.query(categories,function(err,categories){
            if(err) {
                req.error = 'Database error';
            } else {
                res.json({
                    message: 'success',
                })
            }
        });
    },
    deleteClothCategoryImage: (req,res,next) => {
        var path = `public${req.body.path}`;
        fs.unlink(path,(err) => {
          if(err) {
            console.log(err);
          } else {
            if(req.body.value == 'web') {
                var categories = "UPDATE `cloth_category` SET `web_slider` = NULL  WHERE `id` = '"+ req.body.id +"'";
            } else {
                var categories = "UPDATE `cloth_category` SET `mobile_slider` = NULL  WHERE `id` = '"+ req.body.id +"'";
            }
            pool.query(categories,function(err,categories){
                if(err) {
                    req.error = 'Database error';
                } else {
                    res.json({
                        message: 'success',
                    })
                }
            });
          }
        });
    },
    markedProductImportant : (req,res,next) => {
        const query  = "SELECT * FROM `products` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].imp == 1){
                    var query2  = "UPDATE `products` SET `imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `products` SET `imp` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    markedProductCategoryImportant : (req,res,next) => {
        const query  = "SELECT * FROM `product_categories` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].imp == 1){
                    var query2  = "UPDATE `product_categories` SET `imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `product_categories` SET `imp` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    markedProductCategoryHomeImportant : (req,res,next) => {
        const query  = "SELECT * FROM `product_categories` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].home_imp == 1){
                    var query2  = "UPDATE `product_categories` SET `home_imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `product_categories` SET `home_imp` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    markedProductCategoryNavImportant : (req,res,next) => {
        const query  = "SELECT * FROM `product_categories` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].nav_imp == 1){
                    var query2  = "UPDATE `product_categories` SET `nav_imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `product_categories` SET `nav_imp` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    markedClothCategoryImportant : (req,res,next) => {
        const query  = "SELECT * FROM `cloth_category` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].imp == 1){
                    var query2  = "UPDATE `cloth_category` SET `imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `cloth_category` SET `imp` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    markedClothCategoryHomeImportant : (req,res,next) => {
        const query  = "SELECT * FROM `cloth_category` WHERE `id` = '"+ req.body.id +"' AND `status` = 1";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                if(results[0].home_imp == 1){
                    var query2  = "UPDATE `cloth_category` SET `home_imp` = 0  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `cloth_category` SET `home_imp` = 1  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    markedProductblocked : (req,res,next) => {
        const query  = "SELECT * FROM `products` WHERE `id` = '"+ req.body.id +"' AND (`status` = 1 OR `status` = 2)";
        pool.query(query,function(err,results,fields){
            if(err) {
                callback(err);
            } else {
                if(results[0].status == 'BLOCKED'){
                    var query2  = "UPDATE `products` SET `status` = 1  WHERE `id` = '"+ req.body.id +"'";
                } else {
                    var query2  = "UPDATE `products` SET `status` = 2  WHERE `id` = '"+ req.body.id +"'";
                }
                pool.query(query2,function(err,results,fields){
                    if(err) {
                        res.json({message:'Database connection error !!'});
                    } else {
                        res.json({data:results});
                    }
                });
            }
        });
    },
    deleteProduct : (req,res,next) => {
        const query  = "UPDATE `products` SET `status` = 3  WHERE `id` = '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({data:results});
            }
        });            
    },
}