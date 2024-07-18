import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/features/authSlice";

const Navbarr = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-400 w-full h-16 flex items-center justify-between px-5">
      <div className="text-3xl font-bold">Admin Panel</div>
      <div className="flex justify-evenly w-1/2 items-center text-xl font-semibold">
        <Link to={"/courses"}>
          <div>Courses</div>
        </Link>
        <Link to={"/instructors"}>
          <div>Instructors</div>
        </Link>
        <Button onClick={() => dispatch(logout())} className="text-lg font-medium">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbarr;
