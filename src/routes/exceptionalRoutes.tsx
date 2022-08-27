import { EmailVerification } from "../pages/account/EmailVerification";

interface ExceptionalRouteInterface {
    name: string,
    path: string;
    element: any;
    caseSensitive?: boolean;
}

export const exceptionalRoutes: Array<ExceptionalRouteInterface> = [
    { path: "/u/account/email/verification", element: <EmailVerification />, caseSensitive: true, name: 'VRFY_EMAIL' },
]