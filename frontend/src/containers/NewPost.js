import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Select from "material-ui/Select";
import Input, { InputLabel } from "material-ui/Input";
import Button from "material-ui/Button";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import { addPost } from '../actions/post'

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: "50px 100px"
  },
  title: {
    fontSize: "24px",
    fontWeight: "400"
  },
  select: {
    minWidth: "100px",
    maxWidth: "200px",
  },
  submitButton: {
    color: "green",
    border: "2px solid rgba(0, 255, 0, 0.54)"
  },
  buttonContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px"
  }
});

const marginStyle = {
  margin: "10px 0"
};

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      author: '',
      title: '',
      category: '',
      isAdded: false,
      bodyError: '',
      authorError: '',
      titleError: '',
      categoryError: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return (event) => this.setState({
      [field]: event.target.value,
      bodyError: '',
      authorError: '',
      titleError: '',
      categoryError: '',
    });
  }

  handleSave() {
    const { body, author, title, category } = this.state;
    if (body === '') {
      this.setState({ bodyError: "Post is required." });
    }
    if (author === '') {
      this.setState({ authorError: "Name is required." });
    }
    if (title === '') {
      this.setState({ titleError: "Title is required." });
    }
    if (category === '') {
        this.setState({ categoryError: "Category is required." });
      }
    if (author !== '' && body !== '' && title !== '' && category !== '') {
        this.props.addPost({ body, author, title, category });
      this.setState({
        body: '',
        author: '',
        title: '',
        category: '',
        isAdded: true
      });
    }
  }
  render() {
    const { classes, categories } = this.props;
    const {
      title,
      body,
      author,
      category,
      titleError,
      bodyError,
      authorError,
      categoryError,
      isAdded
    } = this.state;
    if (isAdded) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <main className="container">
          <Paper elevation={4} className={classes.container}>
            <TextField
              value={title}
              onChange={this.handleChange("title")}
              helperText={titleError}
              className={classes.title}
              placeholder="Title of your post"
              fullWidth
              style={marginStyle}
            />
            <TextField
              value={body}
              onChange={this.handleChange("body")}
              helperText={bodyError}
              className={classes.body}
              style={marginStyle}
              placeholder="Write your post..."
              fullWidth
              multiline
              rows={8}
            />
            <TextField
              value={author}
              onChange={this.handleChange("author")}
              helperText={authorError}
              style={marginStyle}
              placeholder="Your name?"
              fullWidth
            />
            <FormControl style={marginStyle} className={classes.select}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                input={<Input />}
                onChange={this.handleChange('category')}
              >
                {categories &&
                  categories.map(c => (
                    <MenuItem key={c.name} value={c.name}>
                      {c.name.toUpperCase()}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{ categoryError }</FormHelperText>
            </FormControl>
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

NewPost.propTypes = {
  classes: PropTypes.object
};

const mapStateToProps = ({ categories }) => {
  return {
    categories: categories.data
  };
};

const mapDispatchToProps = {
  addPost
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NewPost)
);
