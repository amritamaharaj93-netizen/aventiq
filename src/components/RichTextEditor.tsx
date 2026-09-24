"use client";

import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export default function RichTextEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: 'Start typing...',
    minHeight: 200,
    style: {
      background: 'transparent',
    }
  }), []);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    </div>
  );
}
