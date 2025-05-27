// src/components/ui/textarea.tsx

import React from 'react';

interface TextareaProps {
  id: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({ id, value, onChange, placeholder, rows = 4 }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};
