import React from 'react';

interface LineNumberGutterProps {
  lineCount: number;
}

export const LineNumberGutter: React.FC<LineNumberGutterProps> = ({ lineCount }) => {
  return (
    <div className="bg-vscode-bg-primary border-r border-vscode px-2 py-4 font-mono text-sm text-vscode-text-secondary select-none line-number-gutter theme-transition">
      {Array.from({ length: lineCount }, (_, index) => (
        <div key={index + 1} className="h-6 text-right leading-6 line-number">
          {index + 1}
        </div>
      ))}
    </div>
  );
};