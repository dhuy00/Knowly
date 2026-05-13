import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { motion } from "motion/react";

import {
  Zap,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

export default function Register() {
  const navigate = useNavigate();

  // assume your hook already has register()
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    if (!form.name.trim()) {
      return "Name is required";
    }

    if (form.name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      return "Email is required";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Invalid email address";
    }

    if (!form.password.trim()) {
      return "Password is required";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!form.confirmPassword.trim()) {
      return "Please confirm your password";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      const result = await register({
        username: form.name,
        email: form.email,
        password: form.password,
      });

      if (!result.success) {
        toast.error(result.message || "Register failed");
        return;
      }

      toast.success("Account created successfully");

      navigate("/login");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0a0a0a] font-inter">
      {/* LEFT */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0f1419] to-[#0a0a0a]">
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <Zap className="w-7 h-7 text-primary" fill="currentColor" />
            </div>

            <span className="text-xl font-semibold">TaskFlow</span>
          </div>

          {/* CENTER */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                className="relative bg-primary/10 border border-primary/20 rounded-3xl p-10 backdrop-blur-xl"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                }}
              >
                <Sparkles
                  className="w-32 h-32 text-primary"
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* FOOTER */}
          <div>          
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <Zap className="w-7 h-7 text-primary" fill="currentColor" />
            </div>

            <span className="text-2xl font-semibold text-white">
              TaskFlow
            </span>
          </div>

          {/* CARD */}
          <div className="bg-[#111111] border border-primary/10 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">
                Create Account
              </h1>

              <p className="text-gray-400">
                Start managing your tasks smarter
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Username
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="
                      w-full
                      bg-[#0a0a0a]
                      border border-gray-700
                      rounded-xl
                      pl-12
                      pr-4
                      py-3
                      text-white
                      outline-none
                      focus:border-primary
                      transition-all
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="
                      w-full
                      bg-[#0a0a0a]
                      border border-gray-700
                      rounded-xl
                      pl-12
                      pr-4
                      py-3
                      text-white
                      outline-none
                      focus:border-primary
                      transition-all
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="
                      w-full
                      bg-[#0a0a0a]
                      border border-gray-700
                      rounded-xl
                      pl-12
                      pr-12
                      py-3
                      text-white
                      outline-none
                      focus:border-primary
                      transition-all
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="
                      w-full
                      bg-[#0a0a0a]
                      border border-gray-700
                      rounded-xl
                      pl-12
                      pr-12
                      py-3
                      text-white
                      outline-none
                      focus:border-primary
                      transition-all
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={loading}
                type="submit"
                className="
                  w-full
                  bg-primary
                  text-black
                  font-semibold
                  py-3
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* FOOTER */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}