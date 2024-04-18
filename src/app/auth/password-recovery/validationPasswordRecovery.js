

const validationPasswordRecovery = (dataPasswordRecovery) => {
    const errors = {};
    const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!patternPassword.test(dataPasswordRecovery.password)){
        errors.password= "The new password must have at least one letter, one number and one special character";
    }
    if(dataPasswordRecovery.password.length < 8){
        errors.password = 'Password cannot be less than 8 characters';
    }
    if(dataPasswordRecovery.password.length > 20){
        errors.password = 'Password cannot be more than 20 characters';
    }
    if(dataPasswordRecovery.confirmPassword !== dataPasswordRecovery.password ){
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
}

export default validationPasswordRecovery;