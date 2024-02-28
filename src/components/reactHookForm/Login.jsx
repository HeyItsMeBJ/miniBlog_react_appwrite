import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "../index";
import { Link } from "react-router-dom";
import auth from "../../appwrite/auth";
import { login,logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import conf from "../../conf/conf";

function Signin() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = React.useState(false);

  // console.log(useSelector(state=>state.auth.userData))
  const onSubmit = async (data) => {
    // console.log(data,'in');
    try {
      if (data) {
        const session = await auth.login(data);
        // console.log(session)
        if (session) {
          await auth.currentUser().then((response) => {
            console.log(response)
            dispatch(login({userData:response}));
            navigate("/all_post");
          });
         
         
        }
      }
    } catch (error) {
      console.log(error);
      seterror(error.message);
    }
  };

  return (
    <div className="w-1/3 bg-gray-200 py-11 border-2 border-solid border-gray-500 rounded-lg shadow-lg shadow-black">
      {error && (
        <p className="text-red-700 block text-center">Error: {error}</p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full py-2 flex flex-col justify-center flex-wrap items-center gap-7"
      >
        <div className="w-4/5">
          <Input
            label="Email: "
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) => {
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email address";
                },
              },
            })}
          />
        </div>
        <div className="w-4/5">
          <Input
            label="Password: "
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
        </div>
        <div className="w-4/5 flex flex-wrap items-center justify-center bg-slate-200">
          <Button
            type="submit"
            bgColor="bg-slate-200"
            textColor="text-black"
            className=" border-2 border-solid border-blue-300 w-4/5 h-11 hover:bg-slate-400 rounded-lg flex flex-wrap justify-center items-center"
          >
            Login
          </Button>
        </div>
        <Link to={"/signup"}>
          <div className="bg-slate-200 border-2 border-solid border-blue-300  text-black w-[100px] h-11 hover:bg-slate-400 rounded-lg flex flex-wrap justify-center items-center">
            Sign UP
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Signin;
