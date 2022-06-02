console.log("client side javascript running");

// fetch("https://reqres.in/api/users").then((response) => {
//   response.json().then((data) => {
//     console.log(data.data[0]);
//   });
// });

const webform = document.querySelector("form");
const search = document.querySelector("input");

const message_1 = document.querySelector("#messageOne");
const message_2 = document.querySelector("#messageTwo");

// message_1.textContent = "Hi";

webform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  // message_1.textContent = "Loading...";

  fetch("https://reqres.in/api/users?page=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message_2.textContent = data.error;
      } else {
        if (message_2) {
          const myobject = data.data;
          myobject.forEach((element, index, array) => {
            console.log(element.email);
            const email = element.email;
            // console.log(index);
            // console.log(array);
            message_2.textContent = index + ": " + email + "<br>";
          });
        }
      }
    });
  });

  // alert(location);
});
