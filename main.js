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
        addUser(); 
    });

    // Function to add a user
    function addUser() {

        const user = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            age: age.value,
            city: city.value,
            role: role.value
        };

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Clear the form fields
        form.reset();

        // Call the FillTabelWithData function to refresh the table
        FillTabelWithData();
    }

    // Function to fill the table with user data
    function FillTabelWithData() {

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

        if(users.length > 0){

            // Create the delete all button
            CreateDeleteAllButon();
        }
        else {
            // Remove the delete all button
            let searchDiv = document.getElementById('searchDeleteAll');
            searchDiv.innerHTML = '';
        }
    }

    // Function to handle delete button click
    function handleDelete(button) {
        const index = button.getAttribute('data-index');
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        FillTabelWithData();
    }

    // Function to handle edit button click
    function handleEdit(button) {
        const index = button.getAttribute('data-index');
        const user = users[index];
        name.value = user.name;
        email.value = user.email;
        phone.value = user.phone;
        age.value = user.age;
        city.value = user.city;
        role.value = user.role;

        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        FillTabelWithData();
    }

    function CreateDeleteAllButon()
    {
        let searchDiv = document.getElementById('searchDeleteAll');

        let btnDeleteAll = document.createElement('button');
        btnDeleteAll.innerHTML = `Delete All  (${users.length}) User(s)`;
        btnDeleteAll.style.width = '100%';
        searchDiv.appendChild(btnDeleteAll);
        btnDeleteAll.addEventListener('click', () => handleDeleteAll());
    }

    function handleDeleteAll() {
        users = [];
        localStorage.setItem('users', JSON.stringify(users));
        FillTabelWithData();
    }

    FillTabelWithData();
});