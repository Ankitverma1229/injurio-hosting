const Validation = (userData) => {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

  if (userData.name === "") {
    error.name = "Name should not be empty";
  }
  if (userData.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(userData.email)) {
    error.email = "Email pattern doesn't matched;";
  }
  if (userData.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(userData.password)) {
    error.password = "Weak Password: e.g., 'P@ssw0rd'";
  }
  if (userData.confirmPassword.trim() !== userData.password.trim()) {
    error.confirmPassword = "Password not matched";
  }

  return error;
};

export default Validation;
