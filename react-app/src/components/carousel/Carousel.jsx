import React, { Component } from 'react';
import '../../slick/slick-theme.scss';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.content = [
            {
                content:
                    "Tomorrow, you will be released. If you are bored of brawling with thieves and want to achieve something there is a rare blue flower that grows on the eastern slopes. Pick one of these flowers. If you can carry it to the top of the mountain, you may find what you were looking for in the first place.",
                author: "Bane",
                source: "facebook"
            }, {
                content:
                    "You have learn to bury your guilt with anger. I will teach you to confront it and to face the truth.",
                author: "Ra's Al Ghul",
                source: "Snapchat"
            }, {
                content:
                    "Introduce a little anarchy, upset the established order and everything becomes chaos. I'm an agent of chaos. Oh, and you know the thing about chaos? It's fair.",
                author: "Joker",
                source: "facebook"
            }
        ]
        this.state = {
            activeIndex: 0
        }
    }
    render() {
        return (
            <div className="carousel"></div>
        );
    }
}

export default Carousel;
