import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    addIcon: {
        backgroundColor: '#0f9d58',
        padding: 4,
        borderRadius: 50,
        height: 40,
        width: 40,
        color: '#fcfffc',
        boxShadow: '0px 0px',
        '&:hover': {
            background: '#0f9d58'
        }
    },
});

function NewConversation(props) {

    const { classes } = props;

    return (
        <ListItem>
            <ListItemIcon>
                <IconButton className={classes.addIcon}>
                    <AddIcon />
                </IconButton>
            </ListItemIcon>

            <ListItemText>
                <Typography variant="h6" color="inherit" noWrap aria-label="New Conversation">
                    New Conversation
                </Typography>
            </ListItemText>

        </ListItem>
    )
}

NewConversation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewConversation);
