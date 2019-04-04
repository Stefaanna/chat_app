import React from 'react'
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import ChatBubble from "./ChatBubble";
import MyChatBubble from "./MyChatBubble";
import CssBaseline from "@material-ui/core/CssBaseline";
import './styles.css'

const styles = theme => ({
    root: {
        width: "100%",
        margin: theme.spacing.unit * 5,
        marginTop: 20,
        // backgroundColor: '#e5e5e5',

    },
    toolbar: theme.mixins.toolbar,
    date: {
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#505050",
        padding: 5,
    }
});

class OpenChat extends React.Component {
    state = {
        messages: '',
    };

    render() {
        const { classes } = this.props;

        // console.log(this.props.conversation);
        const chatLog = this.props.conversation.text.map((message, index) =>
            (this.props.conversation.text[index][0] === '1' ?
                <ChatBubble
                    avatarIcon={this.props.conversation.avatar}
                    chatLine={message[1]}
                    dateClass={classes.date}
                    chatDate={new Date(message[2])}
                /> :
                <MyChatBubble
                    chatLine={message[1]}
                    dateClass={classes.date}
                    chatDate={new Date(message[2])}
                />
            )
        );

        const newMessages = this.props.newMessageText.map((myMessage, index) =>
            myMessage.trim() ?
                <MyChatBubble
                    chatLine={myMessage}
                    dateClass={classes.date}
                    chatDate={this.props.newMessageDate[index]}
                />
                : null
        );

        return (
            <div className={classes.root}>
                <div className={classes.toolbar} />

                <React.Fragment>
                    <CssBaseline />
                    {chatLog}
                    {newMessages}
                </React.Fragment>
            </div>
        )
    }
}

OpenChat.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OpenChat);

