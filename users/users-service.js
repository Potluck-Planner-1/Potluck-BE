module.exports = {
    isValidRegister,
    isValidLogin
}

function isValidRegister(user){
    return Boolean(user.username && user.password && typeof user.password ==='string');
}

function isValidLogin(user){
    return Boolean(user.username && user.password && typeof user.password ==='string');
}