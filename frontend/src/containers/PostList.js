import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from '../components/Post';
import { fetchPosts, upVote, downVote } from '../actions/post';

class PostList extends Component {

    componentDidMount() {
        const currentCategory = this.props.match.params.category;
        this.props.fetchPosts(currentCategory);
    }
    componentWillReceiveProps(nextProps) {
        const  nextCategory = nextProps.match.params.category;
        const currentCategory = this.props.match.params.category;

        if (nextCategory !== currentCategory) {
            this.props.fetchPosts(nextCategory);
        }
    }
    render() {
        const { posts, upVote, downVote } = this.props;
        return (
            <main className="container">
                <section className="posts">
                    {
                        posts && posts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onUpVote={() => upVote(post.id)}
                            onDownVote={() => downVote(post.id)}
                        />)
                        )
                    }
                </section>
            </main>
        );
    }
}
PostList.propTypes = {
    posts: PropTypes.array.isRequired,
};

const mapStateToProps = ({ posts }) => {
    return {
      posts: posts.data,
    };
  }
  
  const mapDispatchToProps = {
    fetchPosts,
    upVote,
    downVote,
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostList);