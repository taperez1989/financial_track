import { SignIn } from "@clerk/clerk-react";

export const Login = () => {
    return (
        <div className="auth-container">
            <h2>Login to Financial Tracker</h2>
            <SignIn path="Login" routing="path" />

        </div>
    )
};