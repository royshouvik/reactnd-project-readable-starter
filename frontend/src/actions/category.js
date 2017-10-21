import fetch from 'isomorphic-fetch';
import { API_BASE_URL, REQUEST_HEADER } from '../constants';
import { FETCH_CATEGORIES } from '../actionTypes/category'

export function fetchCategories() {

    const payload = fetch(`${API_BASE_URL}/categories`, REQUEST_HEADER).then(res => res.json());
    return {
      type: FETCH_CATEGORIES,
      payload,
    }
  }