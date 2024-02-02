interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Table({ children, className = "" }: Props) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`table-auto card-bg w-[max-content] max-w-auto border-collapse block border-spacing-0 ${className}`}
      >
        {children}
      </table>
    </div>
  );
}

export function TR({ children, className = "" }: Props) {
  return (
    <tr className={`border-t-[1px] border-[#626266] ${className}`}>
      {children}
    </tr>
  );
}

export function TD({ children, className = "" }: Props) {
  return (
    <td
      className={`px-[16px] py-[8px] border-[1px] text-[15px] text-[#e8e8ea] border-[#626266] ${className}`}
    >
      {children}
    </td>
  );
}
