import React, { Fragment } from 'react'

import './style_menu_bar.scss'
import MenuItem from './MenuItem'

export default ({ editor }) => {
    const items = [
        {
            icon: 'bold',
            title: 'Bold',
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: () => editor.isActive('bold'),
        },
        {
            icon: 'italic',
            title: 'Italic',
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: () => editor.isActive('italic'),
        },
        {
            icon: 'strikethrough',
            title: 'Strike',
            action: () => editor.chain().focus().toggleStrike().run(),
            isActive: () => editor.isActive('strike'),
        },
        {
            icon: 'highlighter',
            title: 'Highlight',
            action: () => editor.chain().focus().toggleHighlight().run(),
            isActive: () => editor.isActive('highlight'),
        },
        {
            type: 'divider',
        },
        {
            icon: 'list',
            title: 'Bullet List',
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: () => editor.isActive('bulletList'),
        },
        {
            icon: 'list-ol',
            title: 'Ordered List',
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: () => editor.isActive('orderedList'),
        },
        {
            icon: 'quote-left',
            title: 'Blockquote',
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: () => editor.isActive('blockquote'),
        },
        {
            type: 'divider',
        },
        {
            icon: 'undo',
            title: 'Undo',
            action: () => editor.chain().focus().undo().run(),
        },
        {
            icon: 'redo',
            title: 'Redo',
            action: () => editor.chain().focus().redo().run(),
        },
    ]

    return (
        <div className="editor__header">
            {items.map((item, index) => (
                <Fragment key={index}>
                    {item.type === 'divider' ? <div className="divider" /> : <MenuItem {...item} />}
                </Fragment>
            ))}
        </div>
    )
}
