import React from "react";

class Header extends React.Component {
    render() {
        return ( <
            div className = "Button" >
            <
            form onSubmit = { this.props.films } >
            <
            input type = "text"
            name = "query" / >
            <
            button > Найти < /button> <
            /form> <
            /div>
        )
    }
}

export default Header