import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpClient from '@fuse/core/ApiClient';

const initialState = {
  error: false,
  loading: false,
  message: '',
  List: [{}],
  TotalCount: 0,
};

export const getAccounts = createAsyncThunk('accounts', async (params) => {
  const response = await httpClient.get('accounts');
  const data = await response.data;
  return data;
});

export const getAccount = createAsyncThunk(
  "getAccount",
  async (id, { dispatch, getState }) => {
    const { List } = getState().albums.albums;
    return List.find((element) => `${element.ID}` === id + '');
  }
);

export const deleteAccount = createAsyncThunk('removeAccount', async (params) => {
  const response = await httpClient.delete(`accounts/${params?.record_id}`);
  const data = await response.data;
  return data;
});
export const addAccount = createAsyncThunk("addAccount", async (params) => {
  const response = await httpClient.post("accounts", {
    data: {
      ...params,
    },
  });
  const data = await response.data;
  return data;
});

export const editAccount = createAsyncThunk('updateAccount', async (params) => {
  const response = await httpClient.put(`accounts/${params?.record_id}`, {
    data: {
      ...params,
    },
  });
  const data = await response.data;
  return data;
});
const AccountSlice = createSlice({
  name: 'accounts',
  initialState: {
    error: false,
    loading: false,
    message: '',
    List: [{}],
    TotalCount: 0,
  },

  reducers: {
    state: initialState,
    clearMessage: (state, action) => {
      state.message = '';
    }
  },

  extraReducers: {
    [getAccounts.pending]: (state) => {
      state.loading = true;
    },

    [getAccounts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.List = payload.response[1].DataList;
      state.TotalCount = payload.response[0].TotalCount;
    },
    [addAccount.pending]: (state) => {
      state.loading = true;
    },
    [addAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.msg === "error";
      state.message = payload.msg === "error" ? payload.response : payload.msg;
    },
    [addAccount.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.message = payload.response;
    },
    [editAccount.pending]: (state) => {
      state.loading = true;
    },
    [editAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.msg === "error";
      state.message = payload.msg === "error" ? payload.response : payload.msg;
    },
    [editAccount.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.message = payload.response;
    }
  },
});
export const { clearMessage } = AccountSlice.actions;
export default AccountSlice.reducer;
