const firstNameTxt = document.querySelector("#firstName");
const lastNameTxt = document.querySelector("#lastName");
const birthdayTxt = document.querySelector("#birthday");
const genderCheckbox = document.querySelector("#male");
const passwdTxt = document.querySelector("#password");
const emailTxt = document.querySelector("#email");
const btnSubmit = document.querySelector("#btn-submit");

btnSubmit.addEventListener('click', () => {

    let gender = "F";
    if (genderCheckbox.checked) gender = "M";

    const user = {
        firstName: firstNameTxt.value,
        lastName: lastNameTxt.value,
        birthday: birthdayTxt.value,
        gender: gender,
        passwd: passwdTxt.value,
        email: emailTxt.value,
    }

    console.log(user)

    fetch("http://localhost:8080/Users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(alert("account created successfully"))
});
