export default function validateFields(values) {
    let errors = {};
    // basic for now
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!values.email.endsWith('@sfsu.edu')) {
        errors.email = 'Email must end with @sfsu.edu';
    }

    return errors;
}