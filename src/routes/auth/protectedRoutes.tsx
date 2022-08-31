import Home from "../../pages/home/Home";
import FromIndexToHome from "../../lib/redirects/FromIndexToHome";
import { PostAuthentication } from "../../pages/auth/PostAuthentication";
import { PostInvitationAuth } from "../../pages/auth/PostInvitationAuth";
import { AccountProfile } from "../../pages/account/AccountProfile";

interface ProtectedRouteInterface {
    name: string,
    path: string;
    element: any;
    activeMenu: any,
    caseSensitive?: boolean;
}

export const protectedRoutes: Array<ProtectedRouteInterface> = [
    { path: "/home", element: <Home />, activeMenu: 'Y', caseSensitive: true, name: 'HOME_' },
    { path: "/", element: <FromIndexToHome />, activeMenu: 'N', caseSensitive: true, name: 'INDEX_' },
    { path: "/u/default/authenticated/account/prof", element: <AccountProfile />, activeMenu: 'N', caseSensitive: true, name: 'PROF_AC' },
]

export const postAuthRoute: Array<ProtectedRouteInterface> = [
    { path: "/post-auth/account/access", element: <PostAuthentication />, activeMenu: 'N', caseSensitive: true, name: 'POST_AUTH_' },
    { path: "/auth-auto/sign-in/post/inv", element: <PostInvitationAuth />, activeMenu: 'N', caseSensitive: true, name: 'POST_INV_AUTH_' },
]