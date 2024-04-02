export default function validateFields(values) {
    let errors = {};
    // Does email exist
    if (!values.email) {
        errors.email = 'Email required';
    } else if (!values.email.endsWith('@sfsu.edu')) {
        errors.email = 'Email must end with @sfsu.edu';
    }

    // Does username exist
    if (!values.username) {
        errors.username = 'Username required';
    }

    // Does password exist
    if (!values.password) {
        errors.password = 'Password required';
    }
    // password validation

    // Does fullname exist
    if (!values.fullname) {
        errors.fullname = 'Full Name required';
    }

    // Does role exist
    if (!values.role || values.role === 'Select role') {
        errors.role = 'Please select a role';
    }

    // Does major exist
    if (!values.major || values.major === 'Select major') {
        errors.major = 'Please select a major';
    }

    // Does year exist, does not need to be checked if role is not student
    if (values.role === 'Student' && (!values.year || values.year === 'Select year')) {
        errors.year = 'Please select a year';
    }

    return errors;
}