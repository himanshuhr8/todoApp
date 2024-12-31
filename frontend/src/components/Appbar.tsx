import { useState } from "react";
import logout from "../assets/logout";
import profile from "../assets/profile";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile"; // Import the Profile component

interface UserType {
  email: string;
  firstName: string;
  lastName: string;
}
interface AppbarProps {
  user: UserType;
}

const Appbar: React.FC<AppbarProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="shadow h-14 flex justify-between bg-slate-600">
      <div className="flex flex-col justify-center h-full ml-4">
        <div className="text-lg font-bold text-white">ToDo App</div>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4 text-white">
          Hello
        </div>
        <div
          className="flex justify-center mt-1 mr-4 rounded-full h-12 w-12 bg-slate-200 hover:bg-slate-300 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName && user.firstName.length > 0
              ? user.firstName[0].toUpperCase()
              : "?"}
          </div>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-16 bg-slate-200 rounded-lg shadow-lg mr-3 w-36 flex justify-center flex-col z-50">
            <div
              className="p-2 flex flex-row"
              onClick={() => {
                setIsProfileOpen(true); // Open profile modal
                setIsDropdownOpen(false); // Close dropdown
              }}
            >
              <div className="pt-2">{profile}</div>
              <div className="hover: cursor-pointer pl-2">Profile</div>
            </div>
            <div className="p-2 flex flex-row" onClick={logoutHandler}>
              <div className="pt-2">{logout}</div>
              <div className="hover: cursor-pointer pl-2">Logout</div>
            </div>
          </div>
        )}
      </div>

      {/* Render the Profile modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-slate-200 p-6 rounded shadow-md w-96">
            <Profile
              user={{
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              }}
              onUpdate={(message) => {
                setIsProfileOpen(false);
                alert(message);
                navigate("/");
              }}
              onCancel={() => setIsProfileOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appbar;
