import {
    getRefences, showSidebar,
} from "store/slices/sidebar/SidebarSlice";
import { addPoint, changePoint } from "store/slices/map/MapSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "store";
import { Select } from "components/base/Select";
import { Button } from "components/base";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { show, reference } = useAppSelector((state) => state.sidebar);
    const { point } = useAppSelector((state) => state.map);

    useEffect(() => {

        if (!show) return;
        dispatch(getRefences());
    }, [show]);


    if (!show) return

    return (
        <div className="sidebar">
            <button
                onClick={() => {
                    dispatch(showSidebar(false));
                }}
                className="sidebar__close"
            >
                X
            </button>

            <h3>Выберите адрес на карте</h3>
            {point.adress.length ? (
                <h5>{point.adress}</h5>
            ) : (
                <h5>Адрес не выбран</h5>
            )}

            <Select
                options={reference.titles}
                action={(payload) => {
                    dispatch(changePoint({ key: "title", value: payload }));
                }}
                value={point.title}
            />

            <Select
                options={reference.descriptions}
                action={(payload) => {
                    dispatch(
                        changePoint({ key: "description", value: payload })
                    );
                }}
                value={point.description}
            />

            <Button
                label="добавить"
                action={() => {
                    dispatch(addPoint(point));
                    dispatch(showSidebar(false));
                }}
            />
        </div>
    );
};
