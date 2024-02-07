export function UL(props: { children?: React.ReactNode; className?: string }) {
  return (
    <ul className={`${props.className} list-outside my-3 pl-8`}>
      {props.children}
    </ul>
  );
}

export function LI(props: { children?: React.ReactNode; className?: string }) {
  return (
    <li
      className={`${props.className} mb-2`}
      style={{ listStyleType: "circle" }}
    >
      {props.children}
    </li>
  );
}
