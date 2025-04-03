"use client"
import { useDragElementLayout, useEmailTemplate, useSelectedElement } from '@/app/provider'
import React, { useState } from 'react'
import ButtonComponent from '../custom/ElementComponents/ButtonComponent'
import TextComponent from '../custom/ElementComponents/TextComponent'
import ImageComponent from '../custom/ElementComponents/ImageComponent'
import LogoComponent from '../custom/ElementComponents/LogoComponent'
import DividerComponent from '../custom/ElementComponents/DividerComponent'
import SocialIconsComponent from "../custom/ElementComponents/SocialIconsComponent"
import { ArrowDown, ArrowUp, Trash } from 'lucide-react'

function ColumnLayout({ layout }) {
    const [dragOver, setDragOver] = useState();
    const { emailTemplate, setEmailTemplate } = useEmailTemplate();
    const { dragElementLayout, setDragElementLayout } = useDragElementLayout();
    const { selectedElement, setSelectedElement } = useSelectedElement();

    const onDragOverHandle = (event, index) => {
        event.preventDefault();
        setDragOver({
            index: index,
            columnId: layout?.id
        });
    };

    const onDropHandle = () => {
        const index = dragOver.index;
        setEmailTemplate(prevItems =>
            prevItems?.map(col => col.id === layout?.id ?
                { ...col, [index]: dragElementLayout?.dragElement }
                : col
            )
        );
        setDragOver(null);
    };

    const GetElementComponent = (element) => {
        if (element?.type == "Button") {
            return <ButtonComponent {...element} />;
        } else if (element?.type == "Text") {
            return <TextComponent {...element} />;
        } else if (element?.type == "Image") {
            return <ImageComponent {...element} />;
        } else if (element?.type == "Logo" || element?.type == "LogoHeader") {
            return <LogoComponent {...element} />;
        } else if (element?.type == "Divider") {
            return <DividerComponent {...element} />;
        } else if (element?.type == "SocialIcons") {
            return <SocialIconsComponent {...element} />;
        }
        return element?.type;
    };

    const deleteLayout = (layoutId) => {
        const updateEmailTemplate = emailTemplate?.filter(item => item.id != layoutId);
        setEmailTemplate(updateEmailTemplate);
        setSelectedElement(null);
    };

    const moveItemDown = (layoutId) => {
        const index = emailTemplate?.findIndex(item => item.id == layoutId);
        if (index !== -1 && index < emailTemplate?.length - 1) {
            const [item1, item2] = [emailTemplate[index], emailTemplate[index + 1]];
            emailTemplate[index] = item2;
            emailTemplate[index + 1] = item1;
            setEmailTemplate([...emailTemplate]);
        }
    };

    const moveItemUp = (layoutId) => {
        const index = emailTemplate?.findIndex(item => item.id == layoutId);
        if (index !== -1 && index > 0) {
            const [item1, item2] = [emailTemplate[index], emailTemplate[index - 1]];
            emailTemplate[index] = item2;
            emailTemplate[index - 1] = item1;
            setEmailTemplate([...emailTemplate]);
        }
    };

    return (
        <div className='relative'>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
                    gap: '0px'
                }}
                className={`${selectedElement?.layout?.id == layout?.id && 'border border-dashed border-blue-500'}`}
            >
                {Array.from({ length: layout?.numOfCol }).map((_, index) => (
                    <div
                        key={index}
                        className={`p-0 flex items-center cursor-pointer
                        ${!layout?.[index]?.type && 'bg-gray-100 border border-dashed'} justify-center
                        ${(index == dragOver?.index && dragOver?.columnId) && 'bg-green-100'}   
                        ${(selectedElement?.layout?.id == layout?.id && selectedElement?.index == index) && 'border-blue-500 border-4'}
                        `}
                        onDragOver={event => onDragOverHandle(event, index)}
                        onDrop={onDropHandle}
                        onClick={() => setSelectedElement({ layout: layout, index: index })}
                    >
                        {GetElementComponent(layout?.[index]) ?? 'Drag Element here '}
                    </div>
                ))}

                {selectedElement?.layout?.id == layout?.id &&
                    <div className='absolute -right-10 flex gap-2 flex-col'>
                        <div
                            onClick={() => deleteLayout(layout?.id)}
                            className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md'>
                            <Trash
                                className='h-4 w-4 text-red-500'
                            />
                        </div>

                        <div 
                            onClick={() => moveItemUp(layout.id)}
                            className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md'>
                            <ArrowUp
                                className='h-4 w-4'
                            />
                        </div>

                        <div 
                            onClick={() => moveItemDown(layout.id)}
                            className='cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 transition-all hover:shadow-md'>
                            <ArrowDown
                                className='h-4 w-4'
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ColumnLayout;