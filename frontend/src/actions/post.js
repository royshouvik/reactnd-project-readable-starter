import fetch from 'isomorphic-fetch';
import uuid from 'uuid/v1';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';
import {
  FETCH_POST,
  FETCH_POSTS,
  VOTE_POST,
  EDIT_POST,
  ADD_POST,
  DELETE_POST,
 } from '../actionTypes/post'

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

export const addPost = (post) => {
  const endPoint = '/posts';
  const { title, body, author, category } = post;
  const options = Object.assign({}, REQUEST_HEADER, {
    method: 'post',
    body: JSON.stringify(Object.assign({}, {
      id: uuid(),
      timestamp: new Date().getTime(),
      title,
      body,
      author,
      category,
    })),
  });
  const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
  return {
    type: ADD_POST,
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

export function editPost(postId, post) {
  const endPoint = `/posts/${postId}`;
  const { title, body } = post;
  const options = Object.assign({}, REQUEST_HEADER, {
    method: 'put',
    body: JSON.stringify({ title, body }),
  });
  const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
  return {
    type: EDIT_POST,
    payload,
  }
};

export function deletePost(postId) {
  const endPoint = `/posts/${postId}`;
  const options = Object.assign({}, REQUEST_HEADER, {
    method: 'delete',
  });
  const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
  return {
    type: DELETE_POST,
    payload,
  }
};