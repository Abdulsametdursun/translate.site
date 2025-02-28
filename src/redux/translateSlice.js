import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateText } from "./translateActions";

const initialState = {
  isLangsLoading: false,
  isLangsError: false,
  languages: [],
  isTranslateLoading: false,
  isTranslateError: false,
  translatedText: "",
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLangsLoading = true;
    });

    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isLangsLoading = false;
      state.isLangsError = false;
      state.languages = action.payload;
    });

    builder.addCase(getLanguages.rejected, (state) => {
      state.isLangsLoading = false;
      state.isLangsError = true;
    });

    // Update store for translate text action
    builder.addCase(translateText.pending, (state) => {
      state.isTranslateLoading = true;
    });

    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isTranslateLoading = false;
      state.isTranslateError = false;
      state.translatedText = action.payload;
    });

    builder.addCase(translateText.rejected, (state) => {
      state.isTranslateLoading = false;
      state.isTranslateError = true;
    });
  },
  // will continue to use reducers for synchronous actions.
  reducers: {
    setTranslated: (state, action) => {
      state.translatedText = action.payload;
    },
  },
});

export const { setTranslated } = translateSlice.actions;
