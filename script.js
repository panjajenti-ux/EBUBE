// ==========================================
// IYUNGA SECONDARY SCHOOL - STUDENT SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------------------
    // CREATE / REGISTER STUDENT
    // ------------------------------------------

    const addBtn = document.getElementById("addBtn");

    if (addBtn) {

        addBtn.addEventListener("click", function () {

            // Get form inputs
            const form = document.querySelector("#studentform form");

            const fullName = form.querySelector('input[type="text"]').value.trim();
            const studentId = form.querySelectorAll('input')[1].value.trim();
            const phone = form.querySelectorAll('input')[2].value.trim();
            const gender = document.getElementById("Gender").value;
            const studentClass = form.querySelectorAll('input')[3].value.trim();

            // Check required information
            if (fullName === "" || phone === "" || gender === "") {
                alert("Please fill in Full Name, Phone and Gender.");
                return;
            }

            // Generate ID automatically if user does not enter one
            let finalId = studentId;

            if (finalId === "") {
                finalId = Date.now().toString().slice(-6);
            }

            // Create student object
            const student = {
                id: finalId,
                name: fullName,
                gender: gender,
                className: studentClass,
                phone: phone
            };

            // Get existing students
            let students = JSON.parse(localStorage.getItem("students")) || [];

            // Check duplicate ID
            const duplicate = students.some(function (item) {
                return item.id === finalId;
            });

            if (duplicate) {
                alert("Student ID already exists. Please use another ID.");
                return;
            }

            // Add new student
            students.push(student);

            // Save students
            localStorage.setItem("students", JSON.stringify(students));

            alert("Student registered successfully!");

            // Clear form
            form.reset();

            // Go to students page
            window.location.href = "students.html";
        });
    }


    // ------------------------------------------
    // DISPLAY STUDENTS
    // ------------------------------------------

    const tableBody = document.getElementById("viewTableBody");

    if (tableBody) {

        displayStudents();

    }


    // ------------------------------------------
    // FUNCTION TO DISPLAY STUDENTS
    // ------------------------------------------

    function displayStudents() {

        let students = JSON.parse(localStorage.getItem("students")) || [];

        tableBody.innerHTML = "";

        if (students.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center;">
                        No students registered yet.
                    </td>
                </tr>
            `;

            return;
        }

        students.forEach(function (student, index) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.className || "-"}</td>
                <td>${student.phone}</td>

                <td>
                    <button onclick="editStudent('${student.id}')">
                        ✏️ Edit
                    </button>

                    <button onclick="deleteStudent('${student.id}')">
                        🗑️ Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);

        });
    }

});


// ==========================================
// DELETE STUDENT
// ==========================================

function deleteStudent(id) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find(function (item) {
        return item.id === id;
    });

    if (!student) {
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete " + student.name + "?"
    );

    if (!confirmDelete) {
        return;
    }

    students = students.filter(function (item) {
        return item.id !== id;
    });

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student deleted successfully!");

    // Reload students table
    location.reload();
}


// ==========================================
// EDIT STUDENT
// ==========================================

function editStudent(id) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find(function (item) {
        return item.id === id;
    });

    if (!student) {
        return;
    }

    // Ask for updated information
    const newName = prompt(
        "Enter student's full name:",
        student.name
    );

    if (newName === null) {
        return;
    }

    const newPhone = prompt(
        "Enter student's phone:",
        student.phone
    );

    if (newPhone === null) {
        return;
    }

    const newClass = prompt(
        "Enter student's class:",
        student.className
    );

    if (newClass === null) {
        return;
    }

    // Update student
    student.name = newName.trim();
    student.phone = newPhone.trim();
    student.className = newClass.trim();

    // Save updated data
    localStorage.setItem("students", JSON.stringify(students));

    alert("Student information updated successfully!");

    // Reload table
    location.reload();
}
