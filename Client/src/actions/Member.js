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

import api from "./API";

export const Actions = {
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  FETCH: 'FETCH',
  LIST: 'LIST',
  UPDATE: 'UPDATE'
};

/**
 * Adds a new member with specified data.
 * 
 * @param record The member to add.
 * @param onSuccess A callback function be called after the operation
 * completes.
 */
export const Add = (record, onSuccess) => dispatch => {
  api.member()
    .insert(record)
    .then(response => {
      dispatch({
        payload: response.data,
        type: Actions.CREATE
      })
      onSuccess()
    })
    .catch(err => console.log(err))
}

/**
 * Deletes a member with a given unique identifier.
 * 
 * @param id The unique identifier of the member to delete. 
 * @param onSuccess A callback function to be called after the operation
 * completes. 
 */
export const Delete = (id, onSuccess) => dispatch => {
  api.member()
    .delete(id)
    .then(response => {
      dispatch({
        payload: id,
        type: Actions.DELETE
      })
      onSuccess()
    })
    .catch(err => console.log(err))
};

/**
 * Fetches all available members.
 */
export const List = () => dispatch => {
  api.member()
    .list()
    .then(response => {
      dispatch({
        payload: response.data,
        type: Actions.LIST
      });
    })
    .catch(err => console.log(err))
};

/**
 * Updates a member.
 * 
 * @param id The unique identifier of the member to update.
 * @param record The member to update.
 * @param onSuccess A callback function to be called after the operation
 * completes. 
 */
export const Update = (id, record, onSuccess) => dispatch => {
  api.member()
    .update(id, record)
    .then(response => {
      dispatch({
        payload: { id, ...record },
        type: Actions.UPDATE
      })
      onSuccess()
    })
    .catch(err => console.log(err))
}