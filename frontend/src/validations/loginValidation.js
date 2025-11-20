// Regex Patterns
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

// Required field
export const validateRequired = (value, fieldName = "Field") => {
  if (!value || value.trim() === "") {
    return `⚠️ ${fieldName} est obligatoire !`;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return "❗ Veuillez saisir une adresse e-mail valide";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!passwordRegex.test(password)) {
    return "🔒 Le mot de passe doit contenir entre 8 et 20 caractères, incluant lettres et chiffres.";
  }
  return null;
};

// 🔥 Main validation for Login Form
export const loginValidation = ({ email, password }) => {
  let error;

  // 1. Required Email
  error = validateRequired(email, "Email");
  if (error) return error;

  // 2. Valid Email Format
  error = validateEmail(email);
  if (error) return error;

  // 3. Required Password
  error = validateRequired(password, "Mot de passe");
  if (error) return error;

  // 4. Valid Password Format
  error = validatePassword(password);
  if (error) return error;

  return null;
};
