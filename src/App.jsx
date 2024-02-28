import auth from "./appwrite/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    auth
      .currentUser()
      .then((userData) => {
        // console.log(userData)
        if (userData && typeof userData !== "string")
          dispatch(login({ userData }));
        else dispatch(logout());
      })
      .catch((err) => {
        console.log("error in getting the current user");
      })
      .finally(() => {
        setloading(false);
      });
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="w-screen h-screen bg-white flex content-between flex-wrap">
        <div className="block w-full">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
