"use client";
import { useState } from 'react';
import { ChangeEvent } from 'react';

const RadioButtonLanguage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const handleLanguageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row justify-start text-center gap-3">
            <input
                type="radio"
                id="ru"
                name="language"
                value="ru"
                className="hidden"
                onChange={handleLanguageChange}
                checked={selectedLanguage === 'ru'}
            />
            <label
                htmlFor="ru"
                className={`px-4 py-2 rounded-lg cursor-pointer ${selectedLanguage === 'ru' ? 'bg-primary text-white' : 'bg-[#D9D9D9] text-textsecondary'}`}
            >
                RU
            </label>

            <input
                type="radio"
                id="en"
                name="language"
                value="en"
                className="hidden"
                onChange={handleLanguageChange}
                checked={selectedLanguage === 'en'}
            />
            <label
                htmlFor="en"
                className={`px-4 py-2 rounded-lg cursor-pointer ${selectedLanguage === 'en' ? 'bg-primary text-white' : 'bg-[#D9D9D9] text-textsecondary'}`}
            >
                EN
            </label>

            <input
                type="radio"
                id="tr"
                name="language"
                value="tr"
                className="hidden"
                onChange={handleLanguageChange}
                checked={selectedLanguage === 'tr'}
            />
            <label
                htmlFor="tr"
                className={`px-4 py-2 rounded-lg cursor-pointer ${selectedLanguage === 'tr' ? 'bg-primary text-white' : 'bg-[#D9D9D9] text-textsecondary'}`}
            >
                TR
            </label>

            <input
                type="radio"
                id="ar"
                name="language"
                value="ar"
                className="hidden"
                onChange={handleLanguageChange}
                checked={selectedLanguage === 'ar'}
            />
            <label
                htmlFor="ar"
                className={`px-4 py-2 rounded-lg cursor-pointer ${selectedLanguage === 'ar' ? 'bg-primary text-white' : 'bg-[#D9D9D9] text-textsecondary'}`}
            >
                AR
            </label>

            <input
                type="radio"
                id="cn"
                name="language"
                value="cn"
                className="hidden"
                onChange={handleLanguageChange}
                checked={selectedLanguage === 'cn'}
            />
            <label
                htmlFor="cn"
                className={`px-4 py-2 rounded-lg cursor-pointer ${selectedLanguage === 'cn' ? 'bg-primary text-white' : 'bg-[#D9D9D9] text-textsecondary'}`}
            >
                CN
            </label>

            <input
                type="radio"
                id="de"
                name="language"
                value="de"
                className="hidden"
                onChange={handleLanguageChange}
                checked={selectedLanguage === 'de'}
            />
            <label
                htmlFor="de"
                className={`px-4 py-2 rounded-lg cursor-pointer ${selectedLanguage === 'de' ? 'bg-primary text-white' : 'bg-[#D9D9D9] text-textsecondary'}`}
            >
                DE
            </label>
        </div>
    );
};

export default RadioButtonLanguage;
