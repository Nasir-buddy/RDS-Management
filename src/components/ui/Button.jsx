
const Button = ({ onClick, children, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md transition duration-200 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;