export const validateAuthForm = (form, isSignIn) => {
  const errors = {};
  if (!isSignIn) {
    if (!form.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!form.username || form.username.length < 3) {
      errors.username = "Min 3 characters required";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email address";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      errors.phone = "Enter 10 digit phone number";
    }
  }
  if (isSignIn) {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^\d{10}$/;

    if (!form.loginId.trim()) {
      errors.loginId = "Enter email or phone number";
    } else if (
      !emailRegex.test(form.loginId) &&
      !phoneRegex.test(form.loginId)
    ) {
      errors.loginId = "Enter valid email or 10 digit phone number";
    }
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=]).{8,}$/;

  if (!form.password?.trim()) {
    errors.password = "Password is required";
  } else if (!isSignIn && !passwordRegex.test(form.password)) {
    errors.password =
      "Min 8 chars, include upper, lower, number & special character";
  }

  return errors;
};
