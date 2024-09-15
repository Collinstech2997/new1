// Admin and Member credentials (for demo purposes)
const credentials = {
    admin: { username: 'admin', password: 'password123' },
    member: { username: 'member', password: 'member123' }
};

// Handle login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate credentials based on role
    if (credentials[role] && username === credentials[role].username && password === credentials[role].password) {
        // Successful login
        document.getElementById('loginContainer').style.display = 'none';
        if (role === 'admin') {
            document.getElementById('adminApp').style.display = 'block';
            displayMessages(); // Admins see all messages
        } else {
            document.getElementById('memberApp').style.display = 'block';
        }
    } else {
        // Invalid login
        document.getElementById('loginError').style.display = 'block';
    }
});

// Handle message submission (Member view)
document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const message = document.getElementById('userMessage').value;

    // Create a new message object (anonymously for members)
    const newMessage = {
        sender: 'Anonymous',
        text: message
    };

    // Save the message to localStorage
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    // Clear the form
    document.getElementById('userMessage').value = '';
    alert('Your message has been sent anonymously!');
});

// Handle message submission (Admin view)
document.getElementById('messageFormAdmin').addEventListener('submit', function (e) {
    e.preventDefault();

    const message = document.getElementById('userMessageAdmin').value;

    // Create a new message object with sender's name for the admin
    const newMessage = {
        sender: 'Admin',
        text: message
    };

    // Save the message to localStorage
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    // Clear the form
    document.getElementById('userMessageAdmin').value = '';

    // Update the message display
    displayMessages();
});

// Function to display all messages for the admin
function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach((message) => {
        const li = document.createElement('li');
        li.textContent = `Sender: ${message.sender} - Message: ${message.text}`;
        messageList.appendChild(li);
    });
}

// Show messages when the admin is logged in
window.onload = function () {
    if (document.getElementById('adminApp').style.display === 'block') {
        displayMessages();
    }
};
