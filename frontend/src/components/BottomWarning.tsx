import { Link } from "react-router-dom";
interface BottomWarningProps {
  label: string;
  buttonText: string;
  to: string;
}

const BottomWarning: React.FC<BottomWarningProps> = ({
  label,
  buttonText,
  to,
}) => {
  return (
    <div className="text-sm py-2 flex justify-center">
      <div>{label}</div>
      <Link className="underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};
export default BottomWarning;
