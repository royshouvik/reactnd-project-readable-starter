import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "50px"
  },
  submitButton: {
    color: "green",
    border: "2px solid rgba(0, 255, 0, 0.54)"
  },
  buttonContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  }
});

const marginStyle = {
  margin: "10px 0"
};

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      author: '',
      bodyError: '',
      authorError: ''
    };
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange = field => event =>
    this.setState({
      [field]: event.target.value,
      bodyError: '',
      authorError: '',
    });

  handleSave() {
    const { body, author } = this.state;
    if (body === '') {
        this.setState({ bodyError: 'Comment is required.'});
    }
    if (author === '') {
        this.setState({ authorError: 'Name is required.'});
    }
    if (author !== '' && body !== '') {
        this.props.onAdd({ body, author });
        this.setState({ body: '', author: ''});
    }
  }
  render() {
    const { classes } = this.props;
    const { body, author, bodyError, authorError } = this.state;
    return (
      <div>
        <main className="container">
          <Paper elevation={4} className={classes.container}>
            <TextField
              value={body}
              onChange={this.handleChange("body")}
              helperText={bodyError}
              className={classes.body}
              style={marginStyle}
              placeholder="Write your comment..."
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              onChange={this.handleChange("author")}
              value={author}
              style={marginStyle}
              helperText={authorError}
              placeholder="Your name?"
              fullWidth
            />
            <div className={classes.buttonContainer}>
              <Button
                dense
                className={classes.submitButton}
                onClick={this.handleSave}
              >
                Submit
              </Button>
            </div>
          </Paper>
        </main>
      </div>
    );
  }
}

NewComment.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(NewComment);
