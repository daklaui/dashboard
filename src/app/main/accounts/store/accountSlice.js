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
  const response = await httpClient.get('accounts', {
    params: {
      page: params?.page ? params?.page : 0,
      limit: params?.perPage ? params?.perPage : 10000,
    }
  });
  const data = await response.data;
  return data;
});

export const getAccount = createAsyncThunk(
  "getAccount",
  async (id, { dispatch, getState }) => {
    const { List } = getState().accounts.accounts;
    return List.find((element) => `${element.id}` === id);
  }
);

export const deleteAccount = createAsyncThunk('removeAccount', async (params) => {
  const response = await httpClient.delete(`accounts/${params?.record_id}`);
  const data = await response.data;
  return data;
});
export const addAccount = createAsyncThunk("addAccount", async (params) => {
  const response = await httpClient.post("accounts", {
    
      ...params,
    
  });
  const data = await response.data;
  return data;
});

export const editAccount = createAsyncThunk('updateAccount', async (params) => {
  const response = await httpClient.put(`accounts/${params?.account_id}`, {

    ...params,

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
      state.List = payload.results.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.updated) - new Date(a.updated);
      });;
      state.TotalCount = payload.limit;
    },
    [addAccount.pending]: (state) => {
      state.loading = true;
    },
    [addAccount.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.msg === "error";
      state.message = payload.msg === "error" ? payload.response :  'success';
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
      state.message = payload.msg === "error" ? payload.response : 'success';
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
