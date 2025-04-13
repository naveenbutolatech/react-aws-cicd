interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <div >
      <h1>Header</h1>
      <button onClick={onLogout} >Logout</button>
    </div>
  );
}

