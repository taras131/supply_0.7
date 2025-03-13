import { useState } from "react";

export type DrawerMode = "view" | "create";

export interface IDrawerState {
    isOpen: boolean;
    mode: DrawerMode;
    problemId: number | null;
}

const initialState: IDrawerState = {
    isOpen: false,
    mode: "create",
    problemId: null,
};

export const useProblemDrawer = (initial = initialState) => {
    const [drawerState, setDrawerState] = useState<IDrawerState>(initial);

    const openDrawer = (mode: DrawerMode, problemId: number | null = null) => {
        setDrawerState({
            isOpen: true,
            mode,
            problemId,
        });
    };

    const closeDrawer = () => {
        setDrawerState(prev => ({ ...prev, isOpen: false }));
    };

    return {
        drawerState,
        openDrawer,
        closeDrawer,
    };
};