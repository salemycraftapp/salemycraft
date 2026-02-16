import Header from "./Header";
import BackgroundImage from "../assets/BackgroundImage.png";
import { validateAuthForm } from "../utils/validate.js";
import { useState, useRef, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { createUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../utils/AuthContext.js";
const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    loginId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const loginIdRef = useRef(null);
  const fullNameRef = useRef(null);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  useEffect(() => {
    if (isSignIn) {
      loginIdRef.current?.focus();
    } else {
      fullNameRef.current?.focus();
    }
  }, [isSignIn]);

  const validate = () => {
    const newErrors = validateAuthForm(form, isSignIn);

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) {
      if (errors.loginId) loginIdRef.current?.focus();
      else if (errors.fullName) fullNameRef.current?.focus();
      else if (errors.password) passwordRef.current?.focus();
      else if (errors.username) usernameRef.current?.focus();
      else if (errors.phone) phoneRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      return;
    }
    if (isSignIn) {
      signIn();
    } else {
      signUp();
    }
  };
  const signUp = async () => {
    try {
      setLoading(true);
      await createUser(form);
      toast.success("Account created successfully");

      setIsSignIn(true);
      setForm({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        loginId: "",
        password: "",
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const signIn = async () => {
    try {
      setLoading(true);
      const data = await loginUser(form, rememberMe);
      login(data.token, rememberMe);
      navigate("/browser");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
    setForm({
      fullName: "",
      username: "",
      email: "",
      phone: "",
      loginId: "",
      password: "",
    });
    setErrors({});
  };
  const inputStyle = (field) =>
    `w-full my-3 px-4 py-3 rounded-xl border bg-white/90 focus:outline-none focus:ring-2 
     ${
       errors[field]
         ? "border-red-400 focus:ring-red-300"
         : "border-gray-300 focus:ring-orange-300"
     }`;
  const handleLoginIdChange = (e) => {
    let value = e.target.value;
    if (/^\d*$/.test(value)) {
      value = value.slice(0, 10);
    }
    setForm({ ...form, loginId: value });
    setErrors((prev) => ({ ...prev, loginId: "" }));
  };

  return (
    <div>
      <Header />
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      />

      <form
        onSubmit={handleSubmit}
        className="w-3/12  backdrop-blur-md absolute bg-white/10 shadow-2xl rounded-3xl my-40 mx-auto right-0 left-0 p-10 "
      >
        <h2 class="text-3xl font-semibold text-center text-[#E07A5F] mb-8">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {!isSignIn && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className={inputStyle("fullName")}
              onChange={handleChange}
              name="fullName"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs">{errors.fullName}</p>
            )}
          </>
        )}
        {!isSignIn && (
          <>
            <input
              type="text"
              placeholder="User Name"
              className={inputStyle("username")}
              onChange={handleChange}
              name="username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </>
        )}
        {!isSignIn && (
          <>
            <input
              type="text"
              placeholder="Email Address"
              className={inputStyle("email")}
              onChange={handleChange}
              name="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </>
        )}
        {!isSignIn && (
          <>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Phone No"
              className={inputStyle("phone")}
              value={form.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                handleChange({ target: { name: "phone", value } });
              }}
              name="phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </>
        )}
        {!isSignIn && (
          <>
            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className={`${inputStyle("password")} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E07A5F]"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </>
        )}
        {isSignIn && (
          <>
            <input
              type="text"
              ref={loginIdRef}
              placeholder="Email or Phone No"
              className={inputStyle("loginId")}
              onChange={handleLoginIdChange}
              name="loginId"
              value={form.loginId}
            />
            {errors.loginId && (
              <p className="text-red-500 text-xs">{errors.loginId}</p>
            )}
          </>
        )}
        {isSignIn && (
          <>
            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className={`${inputStyle("password")} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#E07A5F]"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </>
        )}
        <label className="flex items-center gap-2 text-sm text-[#E07A5F]">
          <input
            type="checkbox"
            className="accent-[#E07A5F]"
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 my-4 rounded-xl bg-[#E07A5F] text-white font-medium
               hover:scale-105 hover:shadow-lg transition duration-200"
        >
          {loading ? (
            <span className="animate-pulse">Loading...</span>
          ) : isSignIn ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </button>
        <p
          class="text-center text-[#E07A5F] text-md mt-6 cursor-pointer hover:scale-105  transition duration-200"
          onClick={toggleSignInForm}
        >
          {isSignIn
            ? " New to SaleMyCraft? Sign Up Now"
            : "Already registered, Sign In now"}
        </p>
      </form>
    </div>
  );
};
export default Login;
