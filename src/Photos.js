import React from "react";
import "./Photos.css";

export default function Photos(props) {
    if (props.photos) {
    return (
        <section className="photos">
            <div className="row">
            {props.photos.map(function(photo, index) {
                return (
                <div className="col-4" key={index}>
                <a href={photo.src.original} target="_blank" rel="noreffer" >
                <img src={photo.src.tiny}  />
                </a>
                </div>
            )})}
             </div>
        </section>
    );
} else {
    return null;
}
}