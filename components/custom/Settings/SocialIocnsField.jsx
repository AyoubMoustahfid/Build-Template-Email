import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

function SocialIconsField({ socialIcons, options, onUpdateSocialIcons }) {
    const [icons, setIcons] = useState(socialIcons);

    const handleUrlChange = (index, newUrl) => {
        const updatedIcons = [...icons];
        updatedIcons[index].url = newUrl;

        // Validate URL
        if (newUrl && !isValidUrl(newUrl)) {
            alert('Invalid URL. Please enter a valid URL.');
            return;
        }

        setIcons(updatedIcons);
        onUpdateSocialIcons(updatedIcons);
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    return (
        <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Social Media Links</h3>
            {icons.map((icon, index) => (
                <div key={index} className='flex items-center gap-4'>
                    <img
                        src={icon.icon}
                        alt={`Social Icon ${index}`}
                        className='w-10 h-10'
                    />
                    <Input
                        placeholder='Enter URL'
                        value={icon.url}
                        onChange={(e) => handleUrlChange(index, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

export default SocialIconsField;