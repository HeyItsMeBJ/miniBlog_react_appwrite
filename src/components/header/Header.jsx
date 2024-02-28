import React, { useEffect } from "react";
import { Login, Logo, LogoutBt, Signup } from "../index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const status = useSelector((state) => state.auth.status);
  // const userData = useSelector((state) => state.auth.userData);
  const [isactive, setIsactive] = React.useState(status);
  const tags = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !isactive },
    { name: "Signup", slug: "/signup", active: !isactive },
    { name: "All Posts", slug: "/all_post", active: isactive },
    { name: "Add Post", slug: "/add_post", active: isactive },
  ];
  // console.log(userData, status, isactive);
  useEffect(() => {
    setIsactive(status);
  }, [status]);
  return (
    <>
      <header className=" flex w-full h-16 bg-gray-500 justify-around flex-wrap items-center">
        <Link to="/">
          <div className="w-20 flex flex-wrap justify-center items-center">
            <Logo />
          </div>
        </Link>
        <div className="w-2/5 flex justify-around flex-wrap items-center">
          <ul className="w-full flex justify-around flex-wrap items-center" key='gfdxfzcfgtrytsexc'>
            {tags.map((tag) =>
              tag.active ? (
                <Link to={tag.slug}>
                  <li
                    className="inline px-4 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer"
                    key={tag.name}
                  >
                    {tag.name}
                  </li>
                </Link>
              ) : (
                ""
              )
            )}
            {isactive ? (
              <li key="logoutbt">
                <LogoutBt />
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </header>
      {/* <Login/><Signup/> */}
    </>
  );
}

export default Header;
