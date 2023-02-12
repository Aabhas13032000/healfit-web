var commentoffset = 0;

function leftButtonClicked(box,widthOfCard,event) {
    console.log('left clicked');
    const conent = document.querySelector('#' + box);
    var scrollvalue = conent.scrollWidth - conent.offsetWidth;
    if(conent.scrollLeft == 0){
        conent.scrollLeft = scrollvalue;
    } else {
        conent.scrollLeft -= conent.offsetWidth;
    }
    event.preventDefault();
}

function checkDownloadPdf(id,title,url,price) {
    var element = document.getElementById('login_button_topbar');
        var element2 = document.getElementById('login_button');
        if(element.style.display == "block" || element2.style.display =="block" || element.style.display == "" || element2.style.display =="") {
            alert('Please login first');
        } else {
            document.getElementById('load').style.visibility="visible";
            var array = document.cookie.split(';');
        var counter = 0;
        var index = 0;
        var userIndex = 0;
        for(var i=0;i<array.length;i++) {
            if(array[i].includes('currentUserToken=')){
                counter++;
                index = i;
            }
            if(array[i].includes('user_id=')){
                counter++;
                userIndex = i;
            }
        }
        if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
            var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
            var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
        } else {
            var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
            var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
        }
            $.ajax({
                url : `/api/books/checkBookSubscription?user_id=${user_id}&id=${id}`,
                dataType: "json",
                type: "GET",
                headers: {
                    'token':token ? token : 'testing',
                    'Content-Type':'application/json',
                    'platform': 'WEB'
                },
                success: function(response){
                    if(isDevelopment) {
                    console.log(response);
                }
                    if(response.message == 'can_download') {
                        downloadPDF(title,url,id);
                    } else if(response.message == 'cannot_download_subscription_expired' || response.message == 'not_purchased_yet') {
                        // alert('Your need to purchase the book to download');
                        callRazorPayFunction(price,id,title);
                    }
                },
                error: function(err){
                    if(isDevelopment) {
                    console.log(err);
                }
                    alert('Some error occured !!');
                }
            });
        }
}

function callRazorPayFunction(price,book_id,title){
    var array = document.cookie.split(';');
        var counter = 0;
        var index = 0;
        var userIndex = 0;
        for(var i=0;i<array.length;i++) {
            if(array[i].includes('currentUserToken=')){
                counter++;
                index = i;
            }
            if(array[i].includes('user_id=')){
                counter++;
                userIndex = i;
            }
        }
        if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
            var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
            var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
        } else {
            var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
            var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
        }
    var data = {
        total: price,
        name:"",
        email:"",
        phone:"",
        user_id:user_id,
        companyName:title,
        description:"Payment for the book"
    }
    $.ajax({
        url:"/subscription/paymentInitiate",
        dataType: "json",
        type:"POST",
        headers: {
            'token':token ? token : 'testing',
            'platform': 'WEB'
        },
        data: data,
        success: function(info){
            document.getElementById('load').style.visibility="hidden";
        //    console.log(info);
            
            info["callback_url"] = `/subscription/purchasedItem?item_id=${book_id}&item_category=book&user_id=${user_id}`;
            var rzp1 = new Razorpay(info);
            rzp1.open();
        },
        error: function(err){
            console.log(err.status);
            alert('Some Error occurred!');
            // location.reload();
        }
    });
}

function downloadPDF(title,url,id) {
    var link = document.createElement('a');
    link.href = url;
    link.download = `${title.trim().replace(" ","_")}.pdf`;
    link.dispatchEvent(new MouseEvent('click'));
    document.getElementById('load').style.visibility="hidden";
    // var array = document.cookie.split(';');
    //     var counter = 0;
    //     var index = 0;
    //     var userIndex = 0;
    //     for(var i=0;i<array.length;i++) {
    //         if(array[i].includes('currentUserToken=')){
    //             counter++;
    //             index = i;
    //         }
    //         if(array[i].includes('user_id=')){
    //             counter++;
    //             userIndex = i;
    //         }
    //     }
    //     if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
    //         var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
    //         var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
    //     } else {
    //         var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
    //         var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
    //     }
    // $.ajax({
    //     url:`/api/books/increaseBookDownload?id=${id}`,
    //     dataType: "json",
    //     type:"POST",
    //     headers: {
    //         'token':token ? token : 'testing',
    //         'platform': 'WEB'
    //     },
    //     data: {},
    //     success: function(info){
    //         document.getElementById('load').style.visibility="hidden";
    //     },
    //     error: function(err){
    //         console.log(err.status);
    //         alert('Some Error occurred!');
    //         // location.reload();
    //     }
    // });
}

function logout() {
    if(confirm('Are you sure you want to logout?') == true){
        document.getElementById('load').style.visibility="visible";
        var array = document.cookie.split(';');
        var counter = 0;
        var index = 0;
        var userIndex = 0;
        for(var i=0;i<array.length;i++) {
            if(array[i].includes('currentUserToken=')){
                counter++;
                index = i;
            }
            if(array[i].includes('user_id=')){
                counter++;
                userIndex = i;
            }
        }
        if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
            var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
            var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
        } else {
            var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
            var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
        }
        $.ajax({
            url : `/api/logout`,
            dataType: "json",
            type: "POST",
            headers: {
                'token':token ? token : 'testing',
                'platform': 'WEB'
            },
            data:{
                user_id: user_id,
            },
            success: function(response){
                if(isDevelopment) {
                    console.log(response);
                }
                if(response.message == 'success_logout') {
                    window.location.href = '/';
                }
            },
            error: function(err){
                if(isDevelopment) {
                    console.log(err);
                }
                alert('Some error occured !!');
            }
        });
    }
}

function rightButtonClicked(box,widthOfCard,event) {
    console.log('right clicked');
    const conent = document.querySelector('#' + box);
    var scrollvalue = conent.scrollWidth - conent.offsetWidth;
    if(conent.scrollLeft >= scrollvalue){
        conent.scrollLeft = -scrollvalue;
    } else {
        conent.scrollLeft += conent.offsetWidth;
    }
    event.preventDefault();
}

//toggle Sidebar
function toggleSideBar() {
    if(document.getElementsByClassName('blurbackground')[0].classList.contains('activeblurbackground')) {
        document.getElementsByClassName('blurbackground')[0].classList.remove('activeblurbackground')
    } else {
        document.getElementsByClassName('blurbackground')[0].classList.add('activeblurbackground')
    }
    if(document.getElementsByClassName('sidebar')[0].classList.contains('active_side_bar')) {
        document.getElementsByClassName('sidebar')[0].classList.remove('active_side_bar')
    } else {
        document.getElementsByClassName('sidebar')[0].classList.add('active_side_bar')
    }
}

//select image
function selectImage() {
    document.getElementById('profileImageInput').click();
}

//select image
function selectImage1() {
    document.getElementById('profileImageInput1').click();
}

//Onclick select gender
document.querySelectorAll('.gcards').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        var inside_selected_list = document.getElementsByClassName('selected-gcard')[0];
        if(inside_selected_list) {
            inside_selected_list.classList.remove('selected-gcard');
        }
        item.classList.add('selected-gcard');
    });
});

//remove image
function removeImage() {
    if(confirm('Do you want to delete it?') == true){
        document.getElementById('load').style.visibility="visible";
        document.getElementById('profileImageInput').value='';
        var path = document.getElementById('profileImageData').getAttribute('src');
        if(path != '/images/local/addImage.png') {
            $.ajax({
                url : '/admin/common/deletePhoto',
                dataType: "json",
                type: "POST",
                data: {
                    path:path
                },
                success: function(response){
                    document.getElementById('profileImageData').setAttribute('src','/images/local/addImage.png');
                    document.getElementById('delete-icon').style.display = 'none';
                    document.getElementById('load').style.visibility="hidden";
                },
                error: function(err){
                    if(isDevelopment) {
                        console.log(err);
                    }
                    if(document.getElementById('success-alert')) {
                        document.getElementById('success-alert').classList.add('alert-danger');
                        document.getElementById('alertMessage').innerHTML = 'Some error occurred';
                        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                            $("#success-alert").slideUp(500);
                        });
                    }
                }
            });
        }
    }
}

//like dislike
function likeDislike(blog_id) {
    var liked = parseInt(document.getElementById(`icon_update_${blog_id}`).getAttribute('data-liked'));
    var totalLikes = parseInt(document.getElementById(`total_likes_${blog_id}`).innerHTML);
    var array = document.cookie.split(';');
    var counter = 0;
    var index = 0;
    var userIndex = 0;
    for(var i=0;i<array.length;i++) {
        if(array[i].includes('currentUserToken=')){
            counter++;
            index = i;
        }
        if(array[i].includes('user_id=')){
            counter++;
            userIndex = i;
        }
    }
    if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
        var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
        var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
    } else {
        var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
        var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
    }
    $.ajax({
        url :liked == 1 ?`/api/blogs/deleteLikeComment` : `/api/blogs/likeEachBlog`,
        dataType: "json",
        type: "POST",
        headers: {
            'token':token ? token : 'testing',
            'platform': 'WEB'
        },
        data:{
            id: blog_id,
            user_id: user_id
        },
        success: function(response){
            if(isDevelopment) {
                console.log(response);
            }
            if(response.message == 'success') {
                // location.reload();
                if(liked == 0) {
                    document.getElementById(`icon_update_${blog_id}`).style.color = 'var(--highlight)';
                    document.getElementById(`icon_to_update_${blog_id}`).setAttribute('data-icon','bxs:like');
                    document.getElementById(`total_likes_${blog_id}`).innerHTML = parseInt(totalLikes) + 1;
                    document.getElementById(`icon_update_${blog_id}`).setAttribute('data-liked',1);
                } else {
                    document.getElementById(`icon_update_${blog_id}`).style.color = 'var(--sub-text)';
                    document.getElementById(`icon_to_update_${blog_id}`).setAttribute('data-icon','bx:like');
                    document.getElementById(`total_likes_${blog_id}`).innerHTML = parseInt(totalLikes) - 1;
                    document.getElementById(`icon_update_${blog_id}`).setAttribute('data-liked',0);
                }
            }
        },
        error: function(err){
            if(isDevelopment) {
                console.log(err);
            }
            alert('Some error occured !!');
        }
    });
}

//Delete blog
function addMessage() {
    var id = document.getElementById('commentContent').getAttribute('data-commentId');
    var array = document.cookie.split(';');
    var counter = 0;
    var index = 0;
    var userIndex = 0;
    for(var i=0;i<array.length;i++) {
        if(array[i].includes('currentUserToken=')){
            counter++;
            index = i;
        }
        if(array[i].includes('user_id=')){
            counter++;
            userIndex = i;
        }
    }
    if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
        var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
        var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
    } else {
        var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
        var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
    }
    var message = document.getElementById('message').value;
    if(message.trim().length != 0){
      $.ajax({
            url : '/api/blogs/commentEachBlog',
            dataType: "json",
            type: "POST",
            headers: {
                'token':token ? token : 'testing',
                'platform': 'WEB'
            },
            data: {
                id:id,
                user_id:user_id,
                message:message,
            },
            success: function(response){
              location.reload();
            },
            error: function(err){
                if(isDevelopment) {
                    console.log(err);
                }
                alert('Some error occured !!');
            }
      });
    } else {
        alert('Please enter a message first');
    }
  }

//more blogs
function getMoreBlogComments() {
    commentoffset = commentoffset + 20;
    var id = document.getElementById('commentContent').getAttribute('data-commentId');
    var totalComments = document.getElementById('commentContent').getAttribute('data-totalComments');
    if(totalComments > document.getElementsByClassName('messageCard').length) {
        getComments(id,commentoffset);
    }
}

//blog comments
function getComments(id,comentOffset) {
    var commentModal = new bootstrap.Modal(document.getElementById('commentModal'));
    var element = document.getElementById('login_button_topbar');
        var element2 = document.getElementById('login_button');
        if(element.style.display == "block" || element2.style.display =="block" || element.style.display == "" || element2.style.display =="") {
            alert('Please login first');
        } else {
            if(comentOffset == 0){
                commentoffset = 0;
                document.getElementById('commentContent').setAttribute('data-commentId',id);
                document.getElementById('commentContent').innerHTML = '';
                document.getElementById('load').style.visibility="visible";
            }
            var array = document.cookie.split(';');
            var counter = 0;
            var index = 0;
            var userIndex = 0;
            for(var i=0;i<array.length;i++) {
                if(array[i].includes('currentUserToken=')){
                    counter++;
                    index = i;
                }
                if(array[i].includes('user_id=')){
                    counter++;
                    userIndex = i;
                }
            }
            if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
                var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
                var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
            } else {
                var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
                var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
            }
            $.ajax({
                url : `/api/blogs/getEachBlogComments?offset=${comentOffset}&item_id=${id}`,
                dataType: "json",
                type: "GET",
                headers: {
                    'token':token ? token : 'testing',
                    'Content-Type':'application/json',
                    'platform': 'WEB'
                },
                success: function(response){
                    if(isDevelopment) {
                        console.log(response);
                    }
                    for(var i =0;i<response.comments.length;i++) {
                        $('#commentContent').append('<div class="messageCard"><div class="profilePhoto"><img src="'+ response.comments[i].profile_image +'" alt=""></div><div class="message"><h6>'+ response.comments[i].name +'</h6><p>'+ response.comments[i].message +'</p><p>'+ response.comments[i].created_at.split('T')[0] +'</p></div></div>');
                    }
                    if(comentOffset == 0) {
                        commentModal.toggle();
                        document.getElementById('commentContent').setAttribute('data-totalComments',response.totalComments);
                    }
                    document.getElementById('load').style.visibility="hidden";
                },
                error: function(err){
                    if(isDevelopment) {
                        console.log(err);
                    }
                    alert('Some error occured !!');
                }
            });
        }
}

//Copy to Clipboard
function copyToClipboard(value) {
    var copyText = value;
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Copied the link: " + copyText);
    }).catch((err) => {
        console.log(err);
    });
    
  }

  //Send notifications
  function generateShareLink(item_id,type,link,share_url){
    var shareUrl = share_url != 'null' ? share_url : '';
    if(shareUrl.length != 0) {
        if(isDevelopment) {
            console.log(shareUrl);
        }
        copyToClipboard(shareUrl);
    } else {
        var sendingNotification = new bootstrap.Modal(document.getElementById('sendingNotification'));
        sendingNotification.toggle();
        $.ajax({
            url : '/api/generateShareLink',
            dataType: "json",
            type: "POST",
            data: {
                link:'http://healfit.in' + link,
                item_id:item_id,
                type:type,
            },
            success: function(response){
                if(isDevelopment) {
                    console.log(response);
                }
                if(response.message == 'success'){
                    console.log('Share link generated');
                    copyToClipboard(response.shareLink);
                } else {
                    console.log('Some error occured');
                }
                setTimeout(() => {
                    sendingNotification.toggle();
                },1000);
            },
            error: function(err){
                console.log(err);
                alert('Some error occured !!');
                setTimeout(() => {
                    sendingNotification.toggle();
                },1000);
            }
    });
    }
}

//remove image
function removeImage1() {
    if(confirm('Do you want to delete it?') == true){
        document.getElementById('load').style.visibility="visible";
        document.getElementById('profileImageInput1').value='';
        var path = document.getElementById('profileImageData1').getAttribute('src');
        if(path != '/images/local/addImage.png') {
            $.ajax({
                url : '/admin/common/deletePhoto',
                dataType: "json",
                type: "POST",
                data: {
                    path:path
                },
                success: function(response){
                    document.getElementById('profileImageData1').setAttribute('src','/images/local/addImage.png');
                    document.getElementById('delete-icon1').style.display = 'none';
                    document.getElementById('load').style.visibility="hidden";
                },
                error: function(err){
                    if(isDevelopment) {
                    console.log(err);
                }
                    if(document.getElementById('success-alert')) {
                        document.getElementById('success-alert').classList.add('alert-danger');
                        document.getElementById('alertMessage').innerHTML = 'Some error occurred';
                        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                            $("#success-alert").slideUp(500);
                        });
                    }
                }
            });
        }
    }
}

//save data
function saveData(event) {
    event.preventDefault();
    var array = document.cookie.split(';');
    var counter = 0;
    var index = 0;
    var userIndex = 0;
    for(var i=0;i<array.length;i++) {
        if(array[i].includes('currentUserToken=')){
            counter++;
            index = i;
        }
        if(array[i].includes('user_id=')){
            counter++;
            userIndex = i;
        }
    }
    if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
        var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
        var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
    } else {
        var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
        var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
    }
    var name = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    if(document.getElementsByClassName('selected-gcard')[0]) {
        var gender = document.getElementsByClassName('selected-gcard')[0].getAttribute('data-gvalue');
    } else {
        var gender = '';
    }
    var age = document.getElementById('age').value;
    var weight = document.getElementById('weight').value;
    var target_weight = document.getElementById('target_weight').value;
    var height = `${document.getElementById('ft').value}.${document.getElementById('in').value}`;
    if(gender.length != 0) {
        var selectedImage = document.getElementById('profileImageData').getAttribute('src');
        if(selectedImage == '/images/local/addImage.png') {
            if(gender == '1'){
                selectImage = '/images/local/male.png';
            } else if(gender == '2'){
                selectImage = '/images/local/female.png';
            } else if(gender == '3'){
                selectImage = '/images/local/others.png';
            } else {
                selectImage = '/images/local/male.png';
            }
        }
        // if(selectedImage != '/images/local/addImage.png') {
            $.ajax({
                url : `/api/updateData`,
                dataType: "json",
                type: "POST",
                headers: {
                    'token':token ? token : 'testing',
                    'platform': 'WEB'
                },
                data: {
                    name: name,
                    email: email,
                    gender: gender,
                    age: age,
                    weight: weight,
                    target_weight: target_weight.length != 0 ? target_weight : 0,
                    profile_image: selectedImage,
                    height: height,
                    user_id: user_id,
                },
                success: function(response){
                    setTimeout(() => {
                        location.reload();
                    },1000);
                },
                error: function(err){
                    if(isDevelopment) {
                    console.log(err);
                }
                }
            });
    //   } else {
    //     alert('Select a profile image');
    //   }
    } else {
        alert('Select a gender');
    }
}

//save data
function saveData1(event) {
    event.preventDefault();
    var array = document.cookie.split(';');
    var counter = 0;
    var index = 0;
    var userIndex = 0;
    for(var i=0;i<array.length;i++) {
        if(array[i].includes('currentUserToken=')){
            counter++;
            index = i;
        }
        if(array[i].includes('user_id=')){
            counter++;
            userIndex = i;
        }
    }
    if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
        var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
        var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
    } else {
        var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
        var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
    }
    var name = document.getElementById('fullname1').value;
    var email = document.getElementById('email1').value;
    if(document.getElementsByClassName('selected-gcard')[0]) {
        var gender = document.getElementsByClassName('selected-gcard')[0].getAttribute('data-gvalue');
    } else {
        var gender = '';
    }
    var age = document.getElementById('age1').value;
    var weight = document.getElementById('weight1').value;
    var target_weight = document.getElementById('target_weight1').value;
    var userId = document.getElementById('user_values').getAttribute('data-userId');
    var height = `${document.getElementById('ft1').value}.${document.getElementById('in1').value}`;
    if(gender.length != 0) {
        var selectedImage = document.getElementById('profileImageData1').getAttribute('src');
        // if(selectedImage != '/images/local/addImage.png') {
            if(selectedImage == '/images/local/addImage.png') {
                if(gender == '1'){
                    selectImage = '/images/local/male.png';
                } else if(gender == '2'){
                    selectImage = '/images/local/female.png';
                } else if(gender == '3'){
                    selectImage = '/images/local/others.png';
                } else {
                    selectImage = '/images/local/male.png';
                }
            }
            $.ajax({
                url : `/api/updateData`,
                dataType: "json",
                type: "POST",
                headers: {
                    'token':token ? token : 'testing',
                    'platform': 'WEB'
                },
                data: {
                    name: name,
                    email: email,
                    gender: gender,
                    age: age,
                    weight: weight,
                    target_weight: target_weight.length != 0 ? target_weight : 0,
                    profile_image: selectedImage,
                    height: height,
                    user_id: user_id,
                },
                success: function(response){
                    setTimeout(() => {
                        location.reload();
                    },1000);
                },
                error: function(err){
                    if(isDevelopment) {
                    console.log(err);
                }
                }
            });
    //   } else {
    //     alert('Select a profile image');
    //   }
    } else {
        alert('Select a gender');
    }
}

//save data
function saveDataApperal(event) {
    event.preventDefault();
    var array = document.cookie.split(';');
    var counter = 0;
    var index = 0;
    var userIndex = 0;
    for(var i=0;i<array.length;i++) {
        if(array[i].includes('currentUserToken=')){
            counter++;
            index = i;
        }
        if(array[i].includes('user_id=')){
            counter++;
            userIndex = i;
        }
    }
    if(decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1]) {
        var token = decodeURIComponent(document.cookie).split(';')[index].split('currentUserToken=')[1];
        var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
    } else {
        var token = document.cookie.split(';')[index].split('currentUserToken=')[1];
        var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
    }
    var name = document.getElementById('fullname1').value;
    var email = document.getElementById('email1').value;
    if(document.getElementsByClassName('selected-gcard')[0]) {
        var gender = document.getElementsByClassName('selected-gcard')[0].getAttribute('data-gvalue');
    } else {
        var gender = '';
    }
    if(gender.length != 0) {
        var selectedImage = document.getElementById('profileImageData1').getAttribute('src');
        // if(selectedImage != '/images/local/addImage.png') {
            if(selectedImage == '/images/local/addImage.png') {
                if(gender == '1'){
                    selectImage = '/images/local/male.png';
                } else if(gender == '2'){
                    selectImage = '/images/local/female.png';
                } else if(gender == '3'){
                    selectImage = '/images/local/others.png';
                } else {
                    selectImage = '/images/local/male.png';
                }
            }
            $.ajax({
                url : `${baseUrl}api/updateApperalData`,
                dataType: "json",
                type: "POST",
                headers: {
                    'token':token ? token : 'testing',
                    'platform': 'WEB'
                },
                data: {
                    name: name,
                    email: email,
                    gender: gender,
                    profile_image: selectedImage,
                    user_id: user_id,
                },
                success: function(response){
                    setTimeout(() => {
                        location.reload();
                    },1000);
                },
                error: function(err){
                    if(isDevelopment) {
                    console.log(err);
                }
                }
            });
    //   } else {
    //     alert('Select a profile image');
    //   }
    } else {
        alert('Select a gender');
    }
}


  //Upload image
  function uploadImages() {
    document.getElementById('load').style.visibility="visible";
    var fileForm = new FormData();
    var image = document.getElementById('profileImageInput').files[0];
    fileForm.append('picture',image);
        $.ajax({
            url : "/api/saveUserOrderImage",
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data : fileForm,
            success: function(response){
                if(isDevelopment) {
                    console.log(response);
                }
                document.getElementById('profileImageData').setAttribute('src',response.path);
                document.getElementById('delete-icon').style.display = 'flex';
                document.getElementById('load').style.visibility="hidden";
            },
            error: function(err){
                if(document.getElementById('success-alert')) {
                        document.getElementById('success-alert').classList.add('alert-danger');
                        document.getElementById('alertMessage').innerHTML = 'Some error occurred.';
                        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                            $("#success-alert").slideUp(500);
                        });
                    }
            }
        });
  }

  //Upload image
  function uploadImages1() {
    document.getElementById('load').style.visibility="visible";
    var fileForm = new FormData();
    var image = document.getElementById('profileImageInput1').files[0];
    fileForm.append('picture',image);
        $.ajax({
            url : "/api/saveUserOrderImage",
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data : fileForm,
            success: function(response){
                if(isDevelopment) {
                    console.log(response);
                }
                document.getElementById('profileImageData1').setAttribute('src',response.path);
                document.getElementById('delete-icon1').style.display = 'flex';
                document.getElementById('load').style.visibility="hidden";
            },
            error: function(err){
                if(document.getElementById('success-alert')) {
                        document.getElementById('success-alert').classList.add('alert-danger');
                        document.getElementById('alertMessage').innerHTML = 'Some error occurred.';
                        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                            $("#success-alert").slideUp(500);
                        });
                    }
            }
        });
  }


//alert(document.cookie);

  //genrate random token
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}


function setHomeCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    setHomeInitialData(cvalue);
  }
  
  function getHomeCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  async function checkHomeCookie() {
    let user = getHomeCookie("currentUserToken");
    // alert(user);
    if (user != "") {
        setHomeInitialData(user);
    } else {
        var token = await makeid(14);
        setHomeCookie("currentUserToken", token, 365);
    }
  }


  function setHomeInitialData(token) {
    loginModal = new bootstrap.Modal(document.getElementById('login'));
    state = history.state || {};
    reloadCount = state.reloadCount || 0;
    if (performance.navigation.type === 1) { // Reload
        state.reloadCount = ++reloadCount;
        history.replaceState(state, null, document.URL);
    } else if (reloadCount) {
        delete state.reloadCount;
        reloadCount = 0;
        history.replaceState(state, null, document.URL);
    }
    $.ajax({
        url : `/api/createUser/`,
        dataType: "json",
        type: "GET",
        headers: {
            'token':token ? token : 'testing',
            'Content-Type':'application/json',
            'platform': 'WEB'
        },
        success: function(response){
          if(isDevelopment) {
                console.log(response);
            }
        //   console.log(window.location.pathname);
            document.cookie = `user_id=${response.user[0].id}`;
          if(response.user.length != 0){
            user = response.user[0];
            if(response.user[0].logged_in == 1){
                if(response.user[0].status != 'BLOCKED'){
                    document.getElementById('phone_number_input').style.display="none";
                    document.getElementById('otp_verification').style.display="none";
                    document.getElementById('user_values').style.display="block";
                    document.getElementById('login_button_topbar').style.display="none";
                    document.getElementById('login_button').style.display="none";
                    document.getElementById('profile').style.display="flex";
                    if(response.user[0].profile_image != null && response.user[0].profile_image.length != 0){
                        document.getElementById('loggedInProfileImage').setAttribute('src',response.user[0].profile_image);
                    } else {
                        document.getElementById('loggedInProfileImage').setAttribute('src','/images/local/addImage.png');
                    }
                    document.getElementById('fullname1').value = response.user[0].name;
                    document.getElementById('email1').value = response.user[0].email;
                    if(response.user[0].gender.length != 0) {
                        var gender = response.user[0].gender == 'MALE' ? '1' : response.user[0].gender == 'FEMALE' ? '2' : '3';
                        var inside_selected_list = document.getElementsByClassName('selected-gcard')[0];
                        if(inside_selected_list) {
                            inside_selected_list.classList.remove('selected-gcard');
                        }
                        document.querySelectorAll('.gcards1').forEach(item => {
                            if(item.getAttribute('data-gvalue') == gender) {
                                item.classList.add('selected-gcard');
                            }
                        });
                    }
                    //Onclick select gender
                    document.querySelectorAll('.gcards1').forEach(item => {
                        item.addEventListener('click', event => {
                            event.preventDefault();
                            var inside_selected_list = document.getElementsByClassName('selected-gcard')[0];
                            if(inside_selected_list) {
                                inside_selected_list.classList.remove('selected-gcard');
                            }
                            item.classList.add('selected-gcard');
                        });
                    });

                    document.getElementById('age1').value = response.user[0].age != '0' ? response.user[0].age : '';
                    document.getElementById('weight1').value = response.user[0].weight != '0' ? response.user[0].weight :'';
                    document.getElementById('target_weight1').value = response.user[0].target_weight != '0' ? response.user[0].target_weight : '';
                    document.getElementById('ft1').value = response.user[0].height.toString().split('.')[0] != '0' ? response.user[0].height.toString().split('.')[0] : '';
                    document.getElementById('in1').value = response.user[0].height.toString().split('.')[1] != '0' ? response.user[0].height.toString().split('.')[1] : '';
                    if(response.user[0].profile_image != null && response.user[0].profile_image.length != 0){
                        document.getElementById('profileImageData1').setAttribute('src',response.user[0].profile_image);
                    } else {
                        document.getElementById('profileImageData1').setAttribute('src','/images/local/addImage.png');
                    }
                    document.getElementById('delete-icon1').style.display = 'flex';
                    if(document.getElementById('beforeLoginHeroSection')) {
                        var heightInCm = parseFloat(response.user[0].height) * 30.48;
                        var weight = parseFloat(response.user[0].weight);
                        var age = parseInt(response.user[0].age);
                        var s = response.user[0].gender == 'MALE' ? 5 : response.user[0].gender == 'FEMALE' ? -161 : 5;
                        var calories= ((10.0 * weight) + (6.25 * heightInCm) - (5.0 * age) + s);
                        document.getElementById('calorieCounterValue').setAttribute('data-calorieBurned', Math.ceil(calories));
                        document.getElementById('beforeLoginHeroSection').style.display = 'none';
                        document.getElementById('afterLoginHeroSection').style.display = 'flex';
                    }
                    document.getElementById('load').style.visibility="hidden";
                } else {
                    document.getElementById('load').style.visibility="hidden";
                    alert('You are blocked by admin , so you can\'t login with this number!!');
                }
            } else {
                // if(response.user[0].phoneNumber == '+910000000000'){
                //     document.getElementById('load').style.visibility="hidden";
                //     if(window.location.pathname == '/' && reloadCount <= 1){
                //         setTimeout(() => {
                //             loginModal.toggle();
                //         },1000);
                //     }
                // } else {
                // }

                    if(response.user[0].is_otp_verified == 1){
                        document.getElementById('load').style.visibility="hidden";
                        document.getElementById('phone_number_input').style.display="none";
                        document.getElementById('otp_verification').style.display="none";
                        document.getElementById('user_values').style.display="block";
                        if(response.user[0].name == null || response.user[0].age == 0){
                                document.getElementById('fullname').value = response.user[0].name;
                                document.getElementById('email').value = response.user[0].email;
                                if(response.user[0].gender.length != 0) {
                                    var gender = response.user[0].gender == 'MALE' ? '1' : response.user[0].gender == 'FEMALE' ? '2' : '3';
                                    var inside_selected_list = document.getElementsByClassName('selected-gcard')[0];
                                    if(inside_selected_list) {
                                        inside_selected_list.classList.remove('selected-gcard');
                                    }
                                    document.querySelectorAll('.gcards').forEach(item => {
                                        if(item.getAttribute('data-gvalue') == gender) {
                                            item.classList.add('selected-gcard');
                                        }
                                    });
                                }
                                document.getElementById('age').value = response.user[0].age != '0' ? response.user[0].age : '';
                                document.getElementById('weight').value = response.user[0].weight != '0' ? response.user[0].weight :'';
                                document.getElementById('target_weight').value = response.user[0].target_weight != '0' ? response.user[0].target_weight : '';
                                document.getElementById('ft').value = response.user[0].height.toString().split('.')[0] != '0' ? response.user[0].height.toString().split('.')[0] : '';
                                document.getElementById('in').value = response.user[0].height.toString().split('.')[1] != '0' ? response.user[0].height.toString().split('.')[1] : '';
                                if(response.user[0].profile_image != null && response.user[0].profile_image.length != 0){
                                    document.getElementById('profileImageData').setAttribute('src',response.user[0].profile_image);
                                } else {
                                    document.getElementById('profileImageData').setAttribute('src','/images/local/addImage.png');
                                }
                            //Open name age modal 
                            if(window.location.pathname == '/' && reloadCount <= 1 && window.location.href.indexOf('?') == -1){
                                setTimeout(() => {
                                    loginModal.toggle();
                                },1000);
                            }
                        }
                    } else {
                        document.getElementById('load').style.visibility="hidden";
                        if(window.location.pathname == '/' && reloadCount <= 1 && window.location.href.indexOf('?') == -1){
                            setTimeout(() => {
                                loginModal.toggle();
                            },1000);
                        }
                    }
            }
          }
            document.getElementById('load').style.visibility="hidden";
        },
        error: function(err){
            if(isDevelopment) {
                console.log(err);
            }
            alert('Some error occured !!');
        }
    });
}