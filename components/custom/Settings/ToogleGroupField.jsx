"use client"
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import React from 'react'

function ToogleGroupField({ label, value, options, onHandleStyleChange }) {
    return (
        <div>
            <label>{label}</label>
            <ToggleGroup 
                type="single"
                defaultValue={value}
                onValueChange={(v) => onHandleStyleChange(v)}    
            >
                {options.map((option, index) => (
                    <ToggleGroupItem 
                        key={index} 
                        className="w-full"
                        value={option.value}>
                        <option.icon/>
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}

export default ToogleGroupField
