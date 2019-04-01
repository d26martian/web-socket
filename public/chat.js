//make connection
const socket = io.connect("http://localhost:4000");

//Qeuery DOM
const message = document.getElementById("message");
const name = document.getElementById("name");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

//Emmit events

btn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    name: name.value
  });
  message.value = "";
  name.value = "";
  console.log(message.value + name.value);
});

//message
message.addEventListener("keypress", () => {
  socket.emit("typing", name.value);
});
//listen for event
socket.on("chat", data => {
  console.log(data);
  feedback.innerHTML = "";
  output.innerHTML +=
    `<p><strong>` + data.name + ` : </strong>` + data.message + `</p>`;
});

socket.on("typing", data => {
  feedback.innerHTML = `<p>` + data + ` is typing a messages</p>`;
});
