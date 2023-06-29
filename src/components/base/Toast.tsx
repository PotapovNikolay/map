
interface ToastProps{
    text:string
}

export const Toast: React.FC<ToastProps> = ({text}) => {

    return (
        <div className="toast">
            <div className="toast__label">
                <h3>{text}</h3>
            </div>
        </div>
    );
};