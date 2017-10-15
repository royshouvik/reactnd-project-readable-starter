import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '50px 100px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '400',
    },
    select: {
        minWidth: '100px',
    }
});

const marginStyle = {
    margin: '10px 0',
};

class NewPost extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <main className="container">
                    <Paper elevation={4} className={classes.container}>
                        <TextField
                            className={classes.title}
                            placeholder="Title of your post"
                            fullWidth
                            style={marginStyle}
                        />
                        <TextField
                            className={classes.body}
                            style={marginStyle}
                            placeholder="Write your post..."
                            fullWidth
                            multiline
                            rows={8}
                        />
                        <TextField
                            style={marginStyle}
                            placeholder="Your name?"
                            fullWidth
                        />
                        <FormControl style={marginStyle} className={classes.select}>
                            <Select
                                value=""
                                input={<Input />}
                            >
                                <MenuItem value={10}>REACT</MenuItem>
                                <MenuItem value={20}>REDUX</MenuItem>
                                <MenuItem value={30}>UDACITY</MenuItem>
                            </Select>
                        </FormControl>
                    </Paper>
                </main>
            </div>
        );
    }
}

NewPost.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(NewPost);