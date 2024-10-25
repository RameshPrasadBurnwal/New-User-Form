let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let workingStatusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let newUserDetailsEl = document.getElementById("newUserDetails");

let myFormEl = document.getElementById("myForm");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

nameEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required...";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
});

emailEl.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required...";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
});

workingStatusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
});

genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer cecc0b6e4d6353af953d0646f43a3619f93765cab5e327954270a737bff80437"
        },
        body: JSON.stringify(formData)
    };
    let url = "https://gorest.co.in/public-api/users";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            let {data} = jsonData;
            let {id,name,email,gender,status} = data;
            newUserDetailsEl.textContent = `Id:${id} Name:${name} Email:${email} Gender:${gender} Status:${status}`;
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";
                }
                else if(jsonData.data[0].message === "is invalid"){
                    emailErrMsgEl.textContent = "email is Invalid";
                }
            }
        });
});