function saveUsername(username){
    return {
        type: "SAVE_USERNAME",
        payload: username
    }
}

export {
    saveUsername
}