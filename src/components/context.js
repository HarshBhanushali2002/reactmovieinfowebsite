import React, { useEffect, useContext, useState} from 'react';

const API_URL = `http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({children})=>{

    const[isLoading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setError] = useState({show: "false", msg: ""})

    const [query, setQuery] = useState("Avengers");
    const getMovies = async(url) =>{
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if (data.Response === "True") {
                setLoading(false);
                setError({
                    show: false,
                    msg: " "
                })
                setMovie(data.Search);
                
                
            } else {
                setError({
                    show: "true",
                    msg: data.Error
                })
                
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
       let timeout = setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`);
        }, 800);

        return () => clearTimeout(timeout);

    }, [query]);

    return ( <AppContext.Provider value={{isLoading, isError, movie, query, setQuery}}>
        {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () =>{
    return useContext(AppContext);
}


export {AppContext, AppProvider, useGlobalContext};