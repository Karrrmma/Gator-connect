export default function validateResetFields(values) {
    let errors = {};
    // Does email exist
    if (!values.username) {
        errors.username = 'Username field is empty';
    } 

    // Does password exist
    if (!values.email) {
        errors.email = 'Email field is empty';
    }

    // Does new password exist
    if (!values.newPassword) {
        errors.newPassword = 'New Password field is empty';
    }

    // Does confirm new password exist
    if (!values.confirmNewPassword) {
        errors.confirmNewPassword = 'Confirm New Password field is empty';
    }

    return errors;
}