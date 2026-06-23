interface ModalControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onDelete: () => void;
}

export const ModalControls = ({
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight,
  onDelete,
}: ModalControlsProps) => {
  return (
    <div
      className="
        absolute bottom-6 left-1/2 -translate-x-1/2 z-50
        flex gap-3 rounded-xl
        bg-[#0A2540]/90 backdrop-blur-md
        p-3 shadow-2xl border border-[#7ED957]/40
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* Botón base */}
      {[
        { label: "+", title: "Acercar", action: onZoomIn },
        { label: "-", title: "Alejar", action: onZoomOut },
        { label: "↺", title: "Rotar a la izquierda", action: onRotateLeft },
        { label: "↻", title: "Rotar a la derecha", action: onRotateRight },
      ].map((btn, i) => (
        <button
          key={i}
          onClick={btn.action}
          title={btn.title}
          className="
            h-10 px-4 flex items-center justify-center
            rounded-lg font-bold text-[#7ED957]
            bg-[#16284B] border border-[#7ED957]/60
            hover:bg-[#7ED957] hover:text-[#0A2540] hover:cursor-pointer
            hover:scale-110 transition-all duration-200
            shadow-md hover:shadow-[#7ED957]/40
          "
        >
          {btn.label}
        </button>
      ))}
      <button
        onClick={onDelete}
        title="Eliminar"
        className="
          w-10 h-10 flex items-center justify-center
          rounded-lg bg-red-600 text-white
          hover:bg-red-700 hover:scale-110
          transition-all duration-200 shadow-md
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18M9 6V4h6v2m-7 4v6m4-6v6m4-6v6M5 6l1 14h12l1-14"
          />
        </svg>
      </button>
    </div>
  );
};
