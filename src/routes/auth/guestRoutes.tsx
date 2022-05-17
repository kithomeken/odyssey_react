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
]