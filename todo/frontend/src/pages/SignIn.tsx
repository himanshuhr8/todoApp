import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";

const SignIn = () => {
  const [userId, setuserId] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className={"bg-slate-300 h-screen flex justify-center"}>
      <div className="flex flex-col justify-center">
        <div className="bg-white text-center w-80 p-2 px-4 rounded-lg">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"UserId"}
            placeholder={"alice@gmail.com"}
            onChange={(e) => setuserId(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"12345678"}
            onChange={(e) => setuserPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label={"Sign In"}
              onClick={async () => {
                try {
                  const response = await axios.post<{ token: string }>(
                    "http://localhost:3000/api/v1/user/login",
                    {
                      email: userId,
                      password: userPassword,
                    }
                  );

                  if (response.status !== 200) {
                    alert("Invalid user and password");
                    return;
                  }
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (e) {
                  alert("Invalid user and password");
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            to={"/signup"}
            buttonText="Sign Up"
          />
        </div>
      </div>
    </div>
  );
};
export default SignIn;
