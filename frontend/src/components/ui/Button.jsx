const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
      rounded-lg
      px-4
      py-2
      font-medium
      transition-all
      duration-200
      disabled:cursor-not-allowed
      disabled:bg-slate-400
      ${variants[variant]}
      ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
