import React, { useState } from "react";
import "./LanguageDropdown.css";
import { useTranslation } from "react-i18next";

const LanguageDropdown: React.FC = () => {
    const { t, i18n } = useTranslation("main");
    const [open, setOpen] = useState(false);

    const languages = [
        { value: "es", label: "Español 🇳🇮" },
        { value: "en", label: "English 🇺🇸" },
        { value: "ch", label: "中国 🇨🇳" },
        { value: "rs", label: "Русский 🇷🇺" },
    ];

    return (
        <div className="dropdown">
            <div className="selected" onClick={() => setOpen(!open)}>
                {t("header.setLanguage")}
                <span className="arrow">▼</span>
            </div>
            {open && (
                <ul className="options">
                    {languages.map((lang) => (
                        <li
                            key={lang.value}
                            onClick={() => {
                                i18n.changeLanguage(lang.value);
                                setOpen(false);
                            }}
                        >
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageDropdown;