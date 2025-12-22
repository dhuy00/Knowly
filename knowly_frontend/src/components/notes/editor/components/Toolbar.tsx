type Props = {
  onBold: () => void;
};

export default function Toolbar({ onBold }: Props) {
  return (
    <div className="toolbar">
      <button onMouseDown={e => e.preventDefault()} onClick={onBold}>
        Bold
      </button>
    </div>
  );
}
