"use strict";

// 1. Скрываем окончание телефонных номеров
const phoneNumbers = [
    "590.423.4568",
    "650.124.7234",
    "650.507.9879",
    "011.44.1343.529268",
    "011.44.1344.478968",
    "011.44.1644.429267",
    "11.44.1343.52",
    "11.44.1643.52"
];
function concealPhone(phone) {
    return phone.replace(/(\.[^.])[^.]*$/, "$1****");
}
console.log(phoneNumbers.map(concealPhone));

// 2. Оставляем видимыми начало и конец номера банковской карты
const paymentCards = [
    "4000 0012 0056 9499",
    "4000 0013 5456 7379",
    "4000 0014 1456 9869",
    "4000 0015 3466 7859",
    "4000 0016 3556 6899",
    "4000 0017 4456 4699"
];
function concealCard(card) {
    const onlyNumbers = card.replace(/\D/g, "");
    return `${onlyNumbers.slice(0, 4)}*****${onlyNumbers.slice(-4)}`;
}
console.log(paymentCards.map(concealCard));

// 3. Подсчитываем строки по двум независимым признакам
const priceLabels = [
    "Цена товара - 1200$",
    "Стоимость - 500$",
    "Цена не определена",
    "9999",
    "Ценовая категория - больше 300$",
    "Цена за услугу 500 EUR",
    "150$"
];
function countPriceLabels(lines) {
    const startingWithPrice = lines.filter(line => line.startsWith("Цена")).length;
    const endingWithDollars = lines.filter(line => line.endsWith("$")).length;
    return [startingWithPrice, endingWithDollars];
}
console.log(countPriceLabels(priceLabels));

// 4. Добавляем префикс только тогда, когда его ещё нет
function kingsMessage(message) {
    const prefix = "Король сказал:";
    return message.startsWith(prefix) ? message : `${prefix} ${message}`;
}
console.log(kingsMessage("сегодня хорошая погода"));
console.log(kingsMessage("Король сказал: завтра выходной"));

// 5. Определяем, сколько осталось до пятницы
function fridayStatus(weekday) {
    switch (weekday) {
        case 5:
            return "Сегодня пятница!";
        case 6:
            return "Пятница была вчера";
        case 4:
            return "Завтра пятница!";
        default: {
            const remaining = (5 - weekday + 7) % 7;
            const word = remaining >= 2 && remaining <= 4 ? "дня" : "дней";
            return `Пятница будет через ${remaining} ${word}`;
        }
    }
}
console.log(fridayStatus(new Date().getDay()));
