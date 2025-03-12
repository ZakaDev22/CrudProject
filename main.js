document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and input elements
    const form = document.getElementById('user-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const city = document.getElementById('city');
    const role = document.getElementById('role');

    let users = JSON.parse(localStorage.getItem('users')) || [];

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

        form.reset();
        FillTabelWithData();
    }

    // Function to fill the table with user data
    function FillTabelWithData(Users = users) {
        const table = document.getElementById('users-table');
        const tbody = table.querySelector('tbody');

        // Clear any existing table rows
        tbody.innerHTML = '';

        // Loop through the users list and add a table row for each user
        Users.forEach((user, index) => {
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
        
        CreateOrRemoveDeleteAllButon(Users);
    }

    // Function to handle delete button click
    function handleDelete(button) {
        const index = button.getAttribute('data-index');
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        FillTabelWithData();
    }

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

        scroll({
            top: 0,
            behavior: 'smooth',
        });
    }
    
    function handleDeleteAll() {
        users = []; // Reassign to a new empty array
        localStorage.setItem('users', JSON.stringify(users));
        FillTabelWithData();
    }

    function CreateOrRemoveDeleteAllButon(Users) {

        if(Users.length == 0){
            let searchDiv = document.getElementById('searchDeleteAll');
            searchDiv.innerHTML = '';
            return;
        }

        let searchDiv = document.getElementById('searchDeleteAll');
        searchDiv.innerHTML = '';
        let btnDeleteAll = document.createElement('button');
        btnDeleteAll.innerHTML = `Delete All  (${Users.length}) User(s)`;
        btnDeleteAll.style.width = '100%';
        searchDiv.appendChild(btnDeleteAll);
        btnDeleteAll.addEventListener('click', () => handleDeleteAll());
    }

    // Declare the searchBy variable before using it
    let searchBy = 'name';

    // Handle search Methods
    let SearchInput = document.getElementById('search-user');
    let searchByName = document.getElementById('search-byName');
    searchByName.addEventListener('click', () => HandeleSearchMood('search-byName'));
    let searchByEmail = document.getElementById('search-byEmail');
    searchByEmail.addEventListener('click', () => HandeleSearchMood('search-byEmail'));

    function HandeleSearchMood(searchMood) {
        if (searchMood == 'search-byName') {
            searchBy = 'name';
            SearchInput.placeholder = 'Search by Name';
            SearchInput.focus();
            searchByName.style.backgroundColor = 'green';
            searchByEmail.style.backgroundColor = '#3200fa';
        } else {
            searchBy = 'email';
            SearchInput.placeholder = 'Search by Email';
            SearchInput.focus();
            searchByEmail.style.backgroundColor = 'green';
            searchByName.style.backgroundColor = '#3200fa';
        }
    }

    SearchInput.addEventListener('input', Search);
    function Search() {

        if(SearchInput.value == ''){
            FillTabelWithData();
            return;
        }

        let searchValue = SearchInput.value.toLowerCase();
        let searchResults = users.filter(user => {
            let fieldValue = user[searchBy] ? user[searchBy].toLowerCase() : '';
            return fieldValue.includes(searchValue);
        });
        FillTabelWithData(searchResults);
    }

    // Fill the table with user data
    FillTabelWithData();
});