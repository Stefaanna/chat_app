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




/*local Storage*/

// const convData = conversationData;
// const convData = localStorage.getItem("localStorageTest");
const convData = JSON.parse(localStorage.getItem("convData"),"[]");

const myConversations = convData.length ? convData : conversationData;
const convKeys = Object.keys(myConversations).map((e,i) => i+1);


class ClippedDrawer extends React.Component {
    state = {
        key: 1,
        conversation: conversationData[0],
        name: conversationData[0].name,
        sortedKeys: convKeys
    };

    sortConversations = () => {
        let keys = this.state.sortedKeys.filter(key => key !== (this.state.key));
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
        })
    };

    handleMessageSubmit = (message) => {
        this.handleMessageSaveProcess(this.state.key, message);
        this.sortConversations();
    };

    handleMessageSaveProcess(id, newMessage) {
        const currentConversation = JSON.parse(JSON.stringify(this.state.conversation));
        currentConversation.text.push(['2',newMessage, new Date()]);

        this.setState({
            conversation: currentConversation
        });

        myConversations[id-1].text.push(['2',newMessage, new Date()]);
        localStorage.setItem("convData", JSON.stringify(myConversations));
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
                            this.state.sortedKeys.map(index => {
                                // {conversationData.map(index =>
                                const convLength = myConversations[index - 1].text.length;
                                const lastMessage = myConversations[index - 1].text[convLength - 1][1];
                                const lastMessageDate = new Date(myConversations[index - 1].text[convLength - 1][2]);

                                return (
                                    <Conversation
                                        // className={classes.conversation}
                                        key={index}
                                        onClick={this.handleClick(myConversations[index-1])}
                                        avatar={myConversations[index - 1].avatar}
                                        name={myConversations[index - 1].name}
                                        lastMessage={lastMessage}
                                        date={lastMessageDate}
                                    />
                                )
                            })
                        }
                    </List>
                </Drawer>


                <OpenChat
                    conversation={this.state.conversation}
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
