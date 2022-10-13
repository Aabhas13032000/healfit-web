
//Onclick moving box
document.querySelectorAll('.list').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        var inside_selected_list = document.getElementsByClassName('selected')[0];
        var profile_selected = document.getElementsByClassName('selected_profile')[0];
        if(inside_selected_list) {
            inside_selected_list.classList.remove('selected');
        }
        if(profile_selected) {
            profile_selected.classList.remove('selected_profile');
        }
        toggleSideBar();
        document.getElementById('loaded_page').setAttribute('src',item.getAttribute('data-url'));
        item.classList.add('selected');
    });
});

function profileClicked() {
    var inside_selected_list = document.getElementsByClassName('selected')[0];
    if(inside_selected_list) {
        inside_selected_list.classList.remove('selected');
    }
    toggleSideBar();
    document.getElementById('loaded_page').setAttribute('src','/admin/profile');
    document.getElementsByClassName('details')[0].classList.add('selected_profile');
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