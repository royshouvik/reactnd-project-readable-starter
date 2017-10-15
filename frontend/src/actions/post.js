import fetch from 'isomorphic-fetch';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';


export const FETCH_POSTS = 'FETCH_POSTS';

export const FETCH_POSTS_PENDING = `${FETCH_POSTS}_${PENDING}`;
export const FETCH_POSTS_FULFILLED = `${FETCH_POSTS}_${FULFILLED}`;
export const FETCH_POSTS_REJECTED = `${FETCH_POSTS}_${REJECTED}`;


export function fetchPosts(category) {
    const endPoint = category ? `/${category}/posts` : '/posts';
    const payload = fetch(`${API_BASE_URL}${endPoint}`, REQUEST_HEADER).then(res => res.json());
    return {
      type: FETCH_POSTS,
      payload,
    }
  }