import React from "react";
import "./LogInSection.css";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LogInSection: React.FC = () => {
    const [t, i18n] = useTranslation("main");

    return (
        <section className="LogInSection_container">
            <div className="image_container-login">
                <img src="/src/assets/aves_imgs/icterus_pectoralis.jpg" />
                <div className="text_container">
                    <span className="name_label">Icterus gularis</span>
                    <span className="author_label">Michael Gutierrez</span>
                    <span className="ubication_label">
                        En Complejo Volcánico Pilas El Hoyo, León
                    </span>
                </div>
            </div>
            <div className="login_form_container">
                <h1 className='h1_login-section'>
                    {t("loginSection.h1_loginsection")}
                </h1>
                <form>
                    <div className='input_container'>
                        <FontAwesomeIcon icon={faEnvelope} className="input_icon" />
                        <input
                            type="email"
                            id="email_login"
                            placeholder={t("loginSection.email_placeholder")}
                            required
                        />

                    </div>

                    <div className='input_container'>
                        <FontAwesomeIcon icon={faLock} className="input_icon" />
                        <input
                            type="password"
                            id="password_login"
                            placeholder={t("loginSection.password_placeholder")}
                            required
                        />
                    </div>


                    <div className="remember_forgot">
                        <label>
                            <input type="checkbox" />
                            {t('loginSection.checkbox_label')}
                        </label>
                        <Link className='link_login_section' to='/'>
                            {t('loginSection.link_password')}
                        </Link>
                    </div>

                    <button type="submit" className="btn_login">
                        {t("loginSection.button_login")}
                    </button>

                    <div className="divider">
                        {t('loginSection.div_section')}
                    </div>
                    <button className="google-btn">
                        <FontAwesomeIcon icon={faGoogle} /> {t("loginSection.google_button")}
                    </button>

                    <p className='createAccount'>{t('loginSection.account')}
                        <Link className='link_login_section' to="/signup">
                            {t('loginSection.account_create')}
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default LogInSection;
