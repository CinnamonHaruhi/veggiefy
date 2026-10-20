export const isValidEmail = (email) => {
    if (email.length === 0) {
        return "Email is required";
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
        return "Invalid email";
    }
    return "";
}

export const isValidUsername = (username) => {
    if (username.length === 0) {
        return "Username is required";
    }

    if (username.length < 3 || username.length > 16) {
        return "Username must be 3-16 characters long";
    }

    const pattern = /[^a-zA-Z0-9_-]/;
    if (pattern.test(username)) {
        return "Username can't contain special characters besides dashes (-) and underscores (_)";
    }

    return "";
}

export const isValidPhoneNumber = (phoneNo) => {
    if (phoneNo.length === 0) {
        return "Phone number is required";
    }

    const pattern = /^[0-9]+$/;
    if (!pattern.test(phoneNo)) {
        return "Phone number must only contain digits";
    }

    if (phoneNo.length < 11 || phoneNo.length > 11) {
        return "Phone number must be 11 digits";
    }

    return "";
}

export const isValidPassword = (password) => {
    if (password.length === 0) {
        return "Password is required";
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    if (!/[A-Z]/.test(password)) {
        return "Password must have an uppercase letter"
    }

    if (!/[0-9]/.test(password)) {
        return "Password must have a number";
    }

    if (!/[^a-zA-Z0-9 ]/.test(password)) {
        return "Password must contain a special character";
    }

    return "";
}

export const isValidConfirmPassword = (password, confirmPassword) => {
    if (confirmPassword.length === 0) {
        return "Confirm your password";
    }

    if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    
    return "";
}