import React, { useState } from "react";
import "./UserDropDown.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faCircleInfo, faPenToSquare, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/AuthProvider";
import { useTranslation } from "react-i18next";



const UserDropDown: React.FC = () => {
    const [t, i18n] = useTranslation('main');

    const { user, logout } = useAuth();

    const getInitials = (firstName?: string, lastName?: string) => {
        const f = firstName?.[0]?.toUpperCase() || "";
        const l = lastName?.[0]?.toUpperCase() || "";
        return f + l || "?";
    };

    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        window.location.reload();
    }

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