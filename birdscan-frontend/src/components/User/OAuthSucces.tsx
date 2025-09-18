import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import api, { type GoogleLoginResponse } from "../../api/api";

const OAuthSuccess: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {

            api.get<GoogleLoginResponse>("/api/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    login(token, res.data.user);
                    navigate("/");
                })
                .catch(err => {
                    console.error(err);
                    navigate("/login");
                });

        } else {
            navigate("/login");
        }
    }, []);

    return <p>Iniciando sesión con Google...</p>;
};

export default OAuthSuccess;
