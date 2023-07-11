import React, { useEffect, useState } from "react";
import { LoginBg } from "../assets";
import { logo } from "../assets";
import { LoginInput} from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../context/actions/userActions";
import { alertWarning, alertInfo } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [isSignUp, setisSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      dispatch(alertInfo("Required fields should not be empty"));
    } else {
      if (password === confirm_password) {
        setuserEmail("");
        setconfirm_password("");
        setpassword("");
        await createUserWithEmailAndPassword(
          firebaseAuth,
          userEmail,
          password
        ).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        dispatch(alertWarning("Password doesn't match"));
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    } else {
      dispatch(alertWarning("Password doesn't match"));
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* background image */}
      <img
        src={LoginBg}
        className="w-full h-full object-cover absolute top-0 left-0"
        alt=""
      />

      {/* content box */}
      <div className="flex flex-col items-center w-[80%] md:w-508 h-full z-10 text-cardOverlay backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* top logo section */}
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={logo} className="w-8" alt="" />
          <p className=" text-headingColor font-semibold text-2xl">BakeMeHappy</p>
        </div>

        {/* welcome text */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-xl text-textColor -mt-6">
          {isSignUp ? "Sign Up" : "Sign In"} with following.
        </p>

        {/* input section */}
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Email Here"}
            icon={<FaEnvelope className="text-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunc={setuserEmail}
            type="email"
            isSignUp={isSignUp}
          />

          <LoginInput
            placeholder={"Password Here"}
            icon={<FaLock className="text-xl text-textColor" />}
            inputState={password}
            inputStateFunc={setpassword}
            type="password"
            isSignUp={isSignUp}
          />

          {isSignUp && (
            <LoginInput
              placeholder={"Confirm Password Here"}
              icon={<FaEnvelope className="text-xl text-textColor" />}
              inputState={confirm_password}
              inputStateFunc={setconfirm_password}
              type="password"
              isSignUp={isSignUp}
            />
          )}

          {!isSignUp ? (
            <p className=" text-textColor">
              Doesn't have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setisSignUp(true)}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p className=" text-textColor">
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setisSignUp(false)}
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {/* button section */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>
        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-white opacity-70 backdrop-blur-md cursor-pointer rounded-3xl gap-4"
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">
            Sign-in With Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
