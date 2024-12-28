import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!password || password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateInputs()) {
      return;
    }
  
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      data && navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className="w-full mx-auto mt-10 max-w-2xl h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Social Media Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
      
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          {loading ? "Logging In..." : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-500">
          Register
        </Link>
      </p>
    </MaxWidthWrapper>
  );
};


export default Login;
