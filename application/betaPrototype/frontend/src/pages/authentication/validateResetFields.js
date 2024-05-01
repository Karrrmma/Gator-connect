export default function validateResetFields(values) {
    let errors = {};

    // Username field empty
    if (!values.username) {
        errors.username = 'Username field is empty';
    } 

    // Email field empty
    if (!values.email) {
        errors.email = 'Email required';
    // @sfsu.edu formatting
    } else if (!values.email.endsWith('@sfsu.edu')) {
        errors.email = 'Email must end with @sfsu.edu';
    }

    // --> the match between username and email will be implemented in backend by using query
    // --> a.user_id = u.user_id

    // Empty new password field
    if (!values.newPassword) {
        errors.newPassword = 'New Password field is empty';
    // New password validation
    // New password is at least 8 char long, password contains a num?
    } else if (values.newPassword.length < 8) {
        errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/\d/.test(values.newPassword)) {
        errors.newPassword = 'Password must contain a number';
    }

    // --> cannot use the previous password
    // --> new password should not be the same as password (implemented in backend)
    // --> password !== newPassword

    // Does confirm new password exist
    if (!values.confirmNewPassword) {
        errors.confirmNewPassword = 'Confirm New Password field is empty';
    } else if (values.confirmNewPassword !== values.newPassword) {
        errors.confirmNewPassword = 'Confirm New Passwrod does not match with New Password';
    }

    return errors;
}