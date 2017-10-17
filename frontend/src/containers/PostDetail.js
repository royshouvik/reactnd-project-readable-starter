import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../components/Post';
import Comment from '../components/Comment';
import { fetchPost, upVote, downVote } from '../actions/post';

class PostDetail extends Component {

    componentDidMount() {
        const { postId } = this.props.match.params;
        this.props.fetchPost(postId);
    }
    // componentWillReceiveProps(nextProps) {
    //     const  nextCategory = nextProps.match.params.category;
    //     const currentCategory = this.props.match.params.category;

    //     if (nextCategory !== currentCategory) {
    //         this.props.fetchPosts(nextCategory);
    //     }
    // }
    render() {
        const { post, upVote, downVote } = this.props;
        return (
            <main className="container">
                <section className="posts">
                    { 
                        post && <Post
                            post={post}
                            onUpVote={() => upVote(post.id)}
                            onDownVote={() => downVote(post.id)}
                        />
                    }
                    {
                        post && post.comments.length > 0 && post.comments.map(comment => (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                onUpVote={() => {}}
                                onDownVote={() => {}}
                            />
                        ))
                    }
                </section>
            </main>
        );
    }
}
PostDetail.propTypes = {
   
};

const mapStateToProps = ({ postDetail }) => {
    return {
      post: postDetail.activePost,
    };
  }
  
  const mapDispatchToProps = {
    fetchPost,
    upVote,
    downVote,
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);