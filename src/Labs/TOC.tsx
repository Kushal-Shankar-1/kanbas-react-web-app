import React from "react";
import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();

  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className={`nav-link ${pathname === "/Labs" ? "active" : ""}`}>
          Labs
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a1" href="#/Labs/Lab1" className={`nav-link ${pathname === "/Labs/Lab1" ? "active" : ""}`}>
          Lab 1
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a2" href="#/Labs/Lab2" className={`nav-link ${pathname === "/Labs/Lab2" ? "active" : ""}`}>
          Lab 2
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-a3" href="#/Labs/Lab3" className={`nav-link ${pathname === "/Labs/Lab3" ? "active" : ""}`}>
          Lab 3
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-k" href="#/Kanbas" className={`nav-link ${pathname === "/Kanbas" ? "active" : ""}`}>
          Kanbas
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-github" href="https://github.com/Kushal-Shankar-1/kanbas-react-web-app" className="nav-link">
          GitHub Repository
        </a>
      </li>
    </ul>
  );
}
