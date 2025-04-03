"use client"
import { Slider } from '@/components/ui/slider'
import React from 'react'

function SliderField({ label, value, onHandleStyleChange, type="px" }) {

    const FormattedValue = (value) => {
        return Number(value.toString().replace(type, ""))
    }

    return (
        <div>
            <label>
                {label} ({value})
            </label>
            <Slider
                className="mt-3"
                defaultValue={[FormattedValue(value)]}
                max={100}
                step={1}
                onValueChange={v => onHandleStyleChange(v + type)}
            />
        </div>
    )
}

export default SliderField
