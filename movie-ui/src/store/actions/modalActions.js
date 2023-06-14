function toggleModal(){
    return {
        type: "TOGGLE_MODAL"
    }
}

function openModal() {
    return {
        type: "OPEN_MODAL"
    }
}

function closeModal(){
    return {
        type: "CLOSE_MODAL"
    }
}

export {
    closeModal,
    openModal,
    toggleModal
}
