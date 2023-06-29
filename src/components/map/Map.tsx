import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "store";
import { changePoint, getPoints } from "store/slices/map/MapSlice";
import { stopLoading } from "store/slices/preloader/PreloaderSlice";
import { Toast } from "components/base/Toast";

interface MapComponentProps {}

export const MapComponent: React.FC<MapComponentProps> = () => {
    const [maps, setMaps] = useState<any>(null);
    const [placemark, setPlacemarks] = useState<Array<number>>([0, 0]);
    const dispatch = useDispatch<AppDispatch>();
    const { points } = useAppSelector((state) => state.map);
    const { show } = useAppSelector((state) => state.sidebar);

    useEffect(() => {
        dispatch(getPoints());
    }, [dispatch]);

    const mapState = {
        center: [55.751574, 37.573856],
        zoom: 9,
    };

    const handleClick = (event: any) => {
        if (!show) return;

        const coordinates = event.get("coords");

        setPlacemarks(coordinates);
        dispatch(changePoint({ key: "coords", value: coordinates }));

        let resp = maps.geocode(coordinates);
        resp.then((res: any) => {
            dispatch(
                changePoint({
                    key: "adress",
                    value: res.geoObjects.get(0).getAdministrativeAreas(),
                })
            );
        });
    };

    return (
        <div>
            <YMaps query={{ apikey: `9cb3b8fb-154b-4b84-9cb0-1454b12ea0cd` }}>
                <div>
                    <Map
                        modules={["Map", "geocode"]}
                        onClick={(event: any) => {
                            handleClick(event);
                        }}
                        onLoad={(ymaps) => {
                            dispatch(stopLoading(false));
                            setMaps(ymaps);
                        }}
                        state={mapState}
                        width="100%"
                        height="100vh"
                    >
                        {points.length ? (
                            points.map((point, key) => {
             
                                return (
                                    <Placemark
                                        key={key}
                                        geometry={point.coords}
                                        options={{ preset: "islands#redIcon" }}
                                        modules={["geoObject.addon.balloon"]}
                                        properties={{
                                            balloonContent:
                                                `<div> ${point.title.name} </div>` +
                                                `<div class="placemark-content"> ${point.description.name} </div>`,
                                        }}
                                    />
                        
                                );
                            })
                        ) : (
                            <Toast text="Пусто" />
                        )}

                        <Placemark geometry={placemark} />
                    </Map>
                </div>
            </YMaps>
        </div>
    );
};
