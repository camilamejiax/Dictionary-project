import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";
import Photos from "./Photos";

export default function Dictionary(props) {
   let [keyword, setKeyword] = useState(props.defaultKeyword);
   let [results, setResults] = useState(null);
   let [loaded, setLoaded] = useState(false);
   let [photos, setPhotos] = useState(null);
   
   function handleKeywordChange (event) {
        setKeyword(event.target.value);
   } 

   function handleDictionaryResponse(response) {
        setResults(response.data[0]);
   }
   
   function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
     axios.get(apiUrl).then(handleDictionaryResponse);

     let pexelsApiKey =
       "563492ad6f917000010000016c1349b4c3e447b886e4d0bbc91c8557";
    let pexelsApiUrl = `https://api.pexels.com/v1/search?query=${keyword}&per_page=10`;
    let headers = { Authorization : `Bearer ${pexelsApiKey}`};
    axios.get(pexelsApiUrl, { headers: headers }).then(handlePexelsResponse);

   }

   function handlePexelsResponse(response) {
        setPhotos(response.data.photos);
   }

   function handleSubmit(event) {
        event.preventDefault();
        search();
   }

   function load() {
       setLoaded(true);
       search();
       
   }
   
   if (loaded) {
    return (   
           <div className="Dictionary">
            <h1>What are you looking for?</h1>
            <section>
            <form onSubmit={handleSubmit}> 
                <input type="search" onChange={handleKeywordChange} defaultValue="Hello" />
            </form>
            <div className="hint">
                suggested words: sunset, wine, yoga, hello
            </div>
            </section>

            <Results results={results} />

            <Photos photos={photos} />
        </div>
    );
    } else {
        load();
        return "Loading. . .";
    }
}

 