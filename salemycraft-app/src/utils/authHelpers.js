export const parseLoginId = (loginId) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const phoneRegex = /^\d{10}$/;

  if (emailRegex.test(loginId)) return { type: "email", value: loginId };
  if (phoneRegex.test(loginId)) return { type: "phone", value: loginId };

  return null;
};
