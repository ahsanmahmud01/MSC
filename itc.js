document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const userMessage = userInput.value.trim();
            if (userMessage !== '') {
                appendUserMessage(userMessage);
                userInput.value = '';
                respondToUser(userMessage);
            }
        }
    });

    function appendUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        setTimeout(() => {
            messageDiv.style.display = 'none'; // Hide user message after a delay
        }, 3000); // Delay for hiding user message (3 seconds)
    }

    function appendBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function respondToUser(message) {
        // Simple rule-based responses
        let botResponse;
        switch (message.toLowerCase()) {
            case 'hello':
                botResponse = "Hello! How can I assist you today?";
                break;
            case 'about':
                botResponse = "Mirpur Science College is a leading institution in science education.";
                break;
            case 'contact':
                botResponse = "You can contact us at contact@mirpursciencecollege.edu.bd.";
                break;
            default:
                botResponse = "I'm sorry, I didn't understand that. Please ask something else.";
                break;
        }
        appendBotMessage(botResponse);
    }
});
