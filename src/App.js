import React from "react";
import Header from "./components/Header";
import Info from "./components/Info";

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
    state = {
        ageRating: undefined,
        url: undefined,
        description: undefined,
        topMovies: []
    };

    gettingFilms = async(e) => {
        e.preventDefault();
        const query = e.target.elements.query.value;
        try {
            const api_url = await fetch(`https://api.kinopoisk.dev/movie/search?page=1&limit=10&query=${query}`, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'accept': 'application/json'
                },
            });
            if (!api_url.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await api_url.json();
            if (data && data.docs && data.docs.length > 0) {
                this.setState({
                    ageRating: data.docs[0].ageRating,
                    url: data.docs[0].backdrop.url,
                    description: data.docs[0].description
                });
            }
        } catch (error) {
            console.error('Error fetching or processing data:', error);
        }
    };

    getTopMovies = async() => {
        try {
            const currentYear = new Date().getFullYear();
            const api_url = await fetch(`https://api.kinopoisk.dev/movie?token=${API_KEY}&field=rating.kp&search=!null&sortField=rating.kp&sortType=-1&limit=14&year=${currentYear - 1}-${currentYear}`);
            if (!api_url.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await api_url.json();
            this.setState({ topMovies: data.docs });
        } catch (error) {
            console.error('Error fetching top movies:', error);
        }
    };

    componentDidMount() {
        this.getTopMovies();
    }

    render() {
        return ( <
            div className = "Films" >
            <
            h1 > Films < /h1> <
            Header films = { this.gettingFilms }
            /> <
            button onClick = { this.getTopMovies } > Топ фильмов < /button> <
            div > {
                this.state.topMovies.map(movie => ( <
                    Info key = { movie.id }
                    ageRating = { movie.ageRating }
                    url = { movie.backdrop.url }
                    description = { movie.description }
                    />
                ))
            } <
            /div> <
            Info ageRating = { this.state.ageRating }
            url = { this.state.url }
            description = { this.state.description }
            /> <
            /div>
        );
    }
}

export default App;