class Sanitizer {
    static sanitizeString(input) {
        if (typeof input !== 'string') {
            throw new Error('Input must be a string');
        }
        return input.replace(/['"<>;]/g, '');
    }

    static sanitizeNumber(input) {
        const number = parseFloat(input);
        if (isNaN(number)) {
            throw new Error('Input is not a valid number');
        }
        return number;
    }

    static sanitizeDate(input) {
        const date = new Date(input);
        if (isNaN(date.getTime())) {
            throw new Error('Input is not a valid date');
        }
        return date.toISOString().slice(0, 10);
    }
}

module.exports = Sanitizer;
