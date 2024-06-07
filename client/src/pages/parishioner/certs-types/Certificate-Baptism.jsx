import React from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const CertificateBaptism = () => {

    return(
        <>
            <NavParishioner />
            <Header
                background-image = {imageHeader}
                title = 'Gethsemane Parish Pastoral Center'
            />

            <Link to='/link' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
                <p className="xs:hidden md:flex">Return to Home</p>
            </Link>
        </>
    )

}