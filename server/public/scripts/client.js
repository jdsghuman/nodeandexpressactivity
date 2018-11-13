$(document).ready(readyNow);

function readyNow() {
    $('#btn__employee--add').on('click', addEmployee);
    deleteEmployee();
    checkIfEmployeesAdded();
    calculateMonthlyTotal(monthlyTotal);
}

// Employee array
let employees = [];
// Monthly Total
let monthlyTotal = 0;

// Create Employee class
class Employee {
    constructor(firstName, lastName, userId, title, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.title = title;
        this.annualSalary = annualSalary;
    }
}

function appendTable() {
    let tBody = $('#table__body');
    tBody.empty();
    employees.forEach(emp => {
        tBody.append(`<tr class="table__employee"><td>${emp.firstName}</td><td>${emp.lastName}</td><td class="table__employee--userId">${emp.userId}</td><td>${emp.title}</td><td>${getAnnualSalaryFormatted(emp.annualSalary)}</td><td><button id="deleteEmployee" class="btn btn-danger btn-sm">Delete</button></td></tr>`);
    });
}

function addEmployee() {
    // Get unique ID variable
    let userIdSaved = checkIfUserIdExists();

    // Check for input validation
    if ($('#firstNameIn').val() === '' || $('#lastNameIn').val() === '' || $('#userIdIn').val() === '' || $('#titleIn').val() === '' || $('#annualSalaryIn').val() === '') {
        alert('Please fill out required fields!');
    } else if (userIdSaved) {
        alert('User ID already taken. Please enter a unique User ID!');
    } else {
        let newEmployee = new Employee(
            $('#firstNameIn').val(),
            $('#lastNameIn').val(),
            $('#userIdIn').val(),
            $('#titleIn').val(),
            Number($('#annualSalaryIn').val())
        )

        // Clear Inputs
        clearInputValues();

        // Add Employee to Employees array
        employees.push(newEmployee);

        // Calculate monthly costs
        calculateMonthlyTotal();

        // Check if employees exist
        checkIfEmployeesAdded();

        // Add employee to Display
        appendTable();
    }
}

function calculateMonthlyTotal() {
    monthlyTotal = 0;
    // Get Annual Salary total from Employees array
    employees.map(emp => {
        monthlyTotal += Number((emp.annualSalary).toFixed(2));
    });

    // Display Monthly Total
    $('#month__Total').text(getAnnualSalaryFormatted(monthlyTotal));

    // Show red background if total > 20k
    displayMonthlyTotalExceeds();
}

function checkIfEmployeesAdded() {
    // Add placeholder table text if no employees added
    if (employees.length > 0) {
        $('#table__employees--none').hide();
    } else {
        $('#table__employees--none').show();
    }
}

function clearInputValues() {
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#userIdIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
}

function checkIfUserIdExists() {
    let userIdEntered = $('#userIdIn').val();
    // Check if userId exists
    let foundId = employees.find(emp => emp.userId === userIdEntered);
    return foundId;
}

function deleteEmployee() {
    // Lister on Delete button
    $('.table').on('click', '#deleteEmployee', function () {
        // Get UserID of employee
        let empUserId = $(this).parent().parent()
            .find(".table__employee--userId").text();

        // Delete employee from Employee array
        deleteEmployeeFromArray(empUserId);

        // Remove Employee from table
        $(this).closest("tr").remove();

        calculateMonthlyTotal();
    });
}

function deleteEmployeeFromArray(userIdClicked) {
    // Filter Employees array
    let updatedEmployeesArr = employees.filter(emp => emp.userId != userIdClicked);
    // Update Employees array
    employees = updatedEmployeesArr;

    // Update table
    appendTable();

    // Check if employees exist
    checkIfEmployeesAdded();
}

function displayMonthlyTotalExceeds() {
    if (monthlyTotal >= 20000) {
        $('#month__display').addClass('month__total--red');
    } else if (monthlyTotal < 20000) {
        $('#month__display').removeClass('month__total--red');
    }
}

function getAnnualSalaryFormatted(salary) {
    var i = parseFloat(salary);
    if (isNaN(i)) { i = 0.00; }
    var minus = '';
    if (i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    // Ensure two decimal digit appears
    s = parseFloat(s).toLocaleString('en');
    if (s.indexOf('.') < 0) { s += '.00'; }
    if (s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;
    return s;
}