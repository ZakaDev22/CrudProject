document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const city = document.getElementById('city');
    const role = document.getElementById('role');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addUser();
    });

    function addUser() {
        const user = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            age: age.value,
            city: city.value,
            role: role.value
        };

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Clear form fields
        form.reset();

        console.log('User added successfully');
        console.log(users);
    }
});