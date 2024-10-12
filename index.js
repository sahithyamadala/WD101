document.addEventListener('DOMContentLoaded', function() {
    loadTableData();

    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const termsAccepted = document.getElementById('terms').checked;

        const age = calculateAge(new Date(dob));
        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        addEntry(name, email, password, dob, termsAccepted);
        saveToLocalStorage(name, email, password, dob, termsAccepted);

        document.getElementById('registrationForm').reset();
    });
});

function calculateAge(dob) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function addEntry(name, email, password, dob, termsAccepted) {
    const tableBody = document.getElementById('userTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${termsAccepted ? 'Yes' : 'No'}</td>
    `;
    tableBody.appendChild(newRow);
}

function saveToLocalStorage(name, email, password, dob, termsAccepted) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, dob, termsAccepted });
    localStorage.setItem('users', JSON.stringify(users));
}

function loadTableData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        addEntry(user.name, user.email, user.password, user.dob, user.termsAccepted);
    });
}

