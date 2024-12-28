import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { Loader2 } from "lucide-react";
import { fetchUserDetails } from "./utils/api";
import Profile from "./components/Profile";

const Signup = lazy(() => import("./components/Signup"));
const NotFound = lazy(() => import("./components/NotFound"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. Redirecting to login.");
      setLoading(false);
      return;
    }

    const getUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails(token);
        setUser(userDetails);

      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details.");
        console.log(error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, [ error]);

  if (loading) {
    return (
      <MaxWidthWrapper>
        <div className="min-h-screen flex justify-center items-center w-full mx-auto">
          <Loader2 className="animate-spin h-10 w-10 text-zinc-500 mb-2" />
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col">
        <Navbar user={user}/>
        <Suspense
          fallback={
            <MaxWidthWrapper>
              <div className="min-h-screen flex justify-center items-center w-full mx-auto">
                <Loader2 className="animate-spin h-6 w-6 lg:h-10 lg:w-10 text-zinc-500 mb-2" />
              </div>
            </MaxWidthWrapper>
          }
        >
          <div className="flex flex-col px-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
             <Route path="/profile/:id" element={<Profile user={user}/>} />
            <Route path="/" element={user ? <Dashboard user={user}/> : <Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;