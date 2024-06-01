import React from "react";

class Info extends React.Component {
    render() {
        return ( <
            div >
            <
            p > { this.props.ageRating } < /p> <
            p > { this.props.description } < /p> <
            img src = 'https://api.kinopoisk.dev/v1.3/movie?token=${API_KEY}&search=${query}&field=name&limit=10;'
            width = "400px"
            height = "400px"
            alt = "" / >
            <
            /div>
        )
    }
}
export default Info;