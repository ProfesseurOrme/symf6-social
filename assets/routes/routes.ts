import Home from "../views/Home";
import Picture from "../views/pictures/Picture";
import React from "react";
import Login from "../views/login/Login.";
import SignIn from "../views/signin/SignIn";
import NotFound from "../views/error/NotFound";

type Route = { path: string, name: string, Component: React.FunctionComponent };

export const routes: Array<Route> = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/pictures/:id', name: 'Picture', Component: Picture},
    {path : '/login', name : 'Login', Component: Login},
    {path: '/signin', name: 'SignIn', Component: SignIn}
]

export const routesProtected : Array<Route> = [];

export const notFoundRoutes : Route = {path : '*', name : 'NotFound', Component: NotFound}