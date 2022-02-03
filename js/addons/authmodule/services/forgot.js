function ForgotFormProcess(){
    let isOpenedStep = [
        $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="0"]').css('display') != 'none',
        $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="1"]').css('display') != 'none',
        $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="2"]').css('display') != 'none'
    ];

    var errorMess = "",
        validData = [
            /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9]{1}[-0-9\.]{1,}[0-9]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u.test($('#auth-lightbox > .module-page[data-screen="SignIn"] main .module-form form input').eq(0).val()) || /^[a-zA-Z0-9_.]{1,30}$/.test($('#auth-lightbox > .module-page[data-screen="SignIn"] main .module-form form input').eq(0).val()) || /^([+]?[0-9\s-\(\)]{3,25})*$/i.test($('#auth-lightbox > .module-page[data-screen="SignIn"] main .module-form form input').eq(0).val()),
            $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="1"] form div input').val().length === 0 || $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="1"] form div input').val().length < 4 ||  $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="1"] form div input').val().length > 4,
            /^[a-zA-Z0-9_]+$/.test($('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="2"] form div input').eq(0).val()),
            /^[a-zA-Z0-9_]+$/.test($('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="2"] form div input').eq(1).val()),
            $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="2"] form div input').eq(0).val() === $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="2"] form div input').eq(1).val()
        ],
        notEmpty = [
            $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="0"] form div input').val() !== '',
            $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="1"] form div input').val() !== '',
            $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="2"] form div input').eq(0).val() !== '',
            $('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="2"] form div input').eq(1).val() !== ''
        ];

        var isValidCode = new CodeSender('Forgot').valid($('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="1"] form div input').val());

    
    if(isOpenedStep[1]){
        if(notEmpty[1] && !validData[1] && isValidCode === 'RST_Success'){
            OpenStep('Forgot', 2);
            $('.module-page[data-screen="Forgot"] > main #reg-footer button#form-submit').html('Restore');
        }
        else{

            if(validData[1]){
                errorMess += "The entered code must have a four-digit format, or it is not entered!";
            }
            else if(isValidCode === 'Fail'){
                errorMess += "The code is entered incorrectly and check it carefully, please!";
            }

        }
    }
    else if(isOpenedStep[2]){

        if((notEmpty[2] && notEmpty[3]) && validData[5]){
            $('.module-page[data-screen="Forgot"] > main #reg-content li form div input').val('');
            $('#auth-lightbox > .close').trigger('click');
            OpenStep('Forgot', 0);

            let finishRes = alert('You have successfully restored access to your portal account. After a while, you will be logged in to the portal services, but do not forget to save the access data when logging in anywhere and make sure that only you know about them;-)');
            
            if(!finishRes){ location.reload(true); }
        }
        else{
            if(!notEmpty[2]){
                errorMess += "Password field this is required\n\n";
            }

            if(!notEmpty[3]){
                errorMess += "Confirm password field this is required\n\n";
            }

            if(!validData[5]){
                errorMess += "Passwords don't match\n\n";
            }
        }
    }
    else{
        if(notEmpty[0] && validData[0]){
            OpenStep('Forgot', 1);
            new CodeSender('Forgot').send($('.module-page[data-screen="Forgot"] main #reg-content li[data-signstep="0"] form div input').val());
        }
        else{
            if(!notEmpty[0]){
                errorMess += "Account data field is required!\n\n";
            }
            else if(!validData[0]){
                errorMess += "Input valid account data, please!(Examples: john@gmail.com, investportal2021 or +1 (012) 345-67-89)\n\n";
            }
        }
    }

    if(errorMess){
        alert(errorMess);
    }
}


const ForgotPassService = () => {
    $('.module-page[data-screen="Forgot"] > main #reg-footer button#form-submit').click(ForgotFormProcess);  
}