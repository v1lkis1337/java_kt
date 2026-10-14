"use strict";

// 1. Складываем значения свойств объекта
const costs = {price1: 100, price2: 150, price3: 200, price4: 100, price5: 150};
const costsTotal = Object.values(costs).reduce((total, value) => total + value, 0);
console.log(costsTotal);

// 2. Преобразуем объекты в массивы их значений
const fruits = [
    {id: 1, name: "apple"},
    {id: 2, name: "watermelon"},
    {id: 3, name: "qiwi"},
    {id: 4, name: "lemon"}
];
console.log(fruits.map(fruit => Object.values(fruit)));

// 3. Объединяем произвольное количество слов
function writeWords(...parts) {
    console.log(`${parts.join(" ")} `);
}
writeWords("Hello", "my", "world!");

// 4. Ищем поле particle в объекте, включая наследуемые свойства
const hasParticle = item => Reflect.has(item, "particle");
console.log(hasParticle({id: 1, particle: 10}));
console.log(hasParticle({id: 2, name: "tag"}));

// 5. Заменяем обычные объекты внутри массива массивами их значений
function expandObjects(elements) {
    elements.forEach((element, position) => {
        const plainObject = element !== null && typeof element === "object" && !Array.isArray(element);
        if (plainObject) {
            elements[position] = Object.values(element);
        }
    });
    return elements;
}
console.log(expandObjects([[1], {id: 40}, [100], [300], {part: 10}]));

// 6. Управляем списком пользователей через отдельный класс
class UserRegistry {
    constructor(initialUsers) {
        this.users = initialUsers;
        this.nextId = initialUsers.length + 1;
    }

    add(name, lastname, age) {
        const person = {id: this.nextId++, name, lastname, age};
        this.users.push(person);
        return person;
    }

    update(id, name, lastname, age) {
        const person = this.users.find(item => item.id === id);
        if (!person) return false;

        Object.assign(person, {name, lastname, age});
        return true;
    }

    remove(id) {
        const index = this.users.findIndex(person => person.id === id);
        if (index < 0) return false;

        this.users.splice(index, 1);
        return true;
    }
}

const registry = new UserRegistry([
    {id: 1, name: "Alex", lastname: "Wilyam", age: 20},
    {id: 2, name: "Steven", lastname: "King", age: 34}
]);
registry.add("Mary", "Green", 20);
console.log(registry.users);
registry.update(3, "Mary", "Green", 21);
console.log(registry.users);
registry.remove(1);
console.log(registry.users);

// 8. Почтовый адрес с геттером и сеттером
class Email {
    constructor(address) {
        this.email = address;
    }

    get email() {
        return this._email;
    }

    set email(address) {
        this._email = String(address);
    }
}

const primary = new Email("first@example.com");
const secondary = new Email("second@example.com");
console.log(primary.email);
console.log(secondary.email);
primary.email = "new@example.com";
console.log(primary.email);

// 9. Наследование: определяем тип телефонного номера
class Contact extends Email {
    constructor(address, number) {
        super(address);
        this.phone = number;
    }

    set phone(number) {
        this._phone = String(number);
    }

    get phone() {
        if (!this._phone.includes("+")) {
            return "Неизвестный";
        }

        const digitCount = this._phone.replace(/\+/g, "").length;
        const phoneTypes = {12: "Мобильный", 18: "Городской"};
        return phoneTypes[digitCount] ?? "Неизвестный";
    }
}

const mobile = new Contact("mobile@example.com", "+123456789012");
const landline = new Contact("city@example.com", "+123456789012345678");
console.log(mobile.email, mobile.phone);
console.log(landline.email, landline.phone);
mobile.email = "updated@example.com";
mobile.phone = "123456789012";
console.log(mobile.email, mobile.phone);
