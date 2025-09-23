import React, { useState, type ChangeEvent, type FormEvent } from "react";
import "./SignUpSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock,
    faUser,
    faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import api, { type User } from "../../api/api.ts";
import ModalView from "./ModalView.tsx";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/AuthProvider.tsx";

const SignUpSection: React.FC = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [t, i18n] = useTranslation("main");

    const [user, setUser] = useState({
        userName: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        cellphone_number: "",
        role: "USER",
    });

    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [modalType, setModalType] = useState<"success" | "error">("success");


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const agree = (form.elements.namedItem("agree") as HTMLInputElement).checked;
        if (!agree) {
            setModalMessage("Debes aceptar los términos de servicio");
            setModalType("error");
            return;
        }

        if (user.password !== user.confirmPassword) {
            setModalMessage("Las contraseñas no coinciden");
            setModalType("error");
            return;
        }

        try {
            const { confirmPassword, ...payload } = user;
            const res = await api.post<{ access_token: string; data: User; message: string }>("/api/users/register", payload);

            login(res.data.access_token, res.data.data);

            setModalMessage(res.data.message);
            setModalType("success");

            setTimeout(() => {
                setModalMessage(null);
                navigate("/");
            }, 1500);

        } catch (error: any) {
            const msg = Array.isArray(error.response?.data?.message)
                ? error.response.data.message.join(", ")
                : error.response?.data?.message || "Error al registrar usuario";

            setModalMessage(msg);
            setModalType("error");
        }

    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <section className="LogInSection_container">
            <div className="image_container-login">
                <img src="/src/assets/aves_imgs/trogon_melanocephalus.jpg" />
                <div className="text_container">
                    <span className="name_label">Trogon melanocephalus</span>
                    <span className="author_label">Michael Gutierrez</span>
                    <span className="ubication_label">
                        En Complejo Volcánico Pilas El Hoyo, León
                    </span>
                </div>
            </div>
            <div className="signup_form_container">
                <h2 className="h2_login-section">
                    {t("signupSection.h1_signupsection")}
                </h2>

                <form onSubmit={handleSubmit} >
                    <section className="name_input-container">
                        <div className="input_container">
                            <FontAwesomeIcon icon={faIdCard} className="input_icon" />
                            <input
                                type="text"
                                id="firstaname_signup"
                                name="firstName"
                                value={user.firstName}
                                placeholder={t("signupSection.firstname_placeholder")}
                                onChange={handleChange}
                            ></input>
                        </div>

                        <div className="input_container">
                            <FontAwesomeIcon icon={faIdCard} className="input_icon" />
                            <input
                                type="text"
                                id="lastaname_signup"
                                name="lastName"
                                value={user.lastName}
                                placeholder={t("signupSection.lastname_placeholder")}
                                onChange={handleChange}
                            ></input>
                        </div>
                    </section>

                    <div className="input_container">
                        <FontAwesomeIcon icon={faUser} className="input_icon" />
                        <input
                            type="text"
                            id="username_signup"
                            name="userName"
                            value={user.userName}
                            placeholder={t("signupSection.username_placeholder")}
                            onChange={handleChange}
                        ></input>
                    </div>

                    <div className="input_container">
                        <FontAwesomeIcon icon={faEnvelope} className="input_icon" />
                        <input
                            type="email"
                            id="email_login"
                            name="email"
                            value={user.email}
                            placeholder={t("loginSection.email_placeholder")}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input_container">
                        <FontAwesomeIcon icon={faLock} className="input_icon" />
                        <input
                            type="password"
                            id="password_login"
                            name="password"
                            value={user.password}
                            placeholder={t("loginSection.password_placeholder")}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input_container">
                        <FontAwesomeIcon icon={faLock} className="input_icon" />
                        <input
                            type="password"
                            id="confirmpassword_login"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            placeholder={t("signupSection.confirmpassword_placeholder")}
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="dropdown-container">
                        <label htmlFor="userType">{t("signupSection.type_of_user")}</label>
                        <select
                            id="userType"
                            value={user.role}
                            name="role"
                            onChange={handleChange}
                        >
                            <option value="USER">{t("signupSection.tourist")}</option>
                            <option value="GUIDE">{t("signupSection.tour_guide")}</option>
                        </select>
                    </div>

                    <div className="terms_of_service">
                        <label>
                            <input type="checkbox" name="agree" />
                            {t("signupSection.terms_of_service")}
                        </label>
                    </div>

                    <button type="submit" className="btn_signup">
                        {t("signupSection.button_signup")}
                    </button>

                    <p className="createAccount">
                        {t("signupSection.account")}
                        <Link className="link_login_section" to="/login">
                            {t("signupSection.login")}
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

export default SignUpSection;
