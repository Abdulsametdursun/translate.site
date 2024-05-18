import "./style.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/translateActions";
import Select from "react-select";
import { setTranslated } from "./redux/translateSlice";

const App = () => {
  const state = useSelector((store) => store.translate);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  // Fetches language data and dispatches it to the store
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // Converts objects with {code and name} values from the array received from the API
  // to objects with {label and value} values. However, since this map is top-level code,
  // it will run every time the component re-renders.
  // We used useMemo to prevent this.
  const refinedData = useMemo(
    () =>
      state.languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      })),
    [state.languages]
  );

  // Swap languages
  const handleSwap = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);

    // Transfer the value from the bottom input to the top input
    setText(state.translatedText);

    // Transfer the value from the top input to the bottom input, i.e., to the store
    dispatch(setTranslated(text));
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Translate +</h1>
        {/* upper section */}
        <div className="upper">
          <Select
            className="select"
            onChange={setSourceLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            options={refinedData}
            value={sourceLang}
          />
          <button onClick={handleSwap}>Swap</button>
          <Select
            className="select"
            onChange={setTargetLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            options={refinedData}
            value={targetLang}
          />
        </div>
        {/* middle section */}
        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            {state.isTranslateLoading && (
              <ul class="wave-menu">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            )}
            <textarea value={state.translatedText} disabled />
          </div>
        </div>
        {/* lower section */}
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
