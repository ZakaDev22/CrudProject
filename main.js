document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and input elements
    const form = document.getElementById('user-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const city = document.getElementById('city');
    const role = document.getElementById('role');

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

        // Get the existing users from localStorage or initialize an empty array
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user); // Add the new user to the array
        localStorage.setItem('users', JSON.stringify(users)); // Save the updated array to localStorage

        // Clear the form fields
        form.reset();
    }
});