export default function displayMessage(messageType, message) {
    const messageContainer = document.querySelector(".message-container");
    messageContainer.innerHTML = `<div class="notification ${messageType}">${message}</div>`
}