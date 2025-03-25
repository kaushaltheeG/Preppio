import React from 'react';

interface PasteOnlyTextBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const PasteOnlyTextBox: React.FC<PasteOnlyTextBoxProps> = ({
  value,
  onChange,
  placeholder = 'Paste your text here...',
  className = ''
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allowedKeys = ['Delete', 'Backspace'];
    const isCtrlKey = e.ctrlKey || e.metaKey;
    const isAllowedCtrlCommand = isCtrlKey && ['v', 'c', 'a', 'z', 'x'].includes(e.key.toLowerCase());
    
    if (!isAllowedCtrlCommand && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    onChange(pastedText);
  };

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder={placeholder}
      className={`
        w-full
        h-[80%]
        bg-white dark:bg-gray-800
        text-gray-900
        dark:text-gray-100
        p-3 border border-gray-300
        rounded-lg focus:ring-2
        focus:ring-blue-500 focus:border-blue-500
        outline-none resize-none ${className}`
      }
    />
  );
};

export default PasteOnlyTextBox;
