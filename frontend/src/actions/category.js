import fetch from 'isomorphic-fetch';
import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';


export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const FETCH_CATEGORIES_PENDING = `${FETCH_CATEGORIES}_${PENDING}`;
export const FETCH_CATEGORIES_FULFILLED = `${FETCH_CATEGORIES}_${FULFILLED}`;
export const FETCH_CATEGORIES_REJECTED = `${FETCH_CATEGORIES}_${REJECTED}`;


export function fetchCategories() {

    const payload = fetch(`${API_BASE_URL}/categories`, REQUEST_HEADER).then(res => res.json());
    return {
      type: FETCH_CATEGORIES,
      payload,
    }
  }