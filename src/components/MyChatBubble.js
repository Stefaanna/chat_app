import React from 'react';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {distanceInWordsToNow} from "date-fns";
import './styles.css'

class MyChatBubble extends React.Component {
    state = {
        time: distanceInWordsToNow(this.props.chatDate)
    };

    componentDidMount() {
        this.timeInterval = setInterval( () => {
            this.setState({
                time: distanceInWordsToNow(this.props.chatDate)
            })
        }, 1000);
    }

    /*componentWillUnmount() {
        clearInterval(this.timeInterval);
        console.log("cleared it");
    }*/

    render() {
        return (
            <Grid container nowrap justify="flex-end" spacing={16}>
                <Grid item>
                    <Typography className={"myChatBubble"}>{this.props.chatLine}</Typography>
                    <div className={this.props.dateClass}>{this.state.time} ago</div>
                </Grid>
                <Grid item>
                    <Avatar alt="alt" src={this.props.avatarIcon}/>
                </Grid>

            </Grid>
        );
    }

}

MyChatBubble.propTypes = {
    dateClass: Object.string,
    chatLine: Object.string,
    avatarIcon: Object.string,
};

export default MyChatBubble;