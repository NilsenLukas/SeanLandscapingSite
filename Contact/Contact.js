const form = document.querySelector("form");
const Name = document.getElementById("name");
const email = document.getElementById("email");
const Phone = document.getElementById("phone");
const Address = document.getElementById("address");
const Description = document.getElementById("description");
const Mulch = document.getElementById("mulch");

function sendEmail() {
    const bodyMessage = `Name: ${Name.value}<br>
    Email: ${email.value} <br>
    Phone Number: ${Phone.value} <br>
    Address: ${Address.value} <br>
    Job description: ${Description.value} <br>
    Mulch amount: ${Mulch.value}`;
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "Henieslandco@gmail.com",
        Password: "F4B91485770C3728A549C857FFC64235805B",
        To: 'Henieslandco@gmail.com',
        From: "Henieslandco@gmail.com",
        Subject: `${Name.value} - ${Address.value}`,
        Body: bodyMessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "Thank you for your message",
                    text: "Your message has been sent!",
                    icon: "success"
                });
            }
        }
    );
}

function checkError() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value === "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value !== "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value !== "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value !== "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        } else {
            errorTxtEmail.innerText = "Email address can't be blank";
        }
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkError();

    if (!Name.classList.contains("error") && !Phone.classList.contains("error") && !Address.classList.contains("error") && !Description.classList.contains("error") && !Mulch.classList.contains("error") && !email.classList.contains("error")) {
        sendEmail();
    }
});
