import { createSelector } from 'reselect';

const chatData = state => state.features.chat;
const userData = state => state.data.user;

export const getMessages = createSelector([chatData], chat => chat.messages);
export const getUserId = createSelector([userData], user => user.id);
