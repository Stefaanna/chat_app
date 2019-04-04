import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from "prop-types";
import { ListItemAvatar } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import { distanceInWordsToNow } from 'date-fns';

const styles = theme => ({
    conversation: {
        '&:hover': {
            background: '#d8d8d8',
            cursor: 'pointer'
        }
    },
    conversationDate: {
        fontFamily: "Roboto",
        color: "#505050",
        fontSize: 14,
    }
});

class Conversation extends React.Component {

    state = {
        time: distanceInWordsToNow(this.props.date)
    };

    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: distanceInWordsToNow(this.props.date)
            });
        }, 1000);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.conversation}>
                <ListItem
                    key={this.props.key}
                    onClick={this.props.onClick}
                >

                    <ListItemAvatar>
                        <Avatar src={this.props.avatar} alt="avatarIcon"/>
                    </ListItemAvatar>

                    <ListItemText
                        primary={this.props.name}
                        secondary={this.props.lastMessage}
                    />
                    <div className={classes.conversationDate}>
                        {this.state.time} ago
                    </div>

    {/*
                    <ListItemSecondaryAction>
                        <div className={classes.conversationDate}>{this.state.time} ago</div>
                    </ListItemSecondaryAction>
    */}

                </ListItem>
            </div>
        )
    }
}

Conversation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Conversation);
