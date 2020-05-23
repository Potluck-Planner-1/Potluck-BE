module.exports = {
    isValidRegister,
}

function isValidRegister(user){
    return Boolean(user.username && user.password && typeof user.password ==='string');
}
