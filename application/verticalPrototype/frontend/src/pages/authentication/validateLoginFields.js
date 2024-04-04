export default function validateLoginFields(values) {
    let errors = {};
    // Does email exist
    if (!values.username) {
        errors.username = 'Username field is empty';
    } 

    // Does password exist
    if (!values.password) {
        errors.password = 'Password field is empty';
    }

    return errors;
}