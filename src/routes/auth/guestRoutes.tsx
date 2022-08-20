import { AgentInvitation } from "../../pages/auth/AgentInvitation";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import { PostInvitationAuth } from "../../pages/auth/PostInvitationAuth";
import SignIn from "../../pages/auth/SignIn";

interface GuestRouteInterface {
    name: string,
    path: string;
    element: any;
    caseSensitive?: boolean;
}

export const guestRoutes: Array<GuestRouteInterface> = [
    { path: "/auth/sign-in", element: <SignIn />, caseSensitive: true, name: 'SIGN_IN' },
    { path: "/auth/forgot-password", element: <ForgotPassword />, caseSensitive: true, name: 'FGRT_PWD' },
    { path: "/api/u/auth/account/invtn/agn", element: <AgentInvitation />, caseSensitive: true, name: 'AGN_INV' },
    { path: "/auth-auto/sign-in/post/inv", element: <PostInvitationAuth />, caseSensitive: true, name: 'POST_INVITATION_AUTH_' },
]









// http://localhost:3000/u/account/set-up/invtn/5-agn/5453c4d4983b084bee4f0d063a97ea7a4e0d37fd7ceb4c61c864f842279ace10?expires=1660426192&signature=78b7f0714f538613fe98e40d74df93b8976a0ab71202f99d9243c18897955037

// http://localhost:3000/u/account/set-up/invtn/4b8c991f-1350-456e-961f-7b4d7877c549/agn/45b70782748cb1e6090f6c0ae20256c35e697c137c0bf4dc38b71566c24d7f76?expires=1660763344&signature=7fca6b50430a8edd1af01586d8bef45cbf7ca14e8b520ab6d83a3398eb058afa