import { useState, ChangeEvent } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  type?: "text" | "password";
  disabled?: boolean;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

export default function Input({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  disabled = false,
  error,
  required = false,
  autoComplete,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-[13px] text-slate-800">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative w-full">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={`px-3 py-2 border-2 w-full pr-10 bg-white transition-colors ${
            error
              ? "border-red-500 focus:border-red-600"
              : "border-black focus:border-gray-600"
          } ${
            disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100"
              : "hover:border-gray-600"
          } outline-none`}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer p-1 hover:bg-gray-100 rounded transition-colors"
            onClick={toggleShowPassword}
            disabled={disabled}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaRegEyeSlash size={16} className="text-slate-500" />
            ) : (
              <FaRegEye size={16} className="text-slate-500" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
