import {GoHeartFill} from "react-icons/go";
import {IoPaw} from "react-icons/io5";
import React from "react";

function LoadingScreen() {
    return (
        <div className="app-background-gradient">
            <header>
                <p className="logo-text-loading">PupilMed</p>
                <div className="heart-with-paw">
                    <GoHeartFill className="heart-icon-loading" />
                    <IoPaw className="paw-icon-loading" />
                </div>
            </header>
        </div>
    );
}

export default LoadingScreen;
