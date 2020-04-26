import instance from '../../api/instance';
import history from '../../utils/history';
import {
  CREATE_ASSOCIATION,
  CREATE_ASSOCIATION_ERROR,
  CREATE_ASSOCIATION_SUCCESS,
  FETCH_ASSOCIATION_LINK_LIST,
  FETCH_ASSOCIATION_LINK_LIST_ERROR,
  FETCH_ASSOCIATION_LINK_LIST_SUCCESS,
  RESET_ASSOCIATION_LINK_LIST,
  FETCH_ASSOCIATIONS,
  FETCH_ASSOCIATIONS_ERROR,
  FETCH_ASSOCIATIONS_SUCCESS,
  RESET_ASSOCIATIONS,
  REMOVE_FROM_ASSOCIATION_LIST,
  DELETE_ASSOCIATION_LINK,
  DELETE_ASSOCIATION_LINK_SUCCESS,
  DELETE_ASSOCIATION_LINK_ERROR,
  // RESET_APP
} from './types';
import { message } from 'antd';

// fetch associations for associationLinklist
export const fetchAssociationLinkList = (query) => async (dispatch) => {
  try {
    if (!query.page) {
      dispatch({ type: RESET_ASSOCIATION_LINK_LIST });
      query.page = 1;
    }
    dispatch({ type: FETCH_ASSOCIATION_LINK_LIST });
    const response = await instance.get('/association', {
      params: { nodeId: query.nodeId, page: query.page },
    });
    dispatch({
      type: FETCH_ASSOCIATION_LINK_LIST_SUCCESS,
      payload: response.data,
      nodeId: query.nodeId,
      page: query.page,
    });
  } catch (err) {
    dispatch({ type: FETCH_ASSOCIATION_LINK_LIST_ERROR });
    message.error('Could not fetch items', 1);
    history.push('/');
  }
};

// fetch associations for associationList
export const fetchAssociations = (query) => async (dispatch) => {
  try {
    if (!query.page) {
      dispatch({ type: RESET_ASSOCIATIONS });
      query.page = 1;
    }
    dispatch({ type: FETCH_ASSOCIATIONS });
    const response = await instance.get('/association', {
      params: { nodeId: query.nodeId, page: query.page },
    });
    dispatch({
      type: FETCH_ASSOCIATIONS_SUCCESS,
      payload: response.data,
      nodeId: query.nodeId,
      page: query.page,
    });
  } catch (err) {
    dispatch({ type: FETCH_ASSOCIATIONS_ERROR });
    message.error('Could not fetch items', 1);
    history.push('/');
  }
};

// create a new association
export const createAssociation = (nodeId, linkedNode) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ASSOCIATION });
    const response = await instance.post('/association', {
      nodeId,
      linkedNode,
    });
    dispatch({
      type: CREATE_ASSOCIATION_SUCCESS,
      associatedNode: response.data.association.associated,
    });
  } catch (err) {
    dispatch({ type: CREATE_ASSOCIATION_ERROR });
    message.error('Could not create association', 1);
    history.push('/');
  }
};

// get autocomplete values for association creation
export const associationAutocomplete = (query) => async (dispatch) => {
  try {
    const response = await instance.get('/association/autocomplete', {
      params: { searchQuery: query.searchQuery, nodeId: query.id },
    });
    return response.data.nodes;
  } catch (err) {
    message.error('Could not search nodes', 1);
    history.push('/');
  }
};

// delete text node handler
export const deleteAssociationLink = (nodeA, nodeB) => async (dispatch) => {
  dispatch({ type: DELETE_ASSOCIATION_LINK });
  try {
    const response = await instance.delete(`/association`, { params: { nodeA, nodeB } });
    if (response.status === 200) {
      dispatch({ type: DELETE_ASSOCIATION_LINK_SUCCESS, deletedId: response.data.deletedId });
    }
  } catch (err) {
    dispatch({ type: DELETE_ASSOCIATION_LINK_ERROR });
    message.error('There was a problem deleting the node', 1);
  }
};

// remove from association list
export const removeFromAssociationList = (id) => {
  return {
    type: REMOVE_FROM_ASSOCIATION_LIST,
    id,
  };
};