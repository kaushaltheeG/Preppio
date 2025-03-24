import React from "react";

interface TextBoxProps {
  value: string;
  onChange?: (text: string | React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ value, onChange, placeholder, readonly = false, className = '' }) => {

  const handleOnChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  return (
    <div className="w-full h-full pb-[10px] overflow-hidden">
      <textarea
        className={`w-full h-full p-4 border rounded-lg min-h-[60vh] max-h-[60vh]
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100
          ${readonly ? 'bg-gray-50 cursor-default' : ''}
          ${className}`}
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </div>
  );
};

export default TextBox;
