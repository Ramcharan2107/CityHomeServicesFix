import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

import LoginModal from "../components/auth/LoginModal";
import RegisterModal from "../components/auth/RegisterModal";

function PublicLayout() {

    const [showLogin, setShowLogin] = useState(false);

    const [showRegister, setShowRegister] = useState(false);

    return (

        <>

            <Navbar
                setShowLogin={setShowLogin}
                setShowRegister={setShowRegister}
            />

            <Outlet
                context={{
                    setShowLogin,
                    setShowRegister
                }}
            />

            <Footer />

            <LoginModal
                show={showLogin}
                onClose={() => setShowLogin(false)}
                onRegister={() => {

                    setShowLogin(false);

                    setShowRegister(true);

                }}
            />

            <RegisterModal
                show={showRegister}
                onClose={() => setShowRegister(false)}
                onLogin={() => {

                    setShowRegister(false);

                    setShowLogin(true);

                }}
            />

        </>

    );

}

export default PublicLayout;