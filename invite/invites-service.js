module.exports = {
    isValidName,
}

function isValidName (user){
    return Boolean(user.username)
}