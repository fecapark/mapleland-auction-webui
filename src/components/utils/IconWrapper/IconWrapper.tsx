interface IIconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const IconWrapper = ({
  children,
  className = "",
}: IIconWrapperProps) => {
  return (
    <div className={`inline-flex justify-center items-center ${className}`}>
      {children}
    </div>
  );
};
