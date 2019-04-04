import React from 'react'
import Conversation from './Conversation'
// import conversationData from './data/conversationData'
import * as convData from './data/convData.json'

const conversationData = JSON.parse(convData);

let convKeys=[''];

const generateKeys = () => {
    for (let i=1; i<conversationData.length; i++)
        convKeys.append(i);
};

class ConversationsList extends React.Component {

    state = {
        key: 1,
        name: conversationData[0].name,
        messages: [
            {id: 1, messagesText:[''], messagesDate:['']},
            {id: 2, messagesText:[''], messagesDate:['']},
            {id: 3, messagesText:[''], messagesDate:['']},
            {id: 4, messagesText:[''], messagesDate:['']},
            {id: 5, messagesText:[''], messagesDate:['']},
        ],
        currentMessage: [''],
    };

    handleClick = conversation => () => {
        this.setState({
            key: conversation.id,
            conversation: conversation,
            name: conversation.name,
            currentMessage: ['']
        })
    };


    render() {

        return (
            <div className="conversationList">
                {/*{this.state.sortedKeys.map(index) => }*/}
                {conversationData.map(index =>

                        <Conversation
                            // className={classes.conversation}
                            key={index}
                            onClick={this.handleClick(conversationData[index-1])}
                            avatar={conversationData[index - 1].avatar}
                            name={conversationData[index - 1].name}
                            lastMessage={
                                this.state.messages[conversationData[index - 1].id - 1].messagesText[this.state.messages[conversationData[index-1].id - 1].messagesText.length - 1] ?
                                    ("You: " + this.state.messages[conversationData[index-1].id - 1].messagesText[this.state.messages[conversationData[index-1].id - 1].messagesText.length - 1]) :
                                    (conversationData[index - 1].text[conversationData[index-1].text.length - 1][0] === "1" ? conversationData[index - 1].text[conversationData[index - 1].text.length - 1][1] : "You: " + conversationData[index - 1].text[conversationData[index - 1].text.length - 1][1])
                            }
                            date={
                                this.state.messages[conversationData[index - 1].id - 1].messagesText[this.state.messages[conversationData[index - 1].id - 1].messagesText.length - 1] ?
                                    (this.state.messages[conversationData[index - 1].id - 1].messagesDate[this.state.messages[conversationData[index - 1].id - 1].messagesDate.length - 1]) :
                                    (new Date(conversationData[index - 1].text[conversationData[index - 1].text.length - 1][2]))
                            }
                        />

                )}
            </div>
        )
    }
}

export default ConversationsList;