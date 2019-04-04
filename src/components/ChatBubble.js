import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { distanceInWordsToNow } from 'date-fns';
import './styles.css'

function ChatBubble(props) {
    return (
        <Grid container wrap="nowrap" spacing={16}>
            <Grid item>
                <Avatar alt="alt" src={props.avatarIcon} />
            </Grid>
            <Grid item>
                <Typography className={"chatBubble"}>{props.chatLine}</Typography>
                <div className={props.dateClass}>{distanceInWordsToNow(new Date(props.chatDate))} ago</div>
            </Grid>
        </Grid>
    );

}

ChatBubble.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default ChatBubble;