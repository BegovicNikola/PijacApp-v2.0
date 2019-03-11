$(document).ready(()=>{
    // Focus on load 
    $('#contactEmail').focus();

    // Email regex
    const emailEx = /^[\w\d\.\_\-]+\@[\w\.\-]+\.\w{2,}$/;
    const emailField = $('#contactEmail');
    const emailHelp = $('#emailHelp');
    const submitBtn = $('#submit');

    emailField.blur(() => {
		if(!emailEx.test(emailField.val())){
            emailField.addClass('border-danger');
            emailHelp.addClass('text-danger').removeClass('text-muted');
            let emailStatus = false;
            checkSubmit(emailStatus);
		}
		else{
            emailField.removeClass('border-danger');
            emailHelp.removeClass('text-danger').addClass('text-muted');
            let emailStatus = true;
            checkSubmit(emailStatus);
		}
    });
    
    const checkSubmit = emailStatus => {
        if(emailStatus){
            submitBtn.prop('disabled', false);
            submitBtn.addClass('btn-success');
        }else{
            submitBtn.prop('disabled', false);
            submitBtn.removeClass('btn-success');
        }
    }
});