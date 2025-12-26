import "../styles/background.css";

type Props = {
  children: React.ReactNode;
};

export default function Background({ children }: Props) {
  return (
    <div className="bg-wrapper">
      <div className="bg-card">{children}</div>
    </div>
  );
}
