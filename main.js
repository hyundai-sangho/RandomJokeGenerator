const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const 영어농담_URL = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
const 영어번역_URL = "https://translate-plus.p.rapidapi.com/translate";
let jokeBox = document.getElementById("joke");

// jokeApi에서 농담 가져오기
let 영어농담_가져오기 = async () => {
  jokeContainer.classList.remove("fade");
  await fetch(영어농담_URL)
    .then((data) => data.json())
    .then((영어농담) => {
      // 가져온 농담이 영어이기 때문에 영어_한글로_번역() 함수에
      // 농담을 넣어서 한글로 번역
      영어_한글로_번역(영어농담.joke);
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

// jokeApi에서 받아온 영어 농담을 한글로 번역
let 영어_한글로_번역 = async (영어농담) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "9def77e281msh5e2d153a4e3a367p1364edjsn15baf0827d71",
      "X-RapidAPI-Host": "translate-plus.p.rapidapi.com",
    },
    body: `{"text":"${영어농담}","source":"en","target":"ko"}`,
  };

  fetch(영어번역_URL, options)
    .then((response) => response.json())
    .then((response) => {
      jokeBox.textContent = response["translations"]["translation"];
      jokeContainer.classList.add("fade");
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

btn.addEventListener("click", () => {
  영어농담_가져오기();
  btn.disabled = true;
  btn.style.backgroundColor = "red";

  setTimeout(() => {
    btn.disabled = false;
    btn.style.backgroundColor = "#fab22e";
  }, 5000);
});
