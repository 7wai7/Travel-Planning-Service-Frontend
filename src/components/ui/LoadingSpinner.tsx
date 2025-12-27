interface Props {
  size?: number;
  description?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 5,
  description = "Loading...",
  className,
}: Props) {
  return (
    <>
      <div className={`flex flex-col items-center w-min h-min ${className ?? ""}`}>
        <div
          className={`aspect-square rounded-full border-slate-800 border-t-blue-500 animate-spin`}
          style={{
            width: `${size * 9}px`,
            borderWidth: `${size}px`,
          }}
        ></div>
        {description !== "none" && (
          <span
            className="text-black"
            style={{
              fontSize: `${size * 0.2}rem`,
              fontWeight: 500,
            }}
          >
            {description}
          </span>
        )}
      </div>
    </>
  );
}
