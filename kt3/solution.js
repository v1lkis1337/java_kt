"use strict";

// 1. Делится ли значение на семь без остатка?
const divisibleBySeven = value => value % 7 === 0;
console.log(divisibleBySeven(13));

// 2. Создаём массив значений, умноженных на коэффициент
function scaleNumbers(numbers, multiplier) {
    return numbers.map(value => value * multiplier);
}
console.log(scaleNumbers([1, 2, 3, 4], 3));

// 3. Складываем только элементы, которые преобразуются в числа
function sumNumericValues(items) {
    return items.reduce((total, item) => {
        const parsed = Number(item);
        return Number.isNaN(parsed) ? total : total + parsed;
    }, 0);
}
console.log(sumNumericValues(["10", "Строка", "5g", "15", "05"]));

// 4. Получаем элементы массива в обратном порядке
function reverseElements(items) {
    return [...items].reverse();
}
console.log(reverseElements([1, 2, 3, 4, 5]));

// 5. Проверяем, есть ли элемент, подходящий под условие
function containsMatch(items, predicate) {
    return items.some(predicate);
}
console.log(containsMatch([1, 2, 3, 4], item => item === 3));
