"use client"
import React from 'react'

function ButtonComponent({ style, content, url, outerStyle }) {
    return (
        <div>
            <a href={url} style={outerStyle}>
                <button style={style}>
                    {content}
                </button>
            </a>
        </div>
    )
}

export default ButtonComponent
