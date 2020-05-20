export function login(e, username, password) {
  e.preventDefault();
  console.log("Авторизация!");
  console.log(username + " - " + password);

  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  };

  fetch("http://localhost:8080/lmtube/api/user/login", requestParams)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
