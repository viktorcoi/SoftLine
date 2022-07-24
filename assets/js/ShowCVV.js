$(document).ready(function() {
    
    const inputPass = $("#securitycode");
    const showPass = $(".show-cvv");
    
    inputPass.on('keyup', () => {
        inputPass.val().length > 0 ? showPass.addClass('open') : showPass.removeClass('open')
    });

    showPass.on('click', () => {
        showPass.toggleClass('show')
        showPass.hasClass('show') ? inputPass.attr('type', 'text') : inputPass.attr('type', 'password')
    });
});