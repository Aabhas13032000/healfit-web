  //Delete image
  function deleteCurrentGalleryImage(id,input_id) {
    if(document.getElementById('success-alert')) {
        if(document.getElementById('success-alert').classList.contains('alert-success')) {
          document.getElementById('success-alert').classList.remove('alert-success');
        }
        if(document.getElementById('success-alert').classList.contains('alert-danger')) {
          document.getElementById('success-alert').classList.remove('alert-danger');
        }
        if(document.getElementById('success-alert').classList.contains('alert-warning')) {
          document.getElementById('success-alert').classList.remove('alert-warning');
        }
      }
    var path = document.getElementById(input_id).value;
    if(confirm('Do you want to delete it?') == true){
        if(path != '/images/extra/nopreview.jpeg') {
            $.ajax({
                url : '/admin/common/deletePhoto',
                dataType: "json",
                type: "POST",
                data: {
                    path:path
                },
                success: function(response){
                    if(document.getElementById('success-alert')) {
                        document.getElementById('success-alert').classList.add('alert-success');
                        document.getElementById('alertMessage').innerHTML = 'Removed successfully';
                        $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                            $("#success-alert").slideUp(500);
                        });
                    }
                    document.getElementById(id).remove();
                },
                error: function(err){
                    console.log(err);
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


  //Delete Current gallery images
  function deleteEditCurrentGalleryImage(id,path) {
    if(document.getElementById('success-alert')) {
      if(document.getElementById('success-alert').classList.contains('alert-success')) {
        document.getElementById('success-alert').classList.remove('alert-success');
      }
      if(document.getElementById('success-alert').classList.contains('alert-danger')) {
        document.getElementById('success-alert').classList.remove('alert-danger');
      }
      if(document.getElementById('success-alert').classList.contains('alert-warning')) {
        document.getElementById('success-alert').classList.remove('alert-warning');
      }
    }
    if(confirm('Do you want to delete it?') == true){
        if(path != '/images/extra/nopreview.jpeg') {
            $.ajax({
                url : `/admin/common/deleteEditPhoto`,
                dataType: "json",
                type: "POST",
                data: {
                    path:path
                },
                success: function(response){
                  if(document.getElementById('success-alert')) {
                    document.getElementById('success-alert').classList.add('alert-success');
                    document.getElementById('alertMessage').innerHTML = 'Deleted successfully';
                    $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                      $("#success-alert").slideUp(500);
                    });
                  }
                    document.getElementById(id).remove();
                },
                error: function(err){
                    console.log(err);
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
    } 
}

//Block / Unblock
function toggleBlocked(id,url) {
    $.ajax({
        url : url,
        dataType: "json",
        type: "POST",
        data:{
            id:id
        },
        success: function(response){
            if(document.getElementById('success-alert')) {
                document.getElementById('success-alert').classList.add('alert-success');
                document.getElementById('alertMessage').innerHTML = 'Status changed successfully';
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-alert").slideUp(500);
                });
            }
            setTimeout(() => {
                location.reload();
            },1000);
        },
        error: function(err){
            console.log(err);
            if(document.getElementById('success-alert')) {
                document.getElementById('success-alert').classList.add('alert-danger');
                document.getElementById('alertMessage').innerHTML = 'Some error occurred';
                $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
                    $("#success-alert").slideUp(500);
                });
            }
            // alert('Some error occured !!');
        }
    });   
}

//Remove html
function removeHTML(str){ 
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
}

  //Send notifications
  function sendNotification(title,item_id,type,description,image,link,share_url){
    if(type == 'program') {
        var desc = description;
    } else {
        var d = document.getElementById(`ckeditordescriptionvalue${item_id}`).value;
        var desc = removeHTML(d).replace(/(\r\n|\n|\r)/gm, "").replaceAll(`'`,``).slice(0,50);
    }
    console.log(desc);
    var sendingNotification = new bootstrap.Modal(document.getElementById('sendingNotification'));
    sendingNotification.toggle();
    var send_image;
    if(image.length !=0){
        send_image = `https://healfit.in${image}`;
    } else {
        send_image = 'https://healfit.in/images/local/logo.png';
    }
    var shareUrl = share_url != 'null' ? share_url : '';
    send_image = send_image.replace(' ','%20');
    $.ajax({
        url : '/admin/sendNotification',
        dataType: "json",
        type: "POST",
        data: {
            title:title,
            share_url:shareUrl,
            link:'http://healfit.in' + link,
            item_id:item_id,
            type:type,
            image:send_image,
            description:desc,
        },
        success: function(response){
            console.log('done');
            if(response.message == 'success'){
                alert('notification sent');
            } else {
                alert('Some error occured');
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