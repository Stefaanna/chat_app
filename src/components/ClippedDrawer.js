import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import NewConversation from './NewConversation'
import OpenChat from "./OpenChat";
import SendMessageBar from "./SendMessageBar";
import ChatHeader from "./ChatHeader";
import Conversation from "./Conversation";
import conversationData from './data/conversationData'
// import * as convData from './data/convData.json'

// const conversationData = JSON.parse(convData);

const convKeys = Array(conversationData.length).fill(0).map((e,i) => i+1);

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#0f9d58',
        zIndex: theme.zIndex.drawer + 1,
    },
    menuIcon: {
        marginRight: theme.spacing.unit * 3,
    },
    grow: {
        flexGrow: 1,
    },
    drawer: {
        width: '30%',
        flexShrink: 0,

    },
    drawerPaper: {
        width: '30%',
    },
    content: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,

});

class ClippedDrawer extends React.Component {
    state = {
        key: 1,
        conversation: conversationData[0],
        name: conversationData[0].name,
        messages: [
            {id: 1, messagesText:[''], messagesDate:['']},
            {id: 2, messagesText:[''], messagesDate:['']},
            {id: 3, messagesText:[''], messagesDate:['']},
            {id: 4, messagesText:[''], messagesDate:['']},
            {id: 5, messagesText:[''], messagesDate:['']},
        ],
        currentMessage: [''],
        sortedKeys: convKeys
    };

    sortConversations = () => {
        let keys = this.state.sortedKeys.filter(key => key != this.state.key)
        keys.unshift(this.state.key);
        this.setState({
            sortedKeys: keys
        })
    };

    handleClick = conversation => () => {
        this.setState({
            key: conversation.id,
            conversation: conversation,
            name: conversation.name,
            currentMessage: ['']
        })
    };

    handleMessageSubmit = (message) => {
        this.handleMessageSaveProcess(this.state.key, message);
        this.sortConversations();
    };

    handleMessageSaveProcess(id, newMessage) {
        this.setState(prevState => ({
            ...prevState,
            messages: prevState.messages.map(message => ({
                    ...message,
                    messagesText: message.id === id ? message.messagesText.concat(newMessage) : message.messagesText,
                    messagesDate: message.id === id ? message.messagesDate.concat(new Date()) : message.messagesDate,
            }))
        }))
    }

    render() {
        const { classes } = this.props;

        return (
        <div className={classes.root}>
            <CssBaseline />

            <ChatHeader
                contactName={this.state.name}
            />

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />

                <List>
                    <NewConversation />

                    {/*<ConversationsList />*/}
                    {
                        this.state.sortedKeys.map(index =>
                        // {conversationData.map(index =>

                            <Conversation
                                // className={classes.conversation}
                                key={index}
                                onClick={this.handleClick(conversationData[index-1])}
                                avatar={conversationData[index - 1].avatar}
                                name={conversationData[index - 1].name}
                                lastMessage={
                                    this.state.messages[conversationData[index - 1].id - 1].messagesText[this.state.messages[conversationData[index-1].id - 1].messagesText.length - 1] ?
                                        ("You: " + this.state.messages[conversationData[index-1].id - 1].messagesText[this.state.messages[conversationData[index-1].id - 1].messagesText.length - 1]) :
                                        (conversationData[index - 1].text[conversationData[index-1].text.length - 1][0] === "1" ?
                                        conversationData[index - 1].text[conversationData[index - 1].text.length - 1][1] :
                                        "You: " + conversationData[index - 1].text[conversationData[index - 1].text.length - 1][1])
                                }
                                date={
                                    this.state.messages[conversationData[index - 1].id - 1].messagesText[this.state.messages[conversationData[index - 1].id - 1].messagesText.length - 1] ?
                                        (this.state.messages[conversationData[index - 1].id - 1].messagesDate[this.state.messages[conversationData[index - 1].id - 1].messagesDate.length - 1]) :
                                        (new Date(conversationData[index - 1].text[conversationData[index - 1].text.length - 1][2]))
                                }
                            />)
                    }
                </List>
            </Drawer>


            <OpenChat
                conversation={this.state.conversation}
                newMessageText={this.state.messages[this.state.key - 1].messagesText}
                newMessageDate={this.state.messages[this.state.key - 1].messagesDate}
            />

            <SendMessageBar
                onMessageSubmit={this.handleMessageSubmit}
            />

        </div>
        )

    }
}

ClippedDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);
