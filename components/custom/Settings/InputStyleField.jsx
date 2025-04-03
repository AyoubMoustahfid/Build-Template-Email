"use client"
import { Input } from '@/components/ui/input';
import React from 'react'


function InputStyleField({label, value, onHnadleStyleChange, type = "px"}) {

    const FormattedValue = value => {
        return Number(value.toString().replace('px', ''));
    }

    return (
        <div>
            <label>
                {label}
            </label>
            <div className='flex '>
                <Input
                    type="text"
                    value={FormattedValue(value)}
                    onChange={e => onHnadleStyleChange(e.target.value + type)}
                />
                <h2 className='p-1 bg-gray-100 rounded-r -ml-2'>
                    {type}
                </h2>
            </div>
        </div>
    )
}

export default InputStyleField
