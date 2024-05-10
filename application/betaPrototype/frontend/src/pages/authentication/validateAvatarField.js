export default function validateAvatarField(value, length) {
    let errors = {};

    // Emojis can use two code points
    if (length > 1) {
        errors.avatar = 'Do not enter more than one character for your icon.';
    }

    // Check if the value is a number
    if (!isNaN(value)) {
        errors.avatar = 'Numbers are not allowed as an icon.';
    }
    return errors;
}