"use client";

type Props = {
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
};

export default function PayNowButton({ disabled, onClick, className }: Props) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={[
                "group flex items-center justify-center gap-2 cursor-pointer",
                "h-12 px-6 2xl:h-12 2xl:px-7 border-white",
                "rounded-md border border-blue-700",
                // gradient-ish feel without custom colors: use bg + overlay
                "bg-blue-700 text-white",
                "hover:bg-blue-600",
                "shadow-md hover:shadow-lg",
                "active:translate-y-[1px]",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/35",
                "transition-all duration-300",
                disabled ? "opacity-55 cursor-not-allowed hover:bg-blue-700 active:translate-y-0" : "",
                className ?? "",
            ].join(" ")}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-[20px] 2xl:size-[22px] transition-transform duration-300 group-hover:scale-110"
            >
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clipRule="evenodd"
                />
            </svg>

            <span className="font-semibold tracking-wide">Mua ngay</span>

            {/* tiny shine */}
            <span
                aria-hidden
                className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
        </button>
    );
}
