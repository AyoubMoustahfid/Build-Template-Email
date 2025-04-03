"use client"
import { Input } from '@/components/ui/input'
import React from 'react'

function InputField({ label, value, onhandleInputChange }) {
    return (
        <div className='w-full'>
            <label>
                {label}
            </label>
            <Input
                value={value}
                onChange={e => onhandleInputChange(e.target.value)}
            />
        </div>
    )
}

export default InputField
