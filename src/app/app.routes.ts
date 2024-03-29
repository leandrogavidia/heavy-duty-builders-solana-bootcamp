import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import("./balance-page.component").then((m) => m.BalancePageComponent)
    },
    {
        path: "settings",
        loadComponent: () =>
            import("./settings-page.component").then((m) => m.SettingsPageComponent)
    },
    {
        path: "**",
        redirectTo: ""
    }
];
