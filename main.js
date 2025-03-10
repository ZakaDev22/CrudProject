document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and input elements
    const form = document.getElementById('user-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const city = document.getElementById('city');
    const role = document.getElementById('role');

    // Initialize the users list from localStorage or as an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Add an event listener to the form's submit event
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        addUser(); // Call the addUser function to handle the form data
    });

    // Function to add a user
    function addUser() {
        // Create a user object with the form data
        const user = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            age: age.value,
            city: city.value,
            role: role.value
        };

        // Add the new user to the users array
        users.push(user);
        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Clear the form fields
        form.reset();

        console.log('User added successfully');
        console.log(users);
    }

    // Example of another function that uses the users list
    function displayUsers() {
        console.log('Displaying users:', users);
        // Code to display users in the UI
    }

    // Call displayUsers to show the users when the page loads
    displayUsers();
});