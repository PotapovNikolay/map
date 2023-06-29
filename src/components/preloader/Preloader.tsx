import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
interface PreloaderProps {}

export const Preloader: React.FC<PreloaderProps> = () => {
    const [progress, setProgress] = useState<number>(0);
    const loading = useSelector((state: RootState) => state.preloader.loading);

    function incrementVariable(): void {
        setInterval(() => {
            setProgress((inc) => inc + 10);
        }, 50);
    }

    useEffect(() => {
        if (loading) {
            if (progress < 91) {
                incrementVariable();
            } else {
                setProgress(99);
            }
        }
    }, [loading, progress]);

    return (
        loading && (
            <div className="loader">
                <div className="loader__shadow"></div>
                <div className="loader__box"></div>
                <div className="loader__progress">{progress}%</div>
            </div>
        )
    );
};
