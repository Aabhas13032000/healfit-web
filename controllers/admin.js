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
    getTrainerProfilePage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/profile/trainer_profile',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                });
            } else {
                res.status(200).render('admin/profile/trainer_profile',{
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
                    statusValue:req.statusValue,
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
                    statusValue:req.statusValue,
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
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    statusValue:req.statusValue,
                    categories: req.categories,
                    trainers:req.trainers,
                    days:req.days,
                    timings:req.timings,
                    sessions:req.sessions,
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
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    statusValue:req.statusValue,
                    categories: req.categories,
                    trainers:req.trainers,
                    days:req.days,
                    timings:req.timings,
                    sessions:req.sessions,
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
    getTrainersProgramsPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/programs/trainer_program',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    statusValue:req.statusValue,
                    categories: req.categories,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            } else {
                res.status(200).render('admin/programs/trainer_program',{
                    data:req.data,
                    message: null,
                    alert: null,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    statusValue:req.statusValue,
                    categories: req.categories,
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
    getTrainersPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/trainer/trainer',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    statusValue:req.statusValue,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            } else {
                res.status(200).render('admin/trainer/trainer',{
                    data:req.data,
                    message: null,
                    alert: null,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    statusValue:req.statusValue,
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
    getTestimonialsPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/testimonials/testimonials',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    categories: req.categories,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            } else {
                res.status(200).render('admin/testimonials/testimonials',{
                    data:req.data,
                    message: null,
                    alert: null,
                    searchPage: req.searchPage,
                    searchValue: req.searchValue,
                    categories: req.categories,
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
    getBlogPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/blogs/blogs',{
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
                res.status(200).render('admin/blogs/blogs',{
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
    getBookPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/books/books',{
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
                res.status(200).render('admin/books/books',{
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
    getCouponPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/coupons/coupons',{
                    // data:req.data,
                    message: req.message,
                    alert: req.alert,
                });
            } else {
                res.status(200).render('admin/coupons/coupons',{
                    // data:req.data,
                    message: null,
                    alert: null,
                });
            }
        }
    },
    getFoodPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/food/food',{
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
                res.status(200).render('admin/food/food',{
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
    getWorkoutPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/workout/workout',{
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
                res.status(200).render('admin/workout/workout',{
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
    getReviewsPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/reviews/reviews',{
                    // data:req.data,
                    message: req.message,
                    alert: req.alert,
                });
            } else {
                res.status(200).render('admin/reviews/reviews',{
                    // data:req.data,
                    message: null,
                    alert: null,
                });
            }
        }
    },
    getSubscriptionsPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/subscriptions/subscriptions',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                    searchPage: req.searchPage,
                    bookPage: req.bookPage,
                    dateFrom : req.dateFrom,
                    dateTo : req.dateTo,
                    phoneNumber : req.phoneNumber,
                    trainer : req.trainer,
                    program : req.program,
                    book : req.book,
                    userName : req.userName,
                    sessionType : req.sessionType,
                    sessionId : req.sessionId,
                    dayId : req.dayId,
                    timingId : req.timingId,
                    trainers:req.trainers,
                    days:req.days,
                    timings:req.timings,
                    sessions:req.sessions,
                    programs: req.programs,
                    books : req.books,
                    trainer_programs: req.trainer_programs,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            } else {
                res.status(200).render('admin/subscriptions/subscriptions',{
                    data:req.data,
                    message: null,
                    alert: null,
                    searchPage: req.searchPage,
                    bookPage: req.bookPage,
                    dateFrom : req.dateFrom,
                    dateTo : req.dateTo,
                    phoneNumber : req.phoneNumber,
                    trainer : req.trainer,
                    program : req.program,
                    book : req.book,
                    userName : req.userName,
                    sessionType : req.sessionType,
                    sessionId : req.sessionId,
                    dayId : req.dayId,
                    timingId : req.timingId,
                    trainers:req.trainers,
                    days:req.days,
                    timings:req.timings,
                    sessions:req.sessions,
                    programs: req.programs,
                    books : req.books,
                    trainer_programs: req.trainer_programs,
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
    getTrainerSubscriptionsPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/subscriptions/trainer_subscription',{
                    data:req.data,
                    message: req.message,
                    alert: req.alert,
                    searchPage: req.searchPage,
                    bookPage: req.bookPage,
                    dateFrom : req.dateFrom,
                    dateTo : req.dateTo,
                    phoneNumber : req.phoneNumber,
                    trainer : req.trainer,
                    program : req.program,
                    book : req.book,
                    userName : req.userName,
                    sessionType : req.sessionType,
                    sessionId : req.sessionId,
                    dayId : req.dayId,
                    timingId : req.timingId,
                    trainers:req.trainers,
                    days:req.days,
                    timings:req.timings,
                    sessions:req.sessions,
                    programs: req.programs,
                    books : req.books,
                    trainer_programs: req.trainer_programs,
                    loginTrainerId: req.loginTrainerId,
                    metadata: {
                        page: req.page,
                        offset: req.offset,
                        total_items:req.data.length,
                        total: req.totalUsers,
                        total_pages: parseInt(req.totalUsers/20) + 1,
                    }
                });
            } else {
                res.status(200).render('admin/subscriptions/trainer_subscription',{
                    data:req.data,
                    message: null,
                    alert: null,
                    searchPage: req.searchPage,
                    bookPage: req.bookPage,
                    dateFrom : req.dateFrom,
                    dateTo : req.dateTo,
                    phoneNumber : req.phoneNumber,
                    trainer : req.trainer,
                    program : req.program,
                    book : req.book,
                    userName : req.userName,
                    sessionType : req.sessionType,
                    sessionId : req.sessionId,
                    dayId : req.dayId,
                    timingId : req.timingId,
                    trainers:req.trainers,
                    days:req.days,
                    timings:req.timings,
                    sessions:req.sessions,
                    programs: req.programs,
                    books : req.books,
                    trainer_programs: req.trainer_programs,
                    loginTrainerId: req.loginTrainerId,
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
    getOrdersPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/orders/orders',{
                    // data:req.data,
                    message: req.message,
                    alert: req.alert,
                });
            } else {
                res.status(200).render('admin/orders/orders',{
                    // data:req.data,
                    message: null,
                    alert: null,
                });
            }
        }
    },
    getSocialLinksPage: (req,res) => {
        if(req.error) {
            res.render(req.error);
        } else {
            if(req.message) {
                res.status(200).render('admin/social_links/social_links',{
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
                res.status(200).render('admin/social_links/social_links',{
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
}