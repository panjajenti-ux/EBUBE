// student registration
const studentForm =document.getElementById("studentForm");

if (studentForm) {

    studentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullname =document.getElementById("fullname").value;
        const studentId =document.getElementById("studentId").value;
        const phone =document.getElementById("phone").value;
        const gender =document.getElementById("gender").value;
        const class =document.getElementById("class").value;

        const student = {
            fullname: fullname
            studentId: studentId
            phone: phone
            gender: gender
            class: class
        };

        let students =JSON.parse(localStorage.getItem("students")) || [];

        students.push(student);
        localStorage.setItem("students", JSON.stringify(students));alert("student registered successfully!");
        studentForm.reset();
        window.location.href ="students.html";
    }); 
}

//delete student
function deletestudent(button)
{
    const row = button.parentElement.parentElement;
    row.remove();
    alert("student deleted");
}
//edit student
function editstudent(button) {

    const row = button.parentElement.parentElement;
    const name =row.cells[1];

    const const newName = prompt("Enter new student name:",
    name.textContent
    );

    if (newName !== null && newName.trim() !== "") {
        name.textContent = newName;
    }
}