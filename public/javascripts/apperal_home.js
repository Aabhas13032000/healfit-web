function apperalLogout() {
    if(confirm('Are you sure you want to logout?') == true){
        document.getElementById('load').style.visibility="visible";
        var array = document.cookie.split(';');
        var counter = 0;
        var index = 0;
        var userIndex = 0;
        for(var i=0;i<array.length;i++) {
            if(array[i].includes('apperalUserToken=')){
                counter++;
                index = i;
            }
            if(array[i].includes('user_id=')){
                counter++;
                userIndex = i;
            }
        }
        if(decodeURIComponent(document.cookie).split(';')[index].split('apperalUserToken=')[1]) {
            var token = decodeURIComponent(document.cookie).split(';')[index].split('apperalUserToken=')[1];
            var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
        } else {
            var token = document.cookie.split(';')[index].split('apperalUserToken=')[1];
            var user_id = document.cookie.split(';')[userIndex].split('user_id=')[1];
        }
        $.ajax({
            url : `${baseUrl}api/logout`,
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
                    location.reload();
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

//save data
function apperalSaveData(event) {
    event.preventDefault();
    var array = document.cookie.split(';');
    var counter = 0;
    var index = 0;
    var userIndex = 0;
    for(var i=0;i<array.length;i++) {
        if(array[i].includes('apperalUserToken=')){
            counter++;
            index = i;
        }
        if(array[i].includes('user_id=')){
            counter++;
            userIndex = i;
        }
    }
    if(decodeURIComponent(document.cookie).split(';')[index].split('apperalUserToken=')[1]) {
        var token = decodeURIComponent(document.cookie).split(';')[index].split('apperalUserToken=')[1];
        var user_id = decodeURIComponent(document.cookie).split(';')[userIndex].split('user_id=')[1];
    } else {
        var token = document.cookie.split(';')[index].split('apperalUserToken=')[1];
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
                url : `${baseUrl}api/updateData`,
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
                    age: 0,
                    weight: 0,
                    target_weight: 0,
                    profile_image: selectedImage,
                    height: 0,
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
  function apperalUploadImages() {
    document.getElementById('load').style.visibility="visible";
    var fileForm = new FormData();
    var image = document.getElementById('profileImageInput').files[0];
    fileForm.append('picture',image);
        $.ajax({
            url : `${baseUrl}api/saveUserOrderImage`,
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
  function apperalUploadImages1() {
    document.getElementById('load').style.visibility="visible";
    var fileForm = new FormData();
    var image = document.getElementById('profileImageInput1').files[0];
    fileForm.append('picture',image);
        $.ajax({
            url : `${baseUrl}api/saveUserOrderImage`,
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

//remove image
function apperalRemoveImage() {
    if(confirm('Do you want to delete it?') == true){
        document.getElementById('load').style.visibility="visible";
        document.getElementById('profileImageInput').value='';
        var path = document.getElementById('profileImageData').getAttribute('src');
        if(path != '/images/local/addImage.png') {
            $.ajax({
                url : `${baseUrl}admin/common/deletePhoto`,
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

//remove image
function apperalRemoveImage1() {
    if(confirm('Do you want to delete it?') == true){
        document.getElementById('load').style.visibility="visible";
        document.getElementById('profileImageInput1').value='';
        var path = document.getElementById('profileImageData1').getAttribute('src');
        if(path != '/images/local/addImage.png') {
            $.ajax({
                url : `${baseUrl}admin/common/deletePhoto`,
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


function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    setInitialData(cvalue);
  }
  
  function getCookie(cname) {
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
  
  async function checkCookie() {
    let user = getCookie("apperalUserToken");
    // alert(user);
    if (user != "") {
        setInitialData(user);
    } else {
        var token = await makeid(14);
        setCookie("apperalUserToken", token, 365);
    }
  }

  function setInitialData(token) {
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
        url : `${baseUrl}api/createUser/`,
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
            document.getElementById('load').style.visibility="hidden";
        }
    });
}