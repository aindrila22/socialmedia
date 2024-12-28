import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import Navbar from "./components/Navbar";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { Loader2 } from "lucide-react";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAsync } from "./redux/slice/userSlice";

const Signup = lazy(() => import("./components/Signup"));
const NotFound = lazy(() => import("./components/NotFound"));
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  const dispatch = useDispatch();
  const { details: user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserAsync(token));
    }
  }, [dispatch]);

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