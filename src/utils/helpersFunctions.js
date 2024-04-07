const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/

function ValidateEmail(email){
    return regexEmail.test(email);
}

function ValidatePassword(password){
    return regexPassword.test(password);
}

function ValidateTitle(title){
    if(title.length >= 4 && title.length <= 20){
        return true;
    }else{
        return false;
    }
}

function ValidateDescription(description){
    if(description.length >= 4 && description.length <= 200){
        return true;
    }else{
        return false;
    }
}

function ValidateCategory(category){
    if(category !== undefined){
        return true;
    }else{
        return false;
    }
}

module.exports={ValidateEmail, ValidatePassword, ValidateTitle, ValidateDescription, ValidateCategory};