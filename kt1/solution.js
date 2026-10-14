"use strict";

// 1. Отображение стоимости для выбранного срока
function formatRent(amount, unit) {
    const periods = {
        day: "день",
        week: "неделю",
        month: "месяц"
    };

    return `${amount} Р в ${periods[unit]}`;
}
console.log(formatRent(10000, "day"));

// 2. Подбираем занятие по погодным условиям
function selectActivity(temperature, sky) {
    if (sky === "clear" && temperature >= 25) {
        return "golf";
    }

    const comfortableTemperature = temperature >= 10 && temperature <= 24;
    if (comfortableTemperature || sky === "cloudy") {
        return "bowling";
    }

    return "hiking";
}
console.log(selectActivity(25, "clear"));

// 3. Арифметика и защита от деления на ноль
function calculate(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return second === 0 ? "Делить на 0 нельзя!" : first / second;
        default:
            return undefined;
    }
}
console.log(calculate(2, 6, "*"));
console.log(calculate(2, 0, "/"));

// 4. Проверяем, можно ли длину слова представить квадратом целого числа
function hasSquareLength(text) {
    return Number.isInteger(Math.sqrt(text.length)) ? 1 : 0;
}
console.log(hasSquareLength("меню"));
