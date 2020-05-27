module.exports = {
    isValidEvent,
    isValidItem
}

function isValidEvent(event){
    return Boolean(event.event_name && event.date && event.time && event.location);
}

function isValidItem(item){
    return Boolean(item.person && item.item && item.ammount);
}