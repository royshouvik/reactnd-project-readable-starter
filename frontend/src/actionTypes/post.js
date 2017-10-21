import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';

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

export const ADD_POST = 'ADD_POST';

export const ADD_POST_PENDING = `${ADD_POST}_${PENDING}`;
export const ADD_POST_FULFILLED = `${ADD_POST}_${FULFILLED}`;
export const ADD_POST_REJECTED = `${ADD_POST}_${REJECTED}`;

export const EDIT_POST = 'EDIT_POST';

export const EDIT_POST_PENDING = `${EDIT_POST}_${PENDING}`;
export const EDIT_POST_FULFILLED = `${EDIT_POST}_${FULFILLED}`;
export const EDIT_POST_REJECTED = `${EDIT_POST}_${REJECTED}`;

export const DELETE_POST = 'DELETE_POST';

export const DELETE_POST_PENDING = `${DELETE_POST}_${PENDING}`;
export const DELETE_POST_FULFILLED = `${DELETE_POST}_${FULFILLED}`;
export const DELETE_POST_REJECTED = `${DELETE_POST}_${REJECTED}`;