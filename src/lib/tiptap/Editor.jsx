import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

import MenuBar from './MenuBar'
import './styles.scss'

export default ({placeHolder, content, onTipTapChangeHandler}) => {    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
        ],
        onUpdate({ editor }) {
            onTipTapChangeHandler(editor.getHTML())
        },
        content: content,
    })

    if (!editor) {
        return null
    }

    return (
        <div className="border border-gray-300 rounded max-h-72 bg-white flex flex-col tiptap-min-h">
            {editor && <MenuBar editor={editor} />}
            <EditorContent className="flex-auto overflow-x-hidden overflow-y-auto px-4 pb-4 pt-2 outline-0"
                placeholder={placeHolder}
                editor={editor} />
        </div>
    )
}

