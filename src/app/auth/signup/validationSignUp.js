
const validationSignUp = (dataSignUp) => {
    const errors = {};
    const patternName = /^[A-Za-z\s]+$/;
    const patternEmail = /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/
    const patternPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if(!patternName.test(dataSignUp.fullName)){
        errors.fullName = 'The name cannot contain numbers or symbols';
    }
    if(!patternEmail.test(dataSignUp.email)){
        errors.email = 'The email is invalid';
    }
    if(!patternPassword.test(dataSignUp.password)) {
        errors.password = 'The password must have at least one letter, one number and one special character';
    }
    if(dataSignUp.password.length < 8){
        errors.password = 'Password cannot be less than 8 characters';
    }
    if(dataSignUp.password.length > 20){
        errors.password = 'Password cannot be more than 20 characters';
    }
    if(dataSignUp.confirmPassword !== dataSignUp.password ){
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors
}

export default validationSignUp;