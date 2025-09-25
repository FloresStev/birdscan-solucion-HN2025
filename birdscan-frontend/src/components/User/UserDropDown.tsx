import React, { useState } from "react";
import "./UserDropDown.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faCircleInfo, faPenToSquare, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";
import api from "../../api/api";

import axios from "axios";



const UserDropDown: React.FC = () => {
    
    const navigate = useNavigate();

    const [t, i18n] = useTranslation('main');

    const { user, logout } = useAuth();

    const getInitials = (firstName?: string, lastName?: string) => {
        const f = firstName?.[0]?.toUpperCase() || "";
        const l = lastName?.[0]?.toUpperCase() || "";
        return f + l || "?";
    };

    const fullName = user?.firstName
        ? user.firstName + (user.lastName ? ` ${user.lastName}` : "")
        : "Usuario";

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.warn("No hay token disponible para cerrar sesión.");
            logout();
            navigate("/login");
            return;
        }

        try {
            await axios.post(`${api.defaults.baseURL}/api/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };



    return (
        <>

            <div className="user_dropdown-wrapper">
                <div className="user_icon">
                    {user?.picture ? (
                        <img src={user.picture} alt="avatar" className="user_avatar" />
                    ) : user?.firstName || user?.lastName ? (
                        <div className="user_avatar-fallback">{getInitials(user.firstName, user.lastName)}</div>
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} className="user_avatar-icon" />
                    )}
                </div>

                <div className="user_dropdown">
                    <div className="user_information">
                        {user?.picture ? (
                            <img src={user.picture} alt="avatar" className="user_avatar" />
                        ) : user?.firstName || user?.lastName ? (
                            <div className="user_avatar-fallback">{getInitials(user.firstName, user.lastName)}</div>
                        ) : (
                            <FontAwesomeIcon icon={faUserCircle} className="user_avatar-icon" />
                        )}

                        <div className="information_text">
                            <span className="user_name">
                                {fullName}
                            </span>
                            <span className="user_email">
                                {user?.email}
                            </span>
                        </div>
                    </div>

                    <div className="account_option">
                        <Link to="/userprofile">
                            <FontAwesomeIcon icon={faCircleInfo} /> {t("userDropDown.details")}
                        </Link>
                        <Link to="/editprofile">
                            <FontAwesomeIcon icon={faPenToSquare} /> {t("userDropDown.edit")}
                        </Link>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> {t("userDropDown.signout")}
                    </button>
                </div>
            </div >
        </>
    );
};

export default UserDropDown