interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success';
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const styles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100",
    danger: "bg-red-500 hover:bg-red-600 shadow-red-100",
    success: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100"
  };

  return (
    <button 
      {...props}
      className={`${styles[variant]} text-white px-6 py-2 rounded-xl font-bold transition-all active:scale-95 shadow-lg disabled:opacity-50`}
    >
      {children}
    </button>
  );
}