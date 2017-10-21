import fetch from 'isomorphic-fetch';
import uuid from 'uuid/v1';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';
import { EDIT_COMMENT, ADD_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from '../actionTypes/comment';

export function editComment(commentId, body) {
    const endPoint = `/comments/${commentId}`;
    const options = Object.assign({}, REQUEST_HEADER, {
      method: 'put',
      body: JSON.stringify(body),
    });
    const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
    return {
      type: EDIT_COMMENT,
      payload,
    }
};

export const addComment = (parentId, comment) => {
  const endPoint = '/comments';
  const options = Object.assign({}, REQUEST_HEADER, {
    method: 'post',
    body: JSON.stringify(Object.assign({}, comment, {
      id: uuid(),
      parentId,
      timestamp: new Date().getTime(),
    })),
  });
  const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
  return {
    type: ADD_COMMENT,
    payload,
  }
};

export const deleteComment = (commentId) => {
  const endPoint = `/comments/${commentId}`;
  const options = Object.assign({}, REQUEST_HEADER, {
    method: 'delete',
  });
  const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
  return {
    type: DELETE_COMMENT,
    payload,
  }
};

const vote = (direction) => (commentId) => {
  const endPoint = `/comments/${commentId}`;
  const options = Object.assign({}, REQUEST_HEADER, {
    method: 'post',
    body: JSON.stringify({
      option: direction
    }),
  });
  const payload = fetch(`${API_BASE_URL}${endPoint}`, options).then(res => res.json());
  return {
    type: VOTE_COMMENT,
    payload,
  }
};

export const upVote = vote('upVote');
export const downVote = vote('downVote');