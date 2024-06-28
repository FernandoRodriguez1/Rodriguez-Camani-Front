import React, { useContext, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Theme/ThemeContext";

const ToggleTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, [theme, setTheme]);

  return (
    <div className="darklightButton">
      <FontAwesomeIcon
        icon={faSun}
        className="iconDL"
        size="xl"
        style={{ color: theme === "light" ? "#FDB813" : "#ccc" }}
      />
      <label className="switch-button">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === "dark"}
        />
        <span className="slider-button round"></span>
      </label>
      <FontAwesomeIcon
        icon={faMoon}
        className="iconDL"
        size="xl"
        style={{ color: theme === "dark" ? "#4A4A4A" : "#ccc" }}
      />
    </div>
  );
};

export default ToggleTheme;
