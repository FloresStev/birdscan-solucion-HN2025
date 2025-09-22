import React from "react";
import "./ExploreSection.css";
import { useTranslation } from "react-i18next";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ExploreSection: React.FC = () => {
    const [t, i18n] = useTranslation("main");

    return (
        <>
        <section className="explore_container">
            <div className="explore_species-container">

                <div className = 'explore_content-container'>
                    <h2 className="explore_h2-label">
                        {t("explore.species_h2-title")}
                    </h2>
                    <p className="explore_p">
                        {t("explore.species_p")}
                    </p>
                    <form className="search-bar" >
                        <input className = "explore_input" type="text" placeholder = {t("explore.input_placeholder-species")} id="text_speciesSearch"></input>
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </form>
                    <Link className = "explore_link" to = '/birds' >
                        {t("explore.sealls_link")}
                    </Link>
                </div>

            </div>

            <div className="explore_reserves-container">

                <div className = 'explore_content-container'>
                    <h2 className = 'explore_h2-label'>
                        {t("explore.reserves_h2-title")}
                    </h2>
                    <p className = 'explore_p'>
                        {t("explore.reserves_p")}
                    </p>
                    <form className="search-bar" >
                        <input className = "explore_input" type="text" placeholder = {t("explore.input_placeholder-reserves")} id="text_reservesSearch"></input>
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    </form>
                    
                    <Link className = "explore_link" to='/naturalreserves'>
                        {t("explore.sealls_link")}
                    </Link>
                </div>
            </div>
        </section>
        </>
    );
};

export default ExploreSection;
