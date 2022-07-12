module.exports = {
    getAdminProfilePage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/profile/profile',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                });
            } else {
                res.status(200).render('admin/profile/profile',{
                    data:req.data,
                    message: null,
                    alert: null,
                });
            }
        }
    },
    getUsersPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/users/users',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            } else {
                res.status(200).render('admin/users/users',{
                    data:req.data,
                    message: null,
                    alert: null,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            }
        }
    },
    getEachUserPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/users/each_user',{
                    data:req.data,
                    subscriptions: req.subscriptions,
                    message: req.message,
                    alert: req.alert,
                });
            } else {
                res.status(200).render('admin/users/each_user',{
                    data:req.data,
                    subscriptions: req.subscriptions,
                    message: null,
                    alert: null,
                });
            }
        }
    },
    getProgramsPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/programs/programs',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            } else {
                res.status(200).render('admin/programs/programs',{
                    data:req.data,
                    message: null,
                    alert: null,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            }
        }
    },
}