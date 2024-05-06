document.addEventListener('DOMContentLoaded', function () {
  const chatContainer = document.getElementById('chat-container');
  const userInput = document.getElementById('user-input');

  userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const userMessage = userInput.value.trim();
      if (userMessage !== '') {
        appendUserMessage(userMessage);
        userInput.value = '';
        sendToChatGPT(userMessage);
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

  async function sendToChatGPT(message) {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Updated API key
      },
      body: JSON.stringify({
        model: 'text-davinci-003', // You can use different models here
        prompt: message,
        max_tokens: 150 // Adjust max tokens as needed
      })
    });

    const data = await response.json();
    const botResponse = data.choices[0].text.trim();
    appendBotMessage(botResponse);
  }
});

let toggle = true;

document.getElementById("team-container").addEventListener("click", function() {
const teamMembers = document.querySelectorAll(".team-member");

teamMembers.forEach((member, index) => {
  if (toggle && index % 2 === 0) {
    member.style.flexDirection = "row-reverse";
  } else if (!toggle && index % 2 !== 0) {
    member.style.flexDirection = "row-reverse";
  } else {
    member.style.flexDirection = "row";
  }
});

toggle = !toggle;
});
document.addEventListener("DOMContentLoaded", function() {
const chatContainer = document.getElementById("chat-container");
const userInput = document.getElementById("user-input");

userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    const userMessage = userInput.value.trim();
    if (userMessage !== "") {
      appendMessage("user", userMessage);
      userInput.value = ""; // Clear input field

      // Simulate bot response (replace with actual bot logic)
      const botResponse = "Hello! I'm Jarvis. How can I assist you today?";
      setTimeout(function() {
        appendMessage("bot", botResponse);
      }, 500);
    }
  }
});

function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add(sender + "-message");
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to bottom
}
});
