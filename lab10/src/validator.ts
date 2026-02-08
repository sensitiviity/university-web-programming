import type { FormData, AllowedDomain } from "./types.ts";

const allowedDomains: AllowedDomain[] = ["gmail.com", "ukr.net", "l.ua", "meta.ua"];

export function isAllowedDomain(domain: string): domain is AllowedDomain {
  return (allowedDomains as string[]).includes(domain);
}

export function formatName(name: string): string {
    const trimmed = name.trim();
    return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
}

export function validateName(name: string): boolean {
    const value = formatName(name);
    const regex = /^\p{L}+$/u;
    return value.length >= 2 && regex.test(value);
}

export function validateAge(age: number): boolean {
    return Number.isInteger(age) && age >= 1 && age <= 120;
}

export function validateEmail(email: string): boolean {
    if(!email.includes("@")) return false;
    const [ename, domain] = email.split("@");
    if(ename.length < 1) return false;
    return domain.includes(".") && isAllowedDomain(domain);
}

export function validateConsent(consent: boolean): boolean {
    return consent === true;
}

export function validateForm(data: FormData): string[] {
    const errors: string[] = [];

    if(!validateName(data.name)) {
        errors.push("Name must contain only letters (at least 2)");
    }

    if (!validateAge(data.age)) {
        errors.push("Age must be a number between 1 and 120");
    }

    if (!validateEmail(data.email)) {
        errors.push("Email format is invalid or domain is not allowed");
    }

    if (!validateConsent(data.consent)) {
        errors.push("User must give consent");
    }

    return errors;
}


