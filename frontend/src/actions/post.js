import fetch from 'isomorphic-fetch';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';


export const FETCH_POSTS = 'FETCH_POSTS';

export const FETCH_POSTS_PENDING = `${FETCH_POSTS}_${PENDING}`;
export const FETCH_POSTS_FULFILLED = `${FETCH_POSTS}_${FULFILLED}`;
export const FETCH_POSTS_REJECTED = `${FETCH_POSTS}_${REJECTED}`;

export const FETCH_POST = 'FETCH_POST';

export const FETCH_POST_PENDING = `${FETCH_POST}_${PENDING}`;
export const FETCH_POST_FULFILLED = `${FETCH_POST}_${FULFILLED}`;
export const FETCH_POST_REJECTED = `${FETCH_POST}_${REJECTED}`;

export const VOTE_POST = 'VOTE_POST';

export const VOTE_POST_PENDING = `${VOTE_POST}_${PENDING}`;
export const VOTE_POST_FULFILLED = `${VOTE_POST}_${FULFILLED}`;
export const VOTE_POST_REJECTED = `${VOTE_POST}_${REJECTED}`;


export function fetchPosts(category) {
    const endPoint = category ? `/${category}/posts` : '/posts';
    const payload = fetch(`${API_BASE_URL}${endPoint}`, REQUEST_HEADER).then(res => res.json());
    return {
      type: FETCH_POSTS,
      payload,
    }
};

export function fetchPost(postId) {
    const endPoint = `/posts/${postId}`;
    const payload = fetch(`${API_BASE_URL}${endPoint}`, REQUEST_HEADER).then(res => res.json());
    return {
      type: FETCH_POST,
      payload,
    }
};

const vote = (direction) => (postId) => {
  const endPoint = `/posts/${postId}`;
  const options = Object.assign({}, REQUEST_HEADER, {
    method: 'post',
    body: JSON.stringify({
      option: direction
    }),
  });
  const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
  return {
    type: VOTE_POST,
    payload,
  }
};

export const upVote = vote('upVote');
export const downVote = vote('downVote');