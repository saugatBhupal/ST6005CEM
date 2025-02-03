export function validateEmail(email) {
  if (!email) {
    return "Email cannot be empty.";
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    return "Invalid email format. Please provide a valid email address.";
  }
  console.log(email);
  return null;
}

export function validatePassword(password) {
  if (!password) {
    return "Password cannot be empty.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }

  if (/\s/.test(password)) {
    return "Password cannot contain spaces.";
  }
  return null;
}

export function validateFullname(fullname) {
  if (!fullname || fullname.length < 1) {
    return "Please don't leave this empty";
  }
  return null;
}

export function validatePhoneNumber(number) {
  if (!number || number.length < 10 || number.length > 10) {
    return "Phone number must be 10 digits";
  }
  console.log("return");
  return null;
}

export function validateDateOfBirth(dob) {
  if (!dob) {
    return "Date of birth cannot be empty.";
  }

  const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
  const match = dob.match(regex);

  if (!match) {
    return "Invalid date format. Please use DD-MM-YYYY.";
  }

  const [_, day, month, year] = match;
  const inputDate = new Date(`${year}-${month}-${day}`);

  if (
    inputDate.getDate() !== parseInt(day) ||
    inputDate.getMonth() + 1 !== parseInt(month) ||
    inputDate.getFullYear() !== parseInt(year)
  ) {
    return "Invalid date. Please check the day, month, and year.";
  }

  const today = new Date();
  if (inputDate > today) {
    return "Date of birth cannot be in the future.";
  }

  const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 16));
  if (inputDate > minAgeDate) {
    return "You must be at least 16 years old.";
  }
  return null;
}
