var firebaseConfig = {
    apiKey: "AIzaSyCuUa4X0nHF03xE0RS5gIcSes4EfGB4Htc",
    authDomain: "form-test-c6780.firebaseapp.com",
    databaseURL: "https://form-test-c6780.firebaseio.com",
    projectId: "form-test-c6780.appspot.com",
    messagingSenderId: "900825576170",
    appId: "1:900825576170:web:cb6f1bb9f31e351c2f1d93",
};
firebase.initializeApp(firebaseConfig);

let contactInfo = firebase.database().ref("infos");

document.querySelector(".contact-form").addEventListener("submit",
submitForm);

function submitForm(e) {
    e.preventDefault();

    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let phone = document.querySelector(".phone").value;
    let subject = document.querySelector(".subject").value;
    let message = document.querySelector(".message").value;

    saveContactInfo(name, email, phone, subject, message);

    document.querySelector(".contact-form").reset();

    sendEmail(name, email, phone, subject, message);
}

function saveContactInfo(name, email, phone, subject, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
    });

    retrieveInfos();
}

function retrieveInfos() {
    let ref = firebase.database().ref("infos");
    ref.on("value", gotData);
}

function gotData(data){
    let info = data.val();
    let keys = Object.keys(info);

    for(let i = 0; i < keys.length; i++) {
        let infoData = keys[i];
        let name = info[infoData].name;
        let email = info[infoData].email;
        let phone = info[infoData].phone;
        let subject = info[infoData].subject;
        let message = info[infoData].message;
        console.log(name, email, phone, subject, message);

        let infoResults = document.querySelector(".infoResults");

        infoResults.innerHTML += `<div>
        <p><strong>Name: <strong/>${name} <br/>
        <a><strong>Email: <strong/>${email}</a> <br/>
        <a><strong>Message: </strong/>${phone}</a> <br/>
        <a><strong>Email: <strong/>${subject}</a> <br/>
        <a><strong>Message: </strong/>${message}</a>
        </p>
        </div>`;
    }
}

retrieveInfos();

function sendEmail(name, email, phone, subject, message) {
    Email.send({
        Host:"smtp.gmail.com",
        Username: "info@armongolia.mn",
        Password: "AR-Mongolia_2020",
        To: "info@armongolia.mn",
        From: "info@armongolia.mn",
        Subject: `${name} send you a message`,
        Body: `Name: ${name} <br/> Email: ${email} <br/> Phone: ${phone} </br> Subject: ${subject} </br> Message: ${message}`,
    }).then((message) => alert("mail sent successfully"))
}
