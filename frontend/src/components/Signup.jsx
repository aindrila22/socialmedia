import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '@/utils/api';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const errors = {};
    if (!firstName || firstName.length < 2) {
      errors.firstName = 'Username must be at least 2 characters long.';
    }
    if (!lastName || lastName.length < 2) {
      errors.lastName = 'Username must be at least 2 characters long.';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!password || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
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
      const user = await registerUser({ firstName, lastName, email, password });
      user && navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className="w-full mx-auto mt-10 max-w-2xl h-[80vh]">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {fieldErrors.firstName && (
            <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {fieldErrors.lastName && (
            <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>
          )}
        </div>
        <div>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Button type="submit" className="w-full">
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?
        <Link to="/" className="text-blue-500 ml-3">
          Login
        </Link>
      </p>
    </MaxWidthWrapper>
  );
};


export default Signup;