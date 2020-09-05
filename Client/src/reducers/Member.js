/*
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Actions } from '../actions/Member';

const initialState = { list: [] };

export const Member = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CREATE:
      return {
        ...state,
        list: [...state.list, action.payload]
      }

    case Actions.DELETE:
      return {
        ...state,
        list: state.list.filter(x => x.id !== action.payload)
      }

    case Actions.LIST:
      return {
        ...state,
        list: [...action.payload]
      }

    case Actions.UPDATE:
      return {
        ...state,
        list: state.list.map(x => x.id === action.payload.id ? action.payload : x)
      }

    default:
      return state
  }
};