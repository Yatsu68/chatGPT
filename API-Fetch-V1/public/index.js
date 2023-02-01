const form = document.getElementById("input-form");
const input = document.querySelector(".textInput");
const textDisplay = document.querySelector(".text-display");
const loader = document.querySelector(".loader-section");
const responseDisplay = document.querySelector(".response-section");

const sendInfosServerSide = function (infos) {
  textDisplay.innerText = "";
  loader.style.display = "flex";
  responseDisplay.style.display = "none";

  return fetch(`/chatGPT`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: infos,
    }),
  })
    .then((response) => response.json())
    .then((json) => json.response)
    .catch((err) => {
      loader.style.display = "none";
      console.log(err);
    });
};
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { value } = input;
  input.value = "";

  const requestResult = await sendInfosServerSide(value);
  loader.style.display = "none";
  responseDisplay.style.display = "flex";
  textDisplay.innerText = requestResult;
});
