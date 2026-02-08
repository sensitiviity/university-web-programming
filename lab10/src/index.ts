import { validateForm } from "./validator.ts";
import type { FormData } from "./types.ts";


const user1: FormData = {
    name: "Іван",
    age: 20,
    email: "ivan@gmail.com",
    consent: true
};

const user2: FormData = {
    name: "анна ",
    age: 150,
    email: "anna@mail.ru",
    consent: false
};

const user3: FormData = {
    name: "4",
    age: 30,
    email: "t@ukr.net",
    consent: true
};

const user4: FormData = {
    name: "Андрій",
    age: -25,
    email: "@gmail.com",
    consent: false
};


const result1 = validateForm(user1);
const result2 = validateForm(user2);
const result3 = validateForm(user3);
const result4 = validateForm(user4);

console.log("User 1 validation result:", result1);
console.log("User 2 validation result:", result2);
console.log("User 3 validation result:", result3);
console.log("User 4 validation result:", result4);