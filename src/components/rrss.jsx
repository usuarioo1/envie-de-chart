import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Rrss = () => {
    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/Enviedechanter',
            icon: FaFacebook,
            color: 'hover:text-rose-500'
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/enviedechanter_chant_prenatal/',
            icon: FaInstagram,
            color: 'hover:text-rose-500'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/marie-laure-potel-8750116b/recent-activity/all/',
            icon: FaLinkedin,
            color: 'hover:text-rose-500'
        }
    ];

    return (
        <div className="flex gap-6 items-center justify-center">
            {socialLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-700 ${social.color} transition-all duration-300 text-2xl hover:scale-110`}
                    aria-label={social.name}
                >
                    <social.icon />
                </a>
            ))}
        </div>
    );
};

export default Rrss;
