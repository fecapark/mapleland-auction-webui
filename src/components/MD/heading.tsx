interface Props {
  className?: string;
  children: React.ReactNode;
}

export function H1({ children, className = "" }: Props) {
  return (
    <h1 className={`text-3xl xs:text-5xl font-bold leading-[1.3] ${className}`}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "" }: Props) {
  return (
    <h2 className={`text-2xl xs:text-4xl font-bold mt-16 mb-6 ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "" }: Props) {
  return (
    <h3 className={`text-xl xs:text-3xl font-bold mt-12 mb-4 ${className}`}>
      {children}
    </h3>
  );
}
