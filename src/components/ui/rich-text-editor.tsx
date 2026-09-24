"use client"

import React, { useState, useRef, useEffect } from "react"
import { 
  Bold, Italic, Underline, Strikethrough, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Link as LinkIcon, 
  Image as ImageIcon, Video, Code, Table, Undo, Redo, RemoveFormatting, 
  Minus, Maximize2, Minimize2, HelpCircle, Printer, Type, Paintbrush, 
  Palette, Heading1, Heading2, Heading3, Subscript, Superscript
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content here...", 
  minHeight = "240px" 
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isSourceMode, setIsSourceMode] = useState(false)
  const [htmlContent, setHtmlContent] = useState(value || "")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Calculate word and character count
  const rawText = htmlContent.replace(/<[^>]*>/g, '').trim()
  const charCount = rawText.length
  const wordCount = rawText ? rawText.split(/\s+/).filter(Boolean).length : 0

  // Sync internal state with external value prop
  useEffect(() => {
    if (value !== htmlContent) {
      setHtmlContent(value || "")
      if (editorRef.current && editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || ""
      }
    }
  }, [value])

  const handleExec = (command: string, value: string | undefined = undefined) => {
    if (isSourceMode) return
    document.execCommand(command, false, value)
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML
      setHtmlContent(updated)
      onChange(updated)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      const updated = editorRef.current.innerHTML
      setHtmlContent(updated)
      onChange(updated)
    }
  }

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = e.target.value
    setHtmlContent(updated)
    onChange(updated)
    if (editorRef.current) {
      editorRef.current.innerHTML = updated
    }
  }

  const promptLink = () => {
    const url = prompt("Enter link URL:", "https://")
    if (url) {
      handleExec("createLink", url)
    }
  }

  const promptImage = () => {
    const url = prompt("Enter Image URL:", "https://")
    if (url) {
      handleExec("insertImage", url)
    }
  }

  const promptVideo = () => {
    const url = prompt("Enter Video Embed / MP4 URL:", "https://")
    if (url) {
      const videoHtml = `<div class="my-4 aspect-video"><iframe src="${url}" class="w-full h-full rounded-xl" frameborder="0" allowfullscreen></iframe></div>`
      handleExec("insertHTML", videoHtml)
    }
  }

  const insertTable = () => {
    const tableHtml = `
      <table className="w-full border-collapse border border-slate-300 my-4 text-sm">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 p-2">Header 1</th>
            <th className="border border-slate-300 p-2">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-slate-300 p-2">Data 1</td>
            <td className="border border-slate-300 p-2">Data 2</td>
          </tr>
        </tbody>
      </table>
    `
    handleExec("insertHTML", tableHtml)
  }

  return (
    <div className={`border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all ${
      isFullscreen ? "fixed inset-4 z-50 flex flex-col bg-white shadow-2xl" : ""
    }`}>
      {/* Top Toolbar */}
      <div className="bg-[#F8FAFC] border-b border-slate-200 p-2 flex flex-wrap items-center gap-1 text-slate-600 select-none">
        
        {/* Source Mode Toggle */}
        <button
          type="button"
          onClick={() => setIsSourceMode(!isSourceMode)}
          className={`p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors font-mono text-xs font-bold flex items-center gap-1 ${
            isSourceMode ? "bg-[#0067D9] text-white hover:bg-[#0052ad]" : ""
          }`}
          title="Toggle HTML Source Code"
        >
          <Code size={15} />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1"></div>

        {/* Formatting Buttons */}
        <button
          type="button"
          onClick={() => handleExec("bold")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors font-bold text-slate-700"
          title="Bold (Ctrl+B)"
        >
          <Bold size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("strikethrough")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors text-slate-700"
          title="Strikethrough"
        >
          <Strikethrough size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("underline")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors underline font-medium text-slate-700"
          title="Underline (Ctrl+U)"
        >
          <Underline size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("italic")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors italic font-serif text-slate-700"
          title="Italic (Ctrl+I)"
        >
          <Italic size={15} />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1"></div>

        {/* Lists */}
        <button
          type="button"
          onClick={() => handleExec("insertUnorderedList")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Bullet List"
        >
          <List size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("insertOrderedList")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Numbered List"
        >
          <ListOrdered size={15} />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1"></div>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => handleExec("justifyLeft")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Align Left"
        >
          <AlignLeft size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("justifyCenter")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Align Center"
        >
          <AlignCenter size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("justifyRight")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Align Right"
        >
          <AlignRight size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("justifyFull")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Justify"
        >
          <AlignJustify size={15} />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1"></div>

        {/* Headings & Format Dropdown */}
        <select
          onChange={(e) => handleExec("formatBlock", e.target.value)}
          className="h-7 px-2 text-xs font-semibold bg-white border border-slate-300 rounded-md focus:outline-none"
          defaultValue="p"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="pre">Code Block</option>
          <option value="blockquote">Quote</option>
        </select>

        {/* Font Color */}
        <input 
          type="color"
          onChange={(e) => handleExec("foreColor", e.target.value)}
          className="w-6 h-6 p-0 border border-slate-300 rounded cursor-pointer bg-transparent"
          title="Text Color"
        />

        <div className="w-px h-5 bg-slate-300 mx-1"></div>

        {/* Media Inserts */}
        <button
          type="button"
          onClick={promptImage}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Insert Image"
        >
          <ImageIcon size={15} />
        </button>
        <button
          type="button"
          onClick={promptVideo}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors flex items-center gap-1 text-xs font-semibold"
          title="Add Video"
        >
          <Video size={15} />
        </button>
        <button
          type="button"
          onClick={insertTable}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Insert Table"
        >
          <Table size={15} />
        </button>
        <button
          type="button"
          onClick={promptLink}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors"
          title="Insert Link"
        >
          <LinkIcon size={15} />
        </button>

        <div className="w-px h-5 bg-slate-300 mx-1"></div>

        {/* Tools */}
        <button
          type="button"
          onClick={() => handleExec("removeFormat")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors text-slate-500"
          title="Clear Formatting"
        >
          <RemoveFormatting size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("insertHorizontalRule")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors text-slate-500"
          title="Horizontal Line"
        >
          <Minus size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("undo")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors text-slate-500"
          title="Undo (Ctrl+Z)"
        >
          <Undo size={15} />
        </button>
        <button
          type="button"
          onClick={() => handleExec("redo")}
          className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors text-slate-500"
          title="Redo (Ctrl+Y)"
        >
          <Redo size={15} />
        </button>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 transition-colors text-slate-500"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>

      </div>

      {/* Editor Body */}
      <div className="relative flex-1 bg-white">
        {isSourceMode ? (
          <textarea
            value={htmlContent}
            onChange={handleSourceChange}
            style={{ minHeight }}
            className="w-full p-4 font-mono text-sm border-0 focus:outline-none resize-none bg-slate-900 text-emerald-400 leading-relaxed"
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            style={{ minHeight }}
            data-placeholder={placeholder}
            className="w-full p-4 focus:outline-none text-slate-800 leading-relaxed text-sm overflow-y-auto prose max-w-none"
          />
        )}
      </div>

      {/* Footer Bar */}
      <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500 font-medium select-none">
        <div className="flex items-center gap-3">
          <span>CHARS: <strong className="text-slate-700 font-bold">{charCount}</strong></span>
          <span>WORDS: <strong className="text-slate-700 font-bold">{wordCount}</strong></span>
        </div>
        <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
          Aventiq Rich Editor
        </div>
      </div>
    </div>
  )
}
