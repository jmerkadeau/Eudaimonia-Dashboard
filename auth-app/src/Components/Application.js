import React from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import PasswordReset from "./PasswordReset";

//importing everything here so we can use this file to render everything

//setting up paths for routing
function Application() {
    const user = null;
    return (
        user ?
        <ProfilePage /> :

        <Router>
            <SignIn path="signIn" />
            <SignUp path="signUp" />
            <PasswordReset path="passwordReset" />


        </Router>
    );
}

export default Application;