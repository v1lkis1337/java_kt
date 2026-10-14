"use strict";

const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class SampleDate extends Date {
    getDay() { return 3; } // Среда: до пятницы два дня
}

function execute(unit) {
    const output = [];
    const code = fs.readFileSync(path.join(__dirname, "..", unit, "solution.js"), "utf8");
    const context = vm.createContext({
        console: {log: (...args) => output.push(JSON.parse(JSON.stringify(args)))},
        Date: SampleDate
    });
    vm.runInContext(code, context, {filename: unit + "/solution.js"});
    return {output, evaluate: expression => vm.runInContext(expression, context)};
}

test("КТ 1 — условия и арифметика", () => {
    const {output, evaluate} = execute("kt1");
    assert.deepEqual(output, [
        ["10000 Р в день"], ["golf"], [12], ["Делить на 0 нельзя!"], [1]
    ]);
    assert.equal(evaluate('formatRent(200, "week")'), "200 Р в неделю");
    assert.equal(evaluate('selectActivity(18, "clear")'), "bowling");
    assert.equal(evaluate('selectActivity(2, "rain")'), "hiking");
    assert.equal(evaluate('calculate(7, 2, "-")'), 5);
    assert.equal(evaluate('hasSquareLength("кот")'), 0);
});

test("КТ 2 — циклы и последовательности", () => {
    const {output, evaluate} = execute("kt2");
    assert.deepEqual(output, [
        ["рнльд"], [3], [6], [9], [12], [15], [18],
        ["1"], ["12"], ["123"], ["1234"], ["12345"], [33], ["YES"]
    ]);
    assert.equal(evaluate('excludeVowels("МОЛОКО")'), "МЛК");
    assert.equal(evaluate('sumOfFactorials(3)'), 9);
    assert.equal(evaluate('palindromeAnswer("кот")'), "NO");
});

test("КТ 3 — функции, преобразование и проверка", () => {
    const {output, evaluate} = execute("kt3");
    assert.deepEqual(output, [
        [false], [[3, 6, 9, 12]], [30], [[5, 4, 3, 2, 1]], [true]
    ]);
    assert.equal(evaluate('divisibleBySeven(49)'), true);
    assert.equal(evaluate('sumNumericValues(["2", "abc", 3])'), 5);
    assert.equal(evaluate('containsMatch([1, 2], item => item > 5)'), false);
});

test("КТ 4 — объекты, управление пользователями и классы", () => {
    const {output, evaluate} = execute("kt4");
    assert.deepEqual(output, [
        [700],
        [[[1, "apple"], [2, "watermelon"], [3, "qiwi"], [4, "lemon"]]],
        ["Hello my world! "], [true], [false],
        [[[1], [40], [100], [300], [10]]],
        [[{id: 1, name: "Alex", lastname: "Wilyam", age: 20},
          {id: 2, name: "Steven", lastname: "King", age: 34},
          {id: 3, name: "Mary", lastname: "Green", age: 20}]],
        [[{id: 1, name: "Alex", lastname: "Wilyam", age: 20},
          {id: 2, name: "Steven", lastname: "King", age: 34},
          {id: 3, name: "Mary", lastname: "Green", age: 21}]],
        [[{id: 2, name: "Steven", lastname: "King", age: 34},
          {id: 3, name: "Mary", lastname: "Green", age: 21}]],
        ["first@example.com"], ["second@example.com"], ["new@example.com"],
        ["mobile@example.com", "Мобильный"],
        ["city@example.com", "Городской"],
        ["updated@example.com", "Неизвестный"]
    ]);
    assert.equal(evaluate('hasParticle(Object.create({particle: 1}))'), true);
    assert.equal(evaluate('registry.update(999, "X", "Y", 10)'), false);
    assert.equal(evaluate('registry.remove(999)'), false);
});

test("КТ 5 — маскирование, строки и дата", () => {
    const {output, evaluate} = execute("kt5");
    assert.deepEqual(output, [
        [["590.423.4****", "650.124.7****", "650.507.9****",
          "011.44.1343.5****", "011.44.1344.4****", "011.44.1644.4****",
          "11.44.1343.5****", "11.44.1643.5****"]],
        [["4000*****9499", "4000*****7379", "4000*****9869",
          "4000*****7859", "4000*****6899", "4000*****4699"]],
        [[3, 4]],
        ["Король сказал: сегодня хорошая погода"],
        ["Король сказал: завтра выходной"],
        ["Пятница будет через 2 дня"]
    ]);
    assert.equal(evaluate('fridayStatus(4)'), "Завтра пятница!");
    assert.equal(evaluate('fridayStatus(5)'), "Сегодня пятница!");
    assert.equal(evaluate('fridayStatus(6)'), "Пятница была вчера");
    assert.equal(evaluate('kingsMessage("Король сказал: привет")'), "Король сказал: привет");
});
