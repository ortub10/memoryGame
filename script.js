const timer = document.getElementById("timer");
const header = document.getElementById("header");
const worng = document.getElementById("worng");
const successful = document.getElementById("successful");
const refreshpage = document.getElementById("new_game_btn");

function confirmRefresh() {
  let okToRefresh = confirm("Do you really want to refresh the page?");
  if (okToRefresh) {
    setTimeout("location.reload(true);", 1500);
  }
}

let numberOfWrong = 0;
let numberOfGood = 0;
let timeCount = 0;
let active = false;
let count = 0;
let currentClass = "";

let interva = setInterval(function () {
  timeCount += 1;
  if (timeCount >= 60) {
    timer.innerText = `${Math.floor(timeCount / 60)} : ${timeCount % 60}`;
  } else {
    timer.innerText = timeCount;
  }
}, 1000);

function cardListener(event) {}

function addEvent(card, cls) {
  card.addEventListener("click", function (event) {
    if (!active) {
      event.target.setAttribute("class", cls);
      if (currentClass === "") {
        currentClass = event.target;
      } else {
        if (
          currentClass.getAttribute("class") ===
          event.target.getAttribute("class")
        ) {
          numberOfGood += 1;
          successful.innerText = numberOfGood;
          currentClass = "";

          count += 2;
          if (count === 12) {
            header.innerText = "You Won!!!";
            active = true;
            clearInterval(interva);
          }
        } else {
          numberOfWrong += 1;
          worng.innerText = numberOfWrong;
          active = true;
          setTimeout(() => {
            event.target.setAttribute("class", "card");
            currentClass.setAttribute("class", "card");
            currentClass = "";
            active = false;
          }, 1000);
        }
      }
    }
  });
}

const cards = document.querySelectorAll(".card");
const clss = [
  "ice1",
  "ice1",
  "ice2",
  "ice2",
  "ice3",
  "ice3",
  "ice4",
  "ice4",
  "ice5",
  "ice5",
  "ice6",
  "ice6",
];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const newClss = [];
for (let i = 0; i < clss.length; i += 1) {
  const num = Math.floor(Math.random() * numbers.length);
  newClss.push(clss[numbers[num]]);
  numbers.splice(num, 1);
}
for (let i = 0; i < clss.length; i += 1) {
  addEvent(cards[i], newClss[i]);
}
refreshpage.addEventListener("click", () => {
  confirmRefresh();
});
