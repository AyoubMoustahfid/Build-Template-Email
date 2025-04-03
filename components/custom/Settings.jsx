"use client"

import { useSelectedElement } from '@/app/provider'
import React, {useState, useEffect} from "react"

import InputField from './Settings/InputField'
import ColorPickerField from './Settings/ColorPickerField'
import InputStyleField from './Settings/InputStyleField'
import SliderField from './Settings/SliderField'
import TextAreaField from './Settings/TextAreaField'
import ToogleGroupField from './Settings/ToogleGroupField'
import { AArrowUp, AlignCenter, AlignLeft, AlignRight, CaseLower, CaseUpper } from 'lucide-react'
import DropdownField from './Settings/DropdownField'
import ImagePreview from './Settings/ImagePreview'
import SocialIconsField from './Settings/SocialIocnsField'


const TextAlginOptions = [
    {
        value: 'left',
        icon: AlignLeft,
    },
    {
        value: 'center',
        icon: AlignCenter,
    },
    {
        value: 'right',
        icon: AlignRight,
    },
]

const textTransformOptions = [
    {
        value: 'uppercase',
        icon: CaseUpper,
    },
    {
        value: 'lowercase',
        icon: CaseLower,
    },
    {
        value: 'capitalize',
        icon: AArrowUp,
    },
]

function Settings() {
    const { selectedElement, setSelectedElement } = useSelectedElement()
    const [element, setElement] = useState()

    useEffect(() => {
        setElement(selectedElement?.layout?.[selectedElement?.index])
    }, [selectedElement])

    const onhandleInputChange = (fieldName, value) => {
        const updateData = {...selectedElement}

        updateData.layout[selectedElement.index][fieldName] = value
        setSelectedElement(updateData)
    }

    const onHandleStyleChange = (fieldName, fieldValue) => {
        let updateElement = {
            ...selectedElement,
            layout: {
                ...selectedElement?.layout,
                [selectedElement?.index]: {
                    ...selectedElement?.layout[selectedElement?.index],
                    style: {
                        ...selectedElement?.layout[selectedElement?.index]?.style,
                        [fieldName]: [fieldValue],
                        // add more style fields as needed
                        
                    }
                }
            }
        }
        
        setSelectedElement(updateElement)
    }

    const onHandleOuterStyleChange = (fieldName, fieldValue) => {
        let updateElement = {
            ...selectedElement,
            layout: {
                ...selectedElement?.layout,
                [selectedElement?.index]: {
                    ...selectedElement?.layout[selectedElement?.index],
                    outerStyle: {
                        ...selectedElement?.layout[selectedElement?.index]?.outerStyle,
                        [fieldName]: [fieldValue],
                        // add more style fields as needed
                        
                    }
                }
            }
        }
        
        setSelectedElement(updateElement)
    }


    return (
        <div className='p-5 space-y-2'>
            <h2 className='font-bold text-xl'>
                Settings
            </h2>{element?.imageUrl && 
                <ImagePreview 
                    label={"Image Preview"} 
                    value={element?.imageUrl} 
                    onHandleInputChange={(value) => onhandleInputChange('imageUrl', value)} 
                />
            }

            {element?.content && 
                <InputField 
                    label={"Content"} 
                    value={element?.content} 
                    onhandleInputChange={(value) => onhandleInputChange('content', value)} 
                />
            }

            {element?.textarea && 
                <TextAreaField 
                    label={"Text Area"}   
                    value={element?.textarea} 
                    onhandleInputChange={(value) => onhandleInputChange('textarea', value)} 
                />
            }

            {element?.url && 
                <InputField 
                    label={"url"} 
                    value={element?.url} 
                    onhandleInputChange={(value) => onhandleInputChange('url', value)} 
                />
            }

            {element?.style?.width && 
                <SliderField
                    label="Width"
                    value={element?.style?.width} 
                    type='%'
                    onHandleStyleChange={(value) => onHandleStyleChange('width', value)}
                />
            }

            {element?.style?.textAlign && 
                <ToogleGroupField
                    label="Text Align"
                    value={element?.style?.textAlign} 
                    options={TextAlginOptions}
                    onHandleStyleChange={(value) => onHandleStyleChange('textAlign', value)}
                />
            }

            {element?.style?.backgroundColor && 
                <ColorPickerField 
                    label="Background Color" 
                    value={element?.style?.backgroundColor} 
                    onHandleStyleChange={(value) => onHandleStyleChange('backgroundColor', value)}
                />
            }

            {element?.style?.color && 
                <ColorPickerField 
                    label="Text Color"  
                    value={element?.style?.color} 
                    onHandleStyleChange={(value) => onHandleStyleChange('color', value)}
                />
            }

            {element?.style?.fontSize && 
                <InputStyleField
                    label="Font Size" 
                    value={element?.style?.fontSize} 
                    onHnadleStyleChange={(value) => onHandleStyleChange('fontSize', value)}
                />
            }

            {element?.style?.textTransform && 
                <ToogleGroupField
                    label="Text Transform"
                    value={element?.style?.textTransform} 
                    options={textTransformOptions}
                    onHandleStyleChange={(value) => onHandleStyleChange('textTransform', value)}
                />
            }

            {element?.style?.padding && 
                <InputStyleField
                    label="Padding"
                    value={element?.style?.padding} 
                    onHnadleStyleChange={(value) => onHandleStyleChange('padding', value)}
                />
            }

            {element?.style?.margin && 
                <InputStyleField
                    label="Margin"
                    value={element?.style?.margin} 
                    onHnadleStyleChange={(value) => onHandleStyleChange('margin', value)}
                />
            }

            {element?.style?.borderRadius && 
                <SliderField
                    label="Border Radius"
                    value={element?.style?.borderRadius} 
                    onHandleStyleChange={(value) => onHandleStyleChange('borderRadius', value)}
                />
            }

            {element?.style?.fontWeight && 
                <DropdownField
                    label="Font Weight"
                    value={element?.style?.fontWeight} 
                    options={['normal', 'bold', 'italic']}
                    onHandleStyleChange={(value) => onHandleStyleChange('fontWeight', value)}
                />
            }

            {element?.type === 'SocialIcons' && (
                <SocialIconsField
                    socialIcons={element?.socialIcons}
                    options={element?.options}
                    onUpdateSocialIcons={(updatedSocialIcons) =>
                        onHandleInputChange('socialIcons', updatedSocialIcons)
                    }
                />
            )}

            <div>
                {element?.outerStyle?.backgroundColor && (
                    <h2
                        className='font-vold mb-2'
                    >
                        Outer Style
                </h2>
                )}
                {element?.outerStyle?.backgroundColor && 
                    <ColorPickerField
                        label="Background Color"
                        value={element?.outerStyle?.backgroundColor}
                        onHandleStyleChange={(value) => onHandleOuterStyleChange('backgroundColor', value)}
                    />
                }

                {element?.outerStyle?.justifyContent && 
                    <ToogleGroupField
                        label="Justify Content"
                        value={element?.outerStyle?.justifyContent}
                        options={TextAlginOptions}
                        onHandleStyleChange={(value) => onHandleOuterStyleChange('justifyContent', value)}
                    />
                }
            </div>
            
        </div>
    )
}

export default Settings
