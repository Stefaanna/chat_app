import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    appBar: {
        backgroundColor: "#0f9d58",
        zIndex: theme.zIndex.drawer + 1,
        position: 'fixed',
    },
    menuButton: {
        marginRight: 20,
        marginLeft: -12,
    },
    contactName: {
        marginLeft: "22%",
        flexGrow: 1,
    },
});

function ChatHeader(props) {
    const {classes} = props;

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>

                    <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6" color="inherit" noWrap className={classes.username}>{/*<Typography className={classes.username} variant="h6" color="inherit" noWrap>*/}
                        Username
                    </Typography>

                    <Typography variant="h6" color="inherit" noWrap className={classes.contactName}>
                        {props.contactName}
                    </Typography>

                    <IconButton color="inherit">
                        <VideocamIcon/>
                    </IconButton>

                    <IconButton color="inherit">
                        <MoreIcon/>
                    </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    );
}

ChatHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatHeader);