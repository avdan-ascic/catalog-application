import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Cover from "./components/Cover";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import ViewItem from "./components/ViewItem";
import EditItem from "./components/EditItem";
import About from "./components/About";
import Contact from "./components/Contact";

export const UserContext = createContext(null);

const MainRouter = () => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { id: "", name: "" };
  });
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedLoggedin = sessionStorage.getItem("loggedIn");
    return storedLoggedin ? JSON.parse(storedLoggedin) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [loggedIn, user]);

  return (
    <UserContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      <Header />
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/item/:itemId" element={<ViewItem />} />
        <Route path="/editItem/:itemId" element={<EditItem />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default MainRouter;
