import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { loginValidation } from "../validations/loginValidation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isPending = false;
  const isError = false;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = loginValidation({ email, password });
    if (validationError) return setErrorMessage(validationError);

    console.log("connecté");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        {/* Error Message */}
        {isError && (
          <Alert type="error" message={"Une erreur est survenue"} />
        )}
        {errorMessage && <Alert type="error" message={errorMessage} />}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleFormSubmit}>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="exemple@commune.gov.tn"
                className="w-full h-11 pl-10 pr-4 rounded-md border border-gray-300 focus:border-[#1A3A8A] focus:ring-1 focus:ring-[#1A3A8A] outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Votre mot de passe"
                className="w-full h-11 pl-10 pr-4 rounded-md border border-gray-300 focus:border-[#1A3A8A] focus:ring-1 focus:ring-[#1A3A8A] outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full h-11 bg-[#1A3A8A] text-white font-semibold rounded-md hover:bg-[#163174] transition-all"
          >
            {isPending ? <Spinner sm /> : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
