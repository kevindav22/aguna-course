type TButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'dark' | 'ghost';
  size?: 'normal' | 'small';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, variant = 'primary', size = 'normal', ...props }: TButtonProps) => {
  const baseStyle = 'inline-flex gap-2 duration-300 justify-center items-center cursor-pointer hover:scale-103';
  const variantStyle = {
    primary: 'bg-primary text-white hover:bg-primary85',
    dark: 'bg-dark text-white hover:bg-dark/85',
    ghost: 'bg-transparent hover:bg-gray-200 text-dark',
  };
  const sizeStyle = {
    normal: 'px-9 py-4',
    small: 'px-7 py-[10px]',
  };

  return (
    <button className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
