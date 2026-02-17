interface FormButtonProps {
    label: string;
    url: string;
    icon: "form" | "sheet" | "upload";
    variant?: "primary" | "secondary" | "upload";
}

export default function FormButton({
    label,
    url,
    icon,
    variant = "primary",
}: FormButtonProps) {
    const iconSvg =
        icon === "form" ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
        ) : icon === "sheet" ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
        ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
        );

    const baseClasses =
        "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg";

    const variantClasses =
        variant === "primary"
            ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-primary/30"
            : variant === "secondary"
                ? "bg-white border-2 border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5"
                : "bg-slate-50 border-2 border-dashed border-slate-300 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5";

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} ${variantClasses}`}
        >
            {iconSvg}
            {label}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
            </svg>
        </a>
    );
}
