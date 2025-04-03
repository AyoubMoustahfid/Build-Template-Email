"use client"
import React from 'react'

function SocialIconsComponent({outerStyle, socialIcons, style}) {
  return (
    <div style={outerStyle}>
        {socialIcons.map((icon, index) => (
            <a href={icon.url} key={index} style={style}>
                <img src={icon.icon} alt="social media" />
            </a>
        ))}
    </div>
  )
}

export default SocialIconsComponent
