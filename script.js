async function registration() {
  let fn = document.getElementById("reg_fullname").value;
  let un = document.getElementById("reg_username").value;
  let pw = document.getElementById("reg_password").value;
  let em = document.getElementById("reg_email").value;

  let url = "https://nodejs-3260.rostiapp.cz/users/registry";
  let body = {};
  body.fullname = fn;
  body.username = un;
  body.password = pw;
  body.email = em;
  let response = await fetch(url, {"method":"POST", "body": JSON.stringify(body)});
  let data = await response.json();
  console.log(data);

}

let userToken;

async function login() {
  let un = document.getElementById("username").value;
  let pw = document.getElementById("password").value;

  let url = "https://nodejs-3260.rostiapp.cz/users/login";
  let body = {};
  body.username = un;
  body.password = pw;
  let response = await fetch(url, {"method":"POST", "body": JSON.stringify(body)});
  let data = await response.json();
  console.log(data);

  if (data.status == "OK") {
    userToken = data.token;
  }

}

async function sendMessagePOST() {
  let n = document.getElementById("nick").value;
  let m = document.getElementById("message").value;
  document.getElementById("message").value = ""; //clear message text on page
  document.getElementById("message").focus(); //text cursor to input

  let url = "https://nodejs-3260.rostiapp.cz/chat/addMsg";
  let body = {};
  body.nickx = n;
  body.msg = m;
  body.chat = "ide933a740f211a5579b56dede4bb2c5";
  body.token = userToken;
  let response = await fetch(url, {"method":"POST", "body": JSON.stringify(body)});
  let data = await response.json();

}

async function updateMessages() {
  let url = "https://nodejs-3260.rostiapp.cz/chat/listMsgs";
  let body = {};
  body.chat = "ide933a740f211a5579b56dede4bb2c5";
  body.token = userToken;
  let response = await fetch(url, {"method":"POST", "body": JSON.stringify(body)});
  let data = await response.json();
  console.log(data);

  let s = "";
  for (let m of data) {
    s = m.time + " " + m.user + "<br><b>" + m.msg + "</b><br>" + s;
  }

  document.getElementById("messageList").innerHTML = s;
}

function onKeyDown(event) {
  console.log(event.key);
  if (event.key == "Enter") {
    sendMessage();
  }
}

function onLoad() {
  setInterval(updateMessages, 1000);

  document.getElementById("message").addEventListener("keydown", onKeyDown);
}