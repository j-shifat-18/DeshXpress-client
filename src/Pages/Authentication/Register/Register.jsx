import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser , signInWithGoogle} = useAuth();

  const handleRegister = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleGoogleLogin = ()=>{
    signInWithGoogle()
    .then(result =>{
      console.log(result)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className="card text-black  w-full max-w-md shrink-0 ">
      <div className="card-body">
        <h1 className="text-4xl font-extrabold">Create an Account</h1>
        <p className="font-medium text-lg mb-5">Register with DeshXpress</p>
        <form className="fieldset" onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <label className="label font-medium text-[#0F172A] text-base">
            Name
          </label>
          <input
            type="text"
            {...register("name", {
              required: true,
            })}
            className="input bg-white w-full border-[#CBD5E1]"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500 text-base">Please enter your name .</p>
          )}

          {/* Email */}
          <label className="label font-medium text-[#0F172A] text-base">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="input bg-white w-full border-[#CBD5E1]"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-base">Please enter your Email .</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-500 text-base">
              Please enter a valid Email .
            </p>
          )}

          {/* Password */}
          <label className="label font-medium text-[#0F172A] text-base">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
            })}
            className="input w-full bg-white border-[#CBD5E1]"
            placeholder="Password"
          />

          {errors.password?.type === "required" && (
            <p className="text-red-500 text-base">Please enter Password .</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-base">
              Password must have one uppercase , one lower case and one special
              character.
            </p>
          )}

          {/* Register Button */}
          <button className="btn text-lg mt-4 bg-primary mb-3">Register</button>

          {/* Login Link */}
          <div>
            <p className=" text-base">
              Already have an account ?{" "}
              <Link to='/login' className="text-[#8FA748] link link-hover">Login</Link>
            </p>
          </div>
        </form>

        <div>
          <p className="text-[#8FA748] text-center">Or</p>
        </div>

        {/* Google login */}
        <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
