import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { preloaderSlice } from "./slices/preloader/PreloaderSlice";
import { sidebarSlice } from "./slices/sidebar/SidebarSlice";
import { mapSlice } from "./slices/map/MapSlice";

export const store = configureStore({
    reducer: {
        preloader:preloaderSlice.reducer,
        sidebar:sidebarSlice.reducer,
        map:mapSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;