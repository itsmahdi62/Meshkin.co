import { Link, useNavigate } from "react-router-dom";
const LinkButton = ({ children, to }) => {
  const navigate = useNavigate();
  const className = "text-sm text-stone-100 hover:shadow-2xl";
  if (to === "-1") return;
  <button className={className} onClick={() => navigate(-1)}>
    {children}
  </button>;

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default LinkButton;
