import { AgentInvitation } from "../../pages/auth/AgentInvitation";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import PostAuthentication from "../../pages/auth/PostAuthentication";
import SignIn from "../../pages/auth/SignIn";

interface GuestRouteInterface {
    path: string;
    element: any;
    caseSensitive?: boolean;
}

export const guestRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", element: <SignIn />, caseSensitive: true },
    { path: "/auth/forgot-password", element: <ForgotPassword />, caseSensitive: true },

    { path: "/api/u/auth/account/invtn/agn", element: <AgentInvitation />, caseSensitive: true },
]

// http://localhost:3000/u/account/set-up/invtn/5-agn/5453c4d4983b084bee4f0d063a97ea7a4e0d37fd7ceb4c61c864f842279ace10?expires=1660426192&signature=78b7f0714f538613fe98e40d74df93b8976a0ab71202f99d9243c18897955037

// http://localhost:3000/u/account/set-up/invtn/4b8c991f-1350-456e-961f-7b4d7877c549/agn/45b70782748cb1e6090f6c0ae20256c35e697c137c0bf4dc38b71566c24d7f76?expires=1660763344&signature=7fca6b50430a8edd1af01586d8bef45cbf7ca14e8b520ab6d83a3398eb058afa