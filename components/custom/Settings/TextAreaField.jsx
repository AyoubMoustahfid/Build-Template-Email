"use client"
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function TextAreaField({ label, value, onhandleInputChange }) {
    return (
        <div>
            <label>
                {label}
            </label>
            <Textarea
                value={value}
                onChange={e => onhandleInputChange(e.target.value)}
            />
        </div>
    )
}

export default TextAreaField
