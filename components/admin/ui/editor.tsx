'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Table as TableIcon,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Type
} from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const lowlight = createLowlight(common)

interface EditorProps {
  content: string
  onChange: (html: string) => void
  placeholder?: string
}

const MenuButton = ({ 
  onClick, 
  active = false, 
  disabled = false, 
  children,
  title 
}: { 
  onClick: () => void, 
  active?: boolean, 
  disabled?: boolean, 
  children: React.ReactNode,
  title?: string
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={cn(
      "p-2 rounded-md transition-all",
      active ? "bg-primary text-white" : "text-muted hover:bg-background-alt hover:text-foreground",
      disabled && "opacity-30 cursor-not-allowed"
    )}
  >
    {children}
  </button>
)

export function Editor({ content, onChange, placeholder = 'Empieza a escribir...' }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto border border-border shadow-md my-8',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-secondary text-white p-4 rounded-xl font-mono text-sm my-6 overflow-x-auto',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-[400px] py-10',
      },
    },
  })

  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('URL de la imagen:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL:', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="w-full border border-border rounded-2xl bg-white overflow-hidden shadow-sm flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-border bg-background-alt p-2 flex flex-wrap gap-1 sticky top-0 z-10">
        <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
          <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Deshacer">
            <Undo className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Rehacer">
            <Redo className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="H1">
            <Heading1 className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="H2">
            <Heading2 className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="H3">
            <Heading3 className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')} title="Párrafo">
            <Type className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
          <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrita">
            <Bold className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Cursiva">
            <Italic className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Código inline">
            <Code className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
          <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista">
            <List className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista ordenada">
            <ListOrdered className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Cita">
            <Quote className="w-4 h-4" />
          </MenuButton>
        </div>

        <div className="flex items-center gap-1">
          <MenuButton onClick={addImage} title="Imagen">
            <ImageIcon className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={setLink} active={editor.isActive('link')} title="Enlace">
            <LinkIcon className="w-4 h-4" />
          </MenuButton>
          <MenuButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Tabla">
            <TableIcon className="w-4 h-4" />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto px-10">
        <EditorContent editor={editor} />
      </div>

      {/* Footer Info */}
      <div className="border-t border-border bg-white px-4 py-2 flex items-center justify-between text-[10px] text-muted font-bold uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span>{editor.storage.characterCount?.words?.() || 0} palabras</span>
          <span>{editor.getHTML().length} caracteres</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          Auto-guardado activo
        </div>
      </div>
    </div>
  )
}
