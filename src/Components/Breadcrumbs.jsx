import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div>
      <ul className="flex space-x-2">
        <li className="after:content-['>'] after:pl-2">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li
              key={to}
              className={!isLast ? "after:content-['>'] after:pl-2" : ""}
            >
              {isLast ? (
                <span className="text-gray-500 capitalize">{value}</span>
              ) : (
                <Link to={to} className="capitalize">
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
