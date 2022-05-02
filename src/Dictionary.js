import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";
import Results from "./Results";

export default function Dictionary(props) {
   let [keyword, setKeyword] = useState(props.defaultKeyword);
   let [results, setResults] = useState(null);
   let [loaded, setLoaded] = useState(false);
   
   function handleKeywordChange (event) {
        setKeyword(event.target.value);
   } 

   function handleResponse(response) {
        setResults(response.data[0]);
   }
   
   function search() {
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
     axios.get(apiUrl).then(handleResponse);
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
        </div>
    );
    } else {
        load();
        return "Loading. . .";
    }
}

 