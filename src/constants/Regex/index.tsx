export const globalRegex = {
    onlyDigits: /\D/g,
    onlyAlphabets: /[^a-zA-Z ]/g,
    AlphanumericmailCharacters: /[^a-zA-Z0-9@._-]/g,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    addressRegex: /^[a-zA-Z0-9\s,.\-\/()#!@$%^&*_+={}[\]|\\:;"'<>?~`]+$/,
    priceRegex: /^\d*\.?\d*$/, // Allows digits and an optional decimal point
};