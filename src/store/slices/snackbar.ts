import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

interface SnackbarState {
  message: string;
  variant?: string;
}

const initialState: SnackbarState = {
  message: '',
  variant: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbarSlice',
  initialState,
  reducers: {
    setGlobalSnackbar: (state, action: PayloadAction<{
      message: string;
      variant?: string;
    }>) => {
      // state.messages.push(action.payload.message);
      state.message = action.payload.message;

      if (action.payload.variant !== '') {
        state.variant = action.payload.variant;
      }

      // const { enqueueSnackbar } = useSnackbar();
      // enqueueSnackbar('I love snacks.');
    },
    clearMessage: (state, action) => {
      state.message = '';
    }
  }
})

export const {
  setGlobalSnackbar,
  clearMessage,
} = snackbarSlice.actions

export default snackbarSlice.reducer
