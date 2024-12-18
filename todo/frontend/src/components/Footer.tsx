import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-slate-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-lg">
            Made with <span className="heart">❤️</span> by{" "}
            <span className="font-charm text-lg ">Himanshu Raj</span>
          </h3>
        </div>

        {/* Middle Section */}
        <div className="mb-4 md:mb-0 text-center">
          <h3 className="text-lg">Copyright © {year}</h3>
        </div>

        {/* Right Section */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/himanshuhr8"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/himanshu-raj-1053a4260/"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href="https://www.instagram.com/himanshu.raj_"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram size={24} />
          </a>
          <a
            href="https://twitter.com/Himanshu_raj_"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTwitter size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
