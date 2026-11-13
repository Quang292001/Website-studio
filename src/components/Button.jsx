import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

// variant: primary | outline | light — icon: tên icon mũi tên (tuỳ chọn)
export default function Button({ to, variant = "primary", icon, children, ...rest }) {
  const cls = `btn btn--${variant}`;
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );
  return to ? (
    <Link to={to} className={cls} {...rest}>{content}</Link>
  ) : (
    <button type="button" className={cls} {...rest}>{content}</button>
  );
}
