import {  NavLink } from "react-router-dom";
import "../navigateLinks/navigateLink.scss";
const NavigateLink = ({
  className,
  type,
  to,
  children,
}: {
  className?: string;
  type: string;
  to: string;
  children: React.ReactNode;
}) => (
  <NavLink to={to} className={`${className} link`}>
    {children}
    <span className="link-name">{type}</span>
  </NavLink>
);
export default NavigateLink;
