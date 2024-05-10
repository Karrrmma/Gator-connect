export default function validateAvatarField(value) {
    let errors = {};

    if (value.length !== 1) { // only possible by editing the page
        errors.avatar = 'Do not try to enter more than one character for your icon.';
    }
    console.log(value.length);
    return errors;
}