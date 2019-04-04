import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton'
import EmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ImagePhotoIcon from '@material-ui/icons/Photo';

const styles = theme => ({
    sendMessageBar: {
        bottom: 0,
        top: 'auto',
        background: '#fff',
        height: 65,
        width: 'auto',
        left: '30%',
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textField: {
        width: theme.spacing.unit * 100,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

class SendMessageBar extends React.Component {
    state = {
        message: ''
    };

    handleTextChange = (event) => {
        this.setState({
            message: event.target.value
        });
    };

    handleKeyPressed = (event) => {
        if (event.key === "Enter" && event.target.value.trim()) {
            this.props.onMessageSubmit(this.state.message);
            this.setState({
                message: ''
            })
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="fixed" color="primary" className={classes.sendMessageBar}>
                <Toolbar className={classes.toolbar}>

                    <IconButton>
                        <EmoticonIcon/>
                    </IconButton>

                    <Input
                        className={classes.input}
                        fullWidth={true}
                        disableUnderline={true}
                        placeholder="Send a message"
                        value={this.state.message}
                        onChange={this.handleTextChange}
                        onKeyPress={this.handleKeyPressed}
                    />

                    <IconButton>
                        <ImagePhotoIcon/>
                    </IconButton>

                </Toolbar>
            </AppBar>
        );
    }
}

SendMessageBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendMessageBar);