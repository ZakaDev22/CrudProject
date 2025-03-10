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

        // Call the FillTabelWithData function to refresh the table
        FillTabelWithData();
    }

    // Function to fill the table with user data
    function FillTabelWithData() {
        // Get a reference to the table body
        const table = document.getElementById('users-table');
        const tbody = table.querySelector('tbody');

        // Clear any existing table rows
        tbody.innerHTML = '';

        // Loop through the users list and add a table row for each user
        users.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.age}</td>
            <td>${user.city}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn-edit" data-index="${index}">Edit</button>
            </td>
            <td>
                <button class="btn-delete" data-index="${index}">Delete</button>
            </td>
            `;
            tbody.appendChild(tr);
        });

        // Add event listeners to the delete buttons
        tbody.querySelectorAll('.btn-delete').forEach(button => {
            button.addEventListener('click', () => handleDelete(button));
        });

        // Add event listeners to the edit buttons
        tbody.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', () => handleEdit(button));
        });
    }

    // Function to handle delete button click
    function handleDelete(button) {
        // Get the index of the user to delete
        const index = button.getAttribute('data-index');
        // Remove the user from the users array
        users.splice(index, 1);
        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        // Refresh the table
        FillTabelWithData();
    }

    // Function to handle edit button click
    function handleEdit(button) {
        // Get the index of the user to edit
        const index = button.getAttribute('data-index');
        // Populate the form with the user's data
        const user = users[index];
        name.value = user.name;
        email.value = user.email;
        phone.value = user.phone;
        age.value = user.age;
        city.value = user.city;
        role.value = user.role;
        // Remove the user from the users array
        users.splice(index, 1);
        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        // Refresh the table
        FillTabelWithData();
    }

    // Initial call to fill the table with data
    FillTabelWithData();
});