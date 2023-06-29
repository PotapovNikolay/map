
interface ButtonProps {
    label: string;
    action: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, action }) => {
    return (
        <button
            onClick={() => {
                action();
            }}
            className="button"
        >
            {label}
        </button>
    );
};