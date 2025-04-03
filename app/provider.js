"use client"

import React, { useContext, useEffect, useState } from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserDetailContext } from '@/context/userDetailContext';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { DragDropLayoutElementContext } from '@/context/DragDropLayoutElementContext';
import { EmailTemplateContext } from '@/context/EmailTemplateContext';
import { SelectedElementContext } from '@/context/SelectedElement';

function Provider({ children }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
    const [userDetail, setUserDetail] = useState({});
    const [screenSize, setScreenSize] = useState('desktop');
    const [dragElementLayout, setDragElementLayout] = useState();
    const [emailTemplate, setEmailTemplate] = useState([]);
    const [selectedElement, setSelectedElement] = useState();

    useEffect(() => {
        let storage = {};
        try {
            storage = JSON.parse(localStorage.getItem('userDetail')) || {};
        } catch (error) {
            console.error("Failed to parse userDetail from localStorage:", error);
            storage = {};
        }

        if (!storage?.email) {
            // Handle case where userDetail is not set
        } else {
            setUserDetail(storage);
        }

        let emailTemplateStorage = [];
        try {
            emailTemplateStorage = JSON.parse(localStorage.getItem('emailTemplate')) || [];
        } catch (error) {
            console.error("Failed to parse emailTemplate from localStorage:", error);
            emailTemplateStorage = [];
        }
        setEmailTemplate(emailTemplateStorage);
    }, []);

    useEffect(() => {
        localStorage.setItem('emailTemplate', JSON.stringify(emailTemplate));
    }, [emailTemplate]);

    useEffect(() => {
        let updateEmailTemplates = [];
        emailTemplate.forEach((item, index) => {
            if (item.id === selectedElement?.layout?.id) {
                updateEmailTemplates.push(selectedElement?.layout);
            } else {
                updateEmailTemplates.push(item);
            }
        });
        setEmailTemplate(updateEmailTemplates);
    }, [selectedElement]);

    return (
        <ConvexProvider client={convex}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                    <ScreenSizeContext.Provider value={{ screenSize, setScreenSize }}>
                        <DragDropLayoutElementContext.Provider value={{ dragElementLayout, setDragElementLayout }}>
                            <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
                                <SelectedElementContext.Provider value={{ selectedElement, setSelectedElement }}>
                                    <div>
                                        {children}
                                    </div>
                                </SelectedElementContext.Provider>
                            </EmailTemplateContext.Provider>
                        </DragDropLayoutElementContext.Provider>
                    </ScreenSizeContext.Provider>
                </UserDetailContext.Provider>
            </GoogleOAuthProvider>
        </ConvexProvider>
    );
}

export default Provider;

export const useUserDetail = () => {
    return useContext(UserDetailContext);
};

export const useScreenSize = () => {
    return useContext(ScreenSizeContext);
};

export const useDragElementLayout = () => {
    return useContext(DragDropLayoutElementContext);
};

export const useEmailTemplate = () => {
    return useContext(EmailTemplateContext);
};

export const useSelectedElement = () => {
    return useContext(SelectedElementContext);
};