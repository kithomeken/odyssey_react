import React from 'react'
import './style_menu_item.scss'

export default ({
    icon, title, action, isActive = null,
}) => (
    <button
        className={`menu-item text-slate-400 ${isActive && isActive() ? ' is-active' : ''}`}
        onClick={action}
        title={title}
    >
        <span className={`far fa-${icon}`}></span>
    </button>
)