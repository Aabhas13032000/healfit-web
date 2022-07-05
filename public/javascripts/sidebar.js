
//Onclick moving box
document.querySelectorAll('.list').forEach(item => {
    item.addEventListener('click', event => {
        var inside_selected_list = document.getElementsByClassName('selected')[0];
        var profile_selected = document.getElementsByClassName('selected_profile')[0];
        if(inside_selected_list) {
            inside_selected_list.classList.remove('selected');
        }
        if(profile_selected) {
            profile_selected.classList.remove('selected_profile');
        }
        document.getElementById('loaded_page').setAttribute('src',item.getAttribute('data-url'));
        item.classList.add('selected');
    });
});

function profileClicked() {
    var inside_selected_list = document.getElementsByClassName('selected')[0];
    if(inside_selected_list) {
        inside_selected_list.classList.remove('selected');
    }
    document.getElementById('loaded_page').setAttribute('src','/admin/profile');
    document.getElementsByClassName('details')[0].classList.add('selected_profile');
}