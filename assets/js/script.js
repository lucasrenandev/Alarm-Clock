// Modo estrito
"use strict";

// Elementos
const currentTime = document.querySelector(".hero h1");
const content = document.querySelector(".hero .content");
const selectsBtn = document.querySelectorAll(".hero select");
const info = document.querySelector(".hero p");
const setAlarmBtn = document.querySelector(".hero button");

let isAlarmSet = false;
let alarmTime = null;
let ringtone = new Audio("./assets/files/ringtone.mp3");

info.textContent = "Set an alarm";

const date = new Date();
const day = date.getDay();
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Criando horas de forma dinâmica
function createHours() {
    for(let i = 12; i > 0; i --) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}">${i}</option>`;
        selectsBtn[0].firstElementChild.insertAdjacentHTML("afterend", option);
    }
}
createHours();

// Criando minutos de forma dinâmica
function createMinutes() {
    for(let i = 59; i >= 0; i --) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}">${i}</option>`;
        selectsBtn[1].firstElementChild.insertAdjacentHTML("afterend", option);
    }
}
createMinutes();

// Criando período de forma dinâmica
function createPeriod() {
    for(let i = 2; i > 0; i --) {
        let period = i === 1 ? "AM" : "PM";
        let option = `<option value="${period}">${period}</option>`;
        selectsBtn[2].firstElementChild.insertAdjacentHTML("afterend", option);
    }
}
createPeriod();

// Obtendo hora atual do sistema
function getTime() {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let period = "AM";

    if(hour >= 12) {
        hour = hour - 12;
        period = "PM";
    }

    hour = hour === 0 ? hour = 12 : hour;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    currentTime.textContent = `${hour}h${minute}m${second}s ${period}`;

    if(alarmTime === `${hour}h${minute}m ${period}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}
setInterval(getTime, 1000);
getTime();

// Programar alarme
function setAlarm() {
    if(isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.textContent = "Set alarm";
        return isAlarmSet = false;
    }
    else {
        const time = `${selectsBtn[0].value}h${selectsBtn[1].value}m ${selectsBtn[2].value}`;
        if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
            info.textContent = "Please, set a time to activate the alarm!";
        }
        else {
            info.textContent = "Alarm set for " + weekDays[day] + " at " + time;
        }
        isAlarmSet = true;
        alarmTime = time;
        content.classList.add("disable");
        setAlarmBtn.textContent = "Clear alarm"; 
    }
}

// Evento
setAlarmBtn.addEventListener("click", setAlarm);