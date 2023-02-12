const pool = require('../database/connection');

module.exports = {
    //Get user details
    getOrders: (req,res,next) => {
        var queryData = req.query;
        var totalUsers = "SELECT COUNT(*) AS total FROM `orders` WHERE `item_category` = 'product'";
        var shippingDetails = "SELECT `maximum_value` , `shipping_charges` FROM `admin`";
        if(queryData.page) {
            var offset = (parseInt(queryData.page)-1) * 20;
            var query = "SELECT o.*,p.`name` AS productName,p.`discount_price` AS productPrice,p.`description` AS productDesc,p.`color`,p.`cover_photo`,o.`full_name` AS userName,o.`phoneNumber` AS phoneNumber FROM `orders` o INNER JOIN `products` p ON p.`id` = o.`item_id` WHERE o.`item_category` = 'product' ORDER BY o.`date_purchased` DESC LIMIT 20 OFFSET "+ offset +"";
            req.offset = offset;
            req.page = parseInt(queryData.page);
        } else {
            var query = "SELECT o.*,p.`name` AS productName,p.`discount_price` AS productPrice,p.`description` AS productDesc,p.`color`,p.`cover_photo`,o.`full_name` AS userName,o.`phoneNumber` AS phoneNumber FROM `orders` o INNER JOIN `products` p ON p.`id` = o.`item_id` WHERE o.`item_category` = 'product' ORDER BY o.`date_purchased`";
            req.offset = 0;
            req.page = 0;
        }
        pool.query(query,function(err,results){
            pool.query(totalUsers,function(err,totalUsers){
                pool.query(shippingDetails,function(err,shippingDetails){
                    if(err) {
                        req.error = 'Database error';
                    } else {
                        req.data = results;
                        req.totalUsers = totalUsers.length > 0 ? totalUsers[0].total : 0;
                        req.searchPage = false;
                        req.dateFrom = '';
                        req.dateTo = '';
                        req.phoneNumber = '';
                        req.userName = '';
                        req.status = '';
                        req.product = '';
                        req.maximum_value = shippingDetails[0] ? shippingDetails[0].maximum_value : 0;
                        req.shipping_charges = shippingDetails[0] ? shippingDetails[0].shipping_charges : 0;
                    }
                    next();
                });
            });
        });
    },
    getSearchOrders : (req,res,next) => {
        var queryData = req.query;
        var dateFrom = queryData.dateFrom ? queryData.dateFrom : '';
        var dateTo = queryData.dateTo ? queryData.dateTo : '';
        var phoneNumber = queryData.phoneNumber ? queryData.phoneNumber : '';
        var userName = queryData.userName ? queryData.userName : '';
        var status = queryData.status.length != 0 ? queryData.status : '';
        var product = queryData.product ? queryData.product : '';
        const query = "SELECT o.*,p.`name` AS productName,p.`discount_price` AS productPrice,p.`description` AS productDesc,p.`color`,p.`cover_photo`,o.`full_name` AS userName,o.`phoneNumber` AS phoneNumber FROM `orders` o INNER JOIN `products` p ON p.`id` = o.`item_id` WHERE o.`item_category` = 'product'" + (phoneNumber.length != 0 ? ' AND o.`phoneNumber` LIKE "%'+ phoneNumber +'%"' : '') + (userName.length != 0 ? ' AND o.`full_name` LIKE "%'+ userName +'%"' : '') + (product.length != 0 ? ' AND p.`name` = "'+ product +'"' : '') + (status.length != 0 ? ' AND o.`status` = "'+ status +'"' : '') + ( (dateFrom.length != 0 && dateTo.length == 0) ? ' AND o.`date_purchased` LIKE "%'+ dateFrom +'%"' : '') + ( (dateFrom.length == 0 && dateTo.length != 0) ? ' AND o.`date_purchased` LIKE "%'+ dateTo +'%"' : '') + ( (dateFrom.length != 0 && dateTo.length != 0) ? ' AND o.`date_purchased` BETWEEN "'+ dateFrom +'" AND "'+ dateTo +'"' : '') + " ORDER BY o.`date_purchased` DESC";
        var shippingDetails = "SELECT `maximum_value` , `shipping_charges` FROM `admin`";
        // console.log(query);
        pool.query(query,function(err,results,fields){
            pool.query(shippingDetails,function(err,shippingDetails,fields){
                if(err) {
                    req.error = 'Database error';
                } else {
                    req.data = results;
                    req.totalUsers = 0;
                    req.offset = 0;
                    req.page = 0;
                    req.searchPage = true;
                    req.dateFrom = dateFrom;
                    req.dateTo = dateTo;
                    req.phoneNumber = phoneNumber;
                    req.userName = userName;
                    req.status = status;
                    req.product = product;
                    req.maximum_value = shippingDetails[0] ? shippingDetails[0].maximum_value : 0;
                    req.shipping_charges = shippingDetails[0] ? shippingDetails[0].shipping_charges : 0;
                }
                next();
            });
        });
    },
    addOrder: (req,res,next) => {
        var finalAddress = req.body.finalAddress.replace(/'/g, '-').replace(/"/g, '');
        var order_id = Math.floor((Math.random() * 100) + 1);
        var query  = "INSERT INTO `orders` (`order_id`,`payment_status`,`payment_method`,`quantity`,`paid_price`,`full_name`,`phoneNumber`,`address`,`details`,`item_category`,`item_id`,`user_id`,`date_purchased`) VALUES ('"+ order_id +"','done','online','"+ req.body.quantity +"','"+ req.body.price +"','"+ req.body.fullName +"','"+ req.body.phoneNumber +"','"+ finalAddress +"','"+ req.body.description +"','product','"+ req.body.item_id +"','"+ req.body.user_id +"','"+ req.body.date_purchased +"')";
        pool.query(query,function(err,results){
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
    deleteOrder : (req,res,next) => {
        const query  = "DELETE FROM `products` WHERE `id` = '"+ req.body.id +"'";
        pool.query(query,function(err,results,fields){
            if(err) {
                console.log(err);
                req.error = 'Database error';
            } else {
                res.json({data:results});
            }
        });            
    },
    getProducts: (req,res,next) => {
        var products = "SELECT `name`,`id`,`color` FROM `products` WHERE `status` = 1";
        pool.query(products,function(err,products){
            if(err) {
                req.error = 'Database error';
            } else {
                req.products = products;
            }
            next();
        });
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
                if(req.query.status == 'REJECTED') {
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
}