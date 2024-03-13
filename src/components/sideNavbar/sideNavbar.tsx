import logo from "../../assets/png/logo-no-background.png";
import NavigateLink from "../navigateLinks/navigateLink";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import "../sideNavbar/sideNavbar.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const SideNavbar = ({ className }: { className: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies();
  const logoffUser = () => {
    queryClient.removeQueries();
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <div className={`${className} sidebar`}>
      <img src={logo} className="sidebar-logo" alt="logo" />
      <div className="sidebar-menu">
        <NavigateLink to="/" type="Home">
          <IoHomeOutline size={25} />
        </NavigateLink>
        <NavigateLink to="/product" type="Products">
          <FaBoxOpen size={25} />
        </NavigateLink>
        <NavigateLink to="/stock" type="Stock">
          <MdOutlineInventory size={25} />
        </NavigateLink>
        <NavigateLink to="/sales" type="Sales">
          <GiProgression size={25} />
        </NavigateLink>
        <button onClick={logoffUser} className="link">
          <CgProfile size={25} />
          <span className="link-name">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
