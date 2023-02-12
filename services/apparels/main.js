const pool = require('../../database/connection');

module.exports = {
    getClothCategory: (req,res,next) => {
        if(req.query.clothCategories) {
            var productCategory = "SELECT * FROM `product_categories` WHERE `status` = 1";
            pool.query(productCategory,function(err,productCategory){
                if(err) {
                    console.log(err);
                    req.clothCategories = [];
                    req.productCategories = [];
                } else {
                    req.clothCategories = [];
                    req.productCategories = productCategory;
                }
                next();
            });
        } else {
            if(req.query.category) {
                var query = "SELECT `cloth_category` FROM `products` WHERE `category` LIKE '%"+ req.query.category +"%' GROUP BY cloth_category";
                var productCategory = "SELECT * FROM `product_categories` WHERE `status` = 1";
                pool.query(query,function(err,query){
                    pool.query(productCategory,function(err,productCategory){
                        if(err) {
                            console.log(err);
                            req.clothCategories = [];
                            req.productCategories = [];
                        } else {
                            query.unshift({ cloth_category: 'ALL' });
                            req.clothCategories = query;
                            req.productCategories = productCategory;
                        }
                        next();
                    });
                });
            } else {
                if(req.query.gender) {
                    var query = "SELECT `cloth_category` FROM `products` WHERE `gender` LIKE '%"+ req.query.gender +"%' GROUP BY cloth_category";
                    var productCategory = "SELECT * FROM `product_categories` WHERE `status` = 1";
                    pool.query(query,function(err,query){
                        pool.query(productCategory,function(err,productCategory){
                            if(err) {
                                console.log(err);
                                req.clothCategories = [];
                                req.productCategories = [];
                            } else {
                                query.unshift({ cloth_category: 'ALL' });
                                req.clothCategories = query;
                                req.productCategories = productCategory;
                            }
                            next();
                        });
                    });
                } else {
                    var productCategory = "SELECT * FROM `product_categories` WHERE `status` = 1";
                    pool.query(productCategory,function(err,productCategory){
                        if(err) {
                            console.log(err);
                            req.clothCategories = [];
                            req.productCategories = [];
                        } else {
                            req.clothCategories = [];
                            req.productCategories = productCategory;
                        }
                        next();
                    });
                }
            }
        }
    },
    getCitiesStates: (req,res,next) => {
        var cities = "SELECT c.* , s.`name` AS state_name FROM `cities` c INNER JOIN `states` s ON s.`id` = c.`state_id` WHERE s.`country_id` = 101 ORDER BY c.`name`";
        var states = "SELECT * FROM `states` WHERE `country_id` = 101";
        pool.query(cities,function(err,cities){
            pool.query(states,function(err,states){
                if(err) {
                    console.log(err);
                    req.cities = [];
                    req.states = [];
                } else {
                    req.cities = cities;
                    req.states = states;
                }
                next();
            });
        });
    },
}