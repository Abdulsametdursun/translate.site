import { createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../constants";
import axios from "axios";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    // send the request to the server
    const res = await axios.request(options);

    console.log(res);

    // return the response
    return res.data.data.languages;
  }
);

// translateText
export const translateText = createAsyncThunk(
  "translate/text",
  async ({ sourceLang, targetLang, text }) => {
    // According to the selected language, the request is sent to the server.
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/getLanguages",
      headers: {
        "x-rapidapi-key": "95c802f0ffmsh9313315b35d6314p1330ecjsned84a1ae46c3",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: params,
    };

    // Send the request to the server
    const res = await axios.request(options);

    // Send the response to the store
    return res.data.data.translatedText;
  }
);
