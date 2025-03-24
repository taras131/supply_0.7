import React from "react";
import {routes} from "../utils/routes";
import MainMenu from "../pages/MainMenu";
import Invoices from "../features/invoices/ui/Invoices";
import {Navigate} from "react-router-dom";
import InvoiceDetails from "../features/invoices/ui/InvoiceDetails";
import InvoicesAddNew from "../features/invoices/ui/InvoicesAddNew";
import Suppliers from "../pages/Suppliers";
import Shipments from "../features/shipments/ui/Shipments";
import ShipmentsAddNew from "../features/shipments/ui/ShipmentsAddNew";
import Orders from "../features/orders/ui/Orders";
import OrderDetails from "../features/orders/ui/OrderDetails";
import Users from "../features/users/ui/Users";
import Auth from "../features/auth/ui/Auth";
import Profile from "../features/auth/ui/Profile";
import MachineryPage from "../features/machinery/ui/MachineryPage";
import MachineryDetailsPage from "../features/machinery/ui/MachineryDetailsPage";
import MachineryAddNewPage from "../features/machinery/ui/MachineryAddNewPage";
import TaskAddNewPage from "../features/tasks/ui/TaskAddNewPage";
import TaskDetailsPage from "../features/tasks/ui/TaskDetailsPage";
import ProblemsPage from "../features/problems/ui/ProblemsPage";
import TasksPage from "../features/tasks/ui/TasksPage";


export interface IBaseRoutes {
    path: string
    element: React.ReactNode;
    label: string;
    showInMenu: boolean;
}

export interface IRouteConfig extends IBaseRoutes {
    subRoutes?: IBaseRoutes [];
}

export const routesConfig: IRouteConfig[] = [
    {path: routes.main, element: <MainMenu/>, label: "Главная", showInMenu: true},
    {path: routes.invoices, element: <Invoices/>, label: "Счета", showInMenu: true},
    {path: routes.invoicesDetails, element: <InvoiceDetails/>, label: "Подробности", showInMenu: false},
    {path: routes.invoicesAddNew, element: <InvoicesAddNew/>, label: "Новый счёт", showInMenu: false},
    {path: routes.suppliers, element: <Suppliers/>, label: "Поставщики", showInMenu: true},
    {path: routes.shipments, element: <Shipments/>, label: "Отгрузки", showInMenu: true},
    {path: routes.addNewShipments, element: <ShipmentsAddNew/>, label: "Новая отгрузка", showInMenu: false},
    {path: routes.orders, element: <Orders/>, label: "Заявки", showInMenu: true},
    {path: routes.ordersDetails, element: <OrderDetails/>, label: "Подробности", showInMenu: false},
    {path: routes.users, element: <Users/>, label: "Сотрудники", showInMenu: true},
    {path: routes.login, element: <Auth/>, label: "Вход", showInMenu: false},
    {path: routes.register, element: <Auth/>, label: "Регистрация", showInMenu: false},
    {path: routes.profile, element: <Profile/>, label: "Профиль", showInMenu: false},
    {path: routes.machineryDetails, element: <MachineryDetailsPage/>, label: "Подробности", showInMenu: false},
    {path: routes.addNewMachinery, element: <MachineryAddNewPage/>, label: "Новая техника", showInMenu: false},
    {path: routes.machineryAddTask, element: <TaskAddNewPage/>, label: "Новая проблема", showInMenu: false},
    {path: routes.machineryTaskDetails, element: <TaskDetailsPage/>, label: "Подробности задачи", showInMenu: false},
    {
        path: routes.machinery,
        element: <MachineryPage/>, // Главная страница для раздела "Техника"
        label: "Техника",
        showInMenu: true,
        subRoutes: [ // Добавляем подпункты
            {
                path: routes.machineryList,
                element: <MachineryPage/>,
                label: "Список",
                showInMenu: true,
            },
            {
                path: routes.problems,
                element: <ProblemsPage/>,
                label: "Проблемы",
                showInMenu: true,
            },
            {
                path: routes.tasks,
                element: <TasksPage/>,
                label: "Задачи",
                showInMenu: true,
            },
        ],
    },
    {path: "*", element: <Navigate to={routes.main}/>, label: "Not found", showInMenu: false},
];