import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Post from '../components/Post';
import Comment from '../components/Comment';
import NewComment from '../components/NewComment';
import { fetchPost, upVote, downVote, editPost, deletePost } from '../actions/post';
import { addComment, deleteComment } from '../actions/comment';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.handleAddComment = this.handleAddComment.bind(this);
    }

    componentDidMount() {
        const { postId } = this.props.match.params;
        this.props.fetchPost(postId);
    }

    handleAddComment(comment) {
        const { post, addComment } = this.props;
        addComment(post.id, comment);
    }

    render() {
        const { post, isEmpty, upVote, downVote, deleteComment, editPost, deletePost } = this.props;
        if (isEmpty || (post && post.error)) {
            return <Redirect to="/"/>
        }
        return (
            <main className="container">
                <section className="posts">
                    { 
                        post && (<div>
                                    <Post
                                        post={post}
                                        onEdit={editPost}
                                        onDelete={() => deletePost(post.id)}
                                        onUpVote={() => upVote(post.id)}
                                        onDownVote={() => downVote(post.id)}
                                    />
                                    <NewComment onAdd={this.handleAddComment}/>
                                </div>)
                    }
                    {
                        post && post.comments.length > 0 && post.comments.map(comment => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                onDelete={() => deleteComment(comment.id)}
                            />
                        ))
                    }
                </section>
            </main>
        );
    }
}
PostDetail.propTypes = {
   fetchPost: PropTypes.func.isRequired,
   editPost: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired,
   upVote: PropTypes.func.isRequired,
   downVote: PropTypes.func.isRequired,
   addComment: PropTypes.func.isRequired,
   deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = ({ postDetail }) => {
    return {
      post: postDetail.activePost,
      isEmpty: postDetail.isEmpty,
    };
  }
  
  const mapDispatchToProps = {
    fetchPost,
    editPost,
    deletePost,
    upVote,
    downVote,
    addComment,
    deleteComment,
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);