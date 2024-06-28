// NavBarFooter.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../Theme/ThemeContext";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import CustomChatbot from "./../ChatBot/ChatBotComponent";
const NavBarFooter = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`navbar-footer ${theme}`}>
      <NavBar theme={theme} />
      <Outlet />
      <CustomChatbot />
      <Footer theme={theme} />
    </div>
  );
};

export default NavBarFooter;
