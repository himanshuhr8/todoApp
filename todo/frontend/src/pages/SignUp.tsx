import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import BottomWarning from "../components/BottomWarning";

const SignUp = () => {
  const [userId, setuserId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className={"bg-slate-300 h-screen flex justify-center"}>
      <div className="flex flex-col justify-center">
        <div className="bg-white text-center w-80 p-2 px-4 rounded-lg">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"Email"}
            placeholder={"alice@gmail.com"}
            onChange={(e) => setuserId(e.target.value)}
          />
          <InputBox
            label={"First Name"}
            placeholder={"Hima"}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Raj"}
            onChange={(e) => setlastName(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"12345678"}
            onChange={(e) => setuserPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label={"Sign Up"}
              onClick={async () => {
                try {
                  const response = await axios.post<{ token: string }>(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      email: userId,
                      firstName: firstName,
                      lastName: lastName,
                      password: userPassword,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (e) {
                  alert("Internal server error");
                }
              }}
            />
          </div>
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign In"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};
export default SignUp;
