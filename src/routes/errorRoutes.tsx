import { ExpiredUserAccess } from "../pages/errors/ExpiredUserAccess";
import { SuspendedAccount } from "../pages/errors/SuspendedAccount";

interface ErrorRouteInterface {
    name: string,
    path: string;
    element: any;
    caseSensitive?: boolean;
}

export const standardErrorRoutes: Array<ErrorRouteInterface> = [
    { path: "/u/default/account/suspended", element: <SuspendedAccount />, caseSensitive: true, name: 'SSPND_ACC' },
    { path: "/u/default/account/access-expired", element: <ExpiredUserAccess />, caseSensitive: true, name: 'EXPRD_ACC_' },
]