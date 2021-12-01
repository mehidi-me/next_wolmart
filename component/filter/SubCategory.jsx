import { data } from "jquery";
import Link from "next/link";
import React, { useContext, useState } from "react";
import AppContext from "../../storeData/AppContext";

export default function SubCategory({ subCategory, id, name }) {
  const {
    state: { category },
  } = useContext(AppContext);

  const [showm, setshowm] = useState("");
  const [cmshow, setcmshow] = useState("");

  const closeMenubar = () => {
    document.querySelector("body").classList.remove("sidebar-active");
  };
  return (
    <li className={showm == id ? "show" : ""}>
      <a className="collapsed" style={{ fontSize: "1.4rem" }}>
        <Link onClick={closeMenubar} href={`/products?categories=${id}`}>
          {name}
        </Link>
        <span
          onClick={() => setshowm(id)}
          className={showm == id ? "toggle-btn2-show" : "toggle-btn2"}
        />
      </a>

      <ul style={showm == id ? { display: "block" } : { display: "none" }}>
        {subCategory.length
          ? subCategory.map((v) => (
              <li className={cmshow == v.id ? "show" : ""}>
                <a style={{ fontSize: "1.4rem" }}>
                  <Link
                    onClick={closeMenubar}
                    href={`/products?categories=${v.id}`}
                  >
                    {v.name}
                  </Link>
                  <span
                    onClick={() => setcmshow(v.id)}
                    className={
                      cmshow == v.id ? "toggle-btn2-show" : "toggle-btn2"
                    }
                  />
                </a>
                <ul
                  style={
                    cmshow == v.id ? { display: "block" } : { display: "none" }
                  }
                >
                  {category
                    .filter((data) => data.parent_id == v.id)
                    .map((v) => (
                      <li>
                        <a style={{ fontSize: "1.4rem" }}>
                          {" "}
                          <Link
                            onClick={closeMenubar}
                            href={`/products?categories=${v.id}`}
                          >
                            {v.name}
                          </Link>
                        </a>
                      </li>
                    ))}
                </ul>
              </li>
            ))
          : null}
      </ul>
    </li>
  );
}
