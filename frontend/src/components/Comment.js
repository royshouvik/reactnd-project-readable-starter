import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import PersonIcon from "material-ui-icons/Person";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import ArrowDown from "material-ui-icons/KeyboardArrowDown";
import ArrowUp from "material-ui-icons/KeyboardArrowUp";
import TextField from "material-ui/TextField";
import { editComment, upVote, downVote } from '../actions/comment';

const propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number,
    timestamp: PropTypes.number.isRequired
  }).isRequired,
  downVote: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired
};

const disabledStyle = {
    opacity: '0.3',
};
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    display: "flex"
  }),
  avatar: {
    border: "1px solid #dbdbdb",
    color: "white",
    borderRadius: "50%",
    backgroundColor: "#dbdbdb",
    padding: "5px",
    marginRight: "10px"
  },
  header: {
    display: "flex",
    padding: "20px 0",
    alignItems: "center",
    justifyContent: "space-between"
  },
  category: {
    borderRadius: "0",
    backgroundColor: "#f5f5f5"
  },
  voteScore: {
    textAlign: "center",
    margin: "0 auto"
  },
  voteContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0.5
  },
  postContainer: {
    flexGrow: 9
  },
  author: {
    display: "flex"
  },
  title: {
    margin: "10px 0"
  },
  body: {
    marginBottom: "40px"
  },
  actions: {
    display: "flex"
  },
  actionButton: {
    border: "2px solid rgba(0, 0, 0, 0.54)"
  },
  deleteButton: {
    color: "red",
    border: "2px solid rgba(255, 0, 0, 0.54)"
  },
  saveButton: {
    color: "green",
    border: "2px solid rgba(0, 255, 0, 0.54)"
  },
  deleteContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  authorInput: {
      fontWeight: "500",
      fontSize: "14px",
      marginBottom: "5px",
  }
});

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      body: "",
      author: ""
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleChange = field => event =>
    this.setState({
      [field]: event.target.value
    });

  handleEditClick() {
    const { body, author } = this.props.comment;
    this.setState({
      isEditing: true,
      body,
      author
    });
  }

  handleSaveClick() {
    const { comment } = this.props;
    const { body, author } = this.state;
    this.props.editComment(comment.id, {
      body,
      author,
    })
    this.setState({ isEditing: false });
  }

  render() {
    const { comment, classes, upVote, downVote, onDelete } = this.props;
    const { isEditing } = this.state;
    const style = isEditing ? disabledStyle : {};
    return (
      <Paper className={classes.root} elevation={1}>
        <div className={classes.voteContainer}>
          <IconButton
            className={classes.button}
            disabled={isEditing}
            onClick={() => upVote(comment.id)}
          >
            <ArrowUp />
          </IconButton>
          <h2 className={classes.voteScore} style={style}>
            {comment.voteScore}
          </h2>
          <IconButton
            className={classes.button}
            disabled={isEditing}
            onClick={() => downVote(comment.id)}
          >
            <ArrowDown />
          </IconButton>
        </div>
        <div className={classes.postContainer}>
          <div className={classes.header}>
            <div className={classes.author}>
              <PersonIcon className={classes.avatar} />
              <div>
                {isEditing ? (
                  <TextField
                    value={this.state.author}
                    className={classes.authorInput}
                    onChange={this.handleChange("author")}
                  />
                ) : (
                  <Typography type="body2" component="p">
                    {comment.author}
                  </Typography>
                )}
                <Typography type="caption" style={style}>
                  {`Posted on ${new Date(comment.timestamp).toDateString()}`}
                </Typography>
              </div>
            </div>
          </div>
          <div>
            {isEditing ? (
              <TextField
                fullWidth
                multiline
                className={classes.body}
                value={this.state.body}
                onChange={this.handleChange("body")}
              />
            ) : (
              <Typography type="body1" component="p" className={classes.body}>
                {comment.body}
              </Typography>
            )}
          </div>
          <div className={classes.actions}>
            {isEditing ? (
              <div className={classes.deleteContainer}>
                <Button
                  dense
                  className={classes.saveButton}
                  onClick={this.handleSaveClick}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className={classes.actions} style={{ width: "100%" }}>
                <Button
                  dense
                  className={classes.actionButton}
                  onClick={this.handleEditClick}
                >
                  Edit
                </Button>
                <div className={classes.deleteContainer}>
                  <Button dense className={classes.deleteButton} onClick={onDelete}>
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Paper>
    );
  }
}

Comment.propTypes = propTypes;

const mapDispatchToProps = {
  editComment,
  upVote,
  downVote,
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Comment));

