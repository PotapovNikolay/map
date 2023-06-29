import { MapComponent } from 'components/map/Map';
import { Button } from 'components/base/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from 'store';
import { showSidebar } from 'store/slices/sidebar/SidebarSlice';
import { removeError } from 'store/slices/map/MapSlice';


interface MainProps{

}

export const Main: React.FC <MainProps> = () =>{

    const dispatch = useDispatch<AppDispatch>();
    const { show } = useAppSelector((state) => state.sidebar);
    const { loading } = useAppSelector((state) => state.preloader);
    
    return (
        <div className="main">
            {/* <img src={map} alt="карта" className='main__image' /> */}
            {!loading && !show && (
                <div className="button__container">
                    <Button
                        label="добавить адрес"
                        action={()=>{dispatch(showSidebar(true)); dispatch(removeError())}}
                    />
                </div>
            )}
            <MapComponent />
        </div>
    );
}