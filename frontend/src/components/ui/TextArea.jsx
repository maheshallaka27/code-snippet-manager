import { forwardRef } from "react";

const TextArea = forwardRef(
  ({ label, error, rows = 4, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={`
          w-full
          rounded-lg
          border
          border-slate-300
          px-3
          py-2
          outline-none
          transition-all
          duration-200
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500
          ${className}
          `}
          {...props}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
