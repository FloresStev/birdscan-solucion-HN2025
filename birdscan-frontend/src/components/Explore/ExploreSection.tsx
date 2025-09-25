import React, { useState } from "react";
import "./ExploreSection.css";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ExploreSection: React.FC = () => {

    const [t, i18n] = useTranslation("main");

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/birds?filter=all&search=${encodeURIComponent(searchTerm.trim())}`);
        }
    }
    return (
        <>
            <section className="explore_container">
                <div className="explore_species-container">

                    <div className='explore_content-container'>
                        <h2 className="explore_h2-label">
                            {t("explore.species_h2-title")}
                        </h2>
                        <p className="explore_p">
                            {t("explore.species_p")}
                        </p>
                        <form className="search-bar"
                            onSubmit={handleSubmit} >
                            <input className="explore_input" type="text" placeholder={t("explore.input_placeholder-species")} id="text_speciesSearch"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            ></input>
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </form>
                        <Link className="explore_link" to='/birds?filter=all' >
                            {t("explore.sealls_link")}
                        </Link>
                        <Link className="explore_link" to='/birds?filter=endangered' >
                            {t("explore.seEndangered_link")}
                        </Link>
                    </div>

                </div>

                <div className="explore_reserves-container">

                    <div className='explore_content-container'>
                        <h2 className='explore_h2-label'>
                            {t("explore.reserves_h2-title")}
                        </h2>
                        <p className='explore_p'>
                            {t("explore.reserves_p")}
                        </p>
                        <form className="search-bar" >
                            <input className="explore_input" type="text" placeholder={t("explore.input_placeholder-reserves")} id="text_reservesSearch"></input>
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        </form>

                        <Link className="explore_link" to='/naturalreserves'>
                            {t("explore.sealls_link")}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}


export default ExploreSection;
