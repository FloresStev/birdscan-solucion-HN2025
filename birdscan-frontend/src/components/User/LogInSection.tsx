import React, { useState, type ChangeEvent, type FormEvent } from "react";
import "./LogInSection.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import api, { type LoginResponse } from "../../api/api";
import ModalView from "./ModalView";

import { useAuth } from "../../auth/AuthProvider";


const LogInSection: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [t, i18n] = useTranslation("main");

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [modalType, setModalType] = useState<"success" | "error">("success");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            setModalMessage("Por favor completa todos los campos");
            setModalType("error");
            return;
        }

        try {
            const res = await api.post<LoginResponse>("/api/auth/login", loginData);

            login(res.data.access_token, res.data.user);

            setModalMessage("Login exitoso");
            setModalType("success");

            setTimeout(() => {
                setModalMessage(null);
                navigate("/");
            }, 1500);

        } catch (error: any) {
            const msg = error.response?.data?.message || "Usuario o contraseña incorrectos";
            setModalMessage(msg);
            setModalType("error");
        }

    };

    const handleGoogleLogin = () => {
        window.location.href = `${api.defaults.baseURL}/api/auth/google`;
    };



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
                <h2 className='h2_login-section'>
                    {t("loginSection.h1_loginsection")}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='input_container'>
                        <FontAwesomeIcon icon={faEnvelope} className="input_icon" />
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            id="email_login"
                            placeholder={t("loginSection.email_placeholder")}
                            required
                            onChange={handleChange}
                        />

                    </div>

                    <div className='input_container'>
                        <FontAwesomeIcon icon={faLock} className="input_icon" />
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            id="password_login"
                            placeholder={t("loginSection.password_placeholder")}
                            required
                            onChange={handleChange}
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
                    <button className="google-btn" onClick={handleGoogleLogin}>
                        <FontAwesomeIcon icon={faGoogle} /> {t("loginSection.google_button")}
                    </button>

                    <p className='createAccount'>{t('loginSection.account')}
                        <Link className='link_login_section' to="/signup">
                            {t('loginSection.account_create')}
                        </Link>
                    </p>
                </form>
            </div>

            {modalMessage && (
                <ModalView
                    message={modalMessage}
                    type={modalType}
                    onClose={() => setModalMessage(null)}
                />
            )}

        </section>
    );
};

export default LogInSection;
