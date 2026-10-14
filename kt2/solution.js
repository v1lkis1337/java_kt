"use strict";

// 1. Удаляем из текста русские буквы А и О в любом регистре
function excludeVowels(text) {
    return text.replace(/[ао]/gi, "");
}
console.log(excludeVowels("Арнольд"));

// 2. Выводим числа, кратные трём
const upperBound = 20;
for (let value = 3; value <= upperBound; value += 3) {
    console.log(value);
}

// 3. Строим числовую лесенку
function printStairs(height) {
    for (let level = 1; level <= height; level++) {
        const row = Array.from({length: level}, (_, index) => index + 1).join("");
        console.log(row);
    }
}
printStairs(5);

// 4. Находим сумму факториалов от 1! до n!
function sumOfFactorials(limit) {
    let currentFactorial = 1;
    let total = 0;

    for (let number = 1; number <= limit; number++) {
        currentFactorial *= number;
        total += currentFactorial;
    }
    return total;
}
console.log(sumOfFactorials(4));

// 5. Сравниваем слово с записью в обратном порядке
function palindromeAnswer(text) {
    const reversed = [...text].reverse().join("");
    return reversed === text ? "YES" : "NO";
}
console.log(palindromeAnswer("потоп"));
