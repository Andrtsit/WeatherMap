import { createContext, useContext, useMemo, useReducer } from "react";

const AppContext = createContext();

// SAVED MARKERS FROM LOCAL STORAGE AS INITIAL STATE
const storedMarkers = JSON.parse(localStorage.getItem("markers")) || [];

const initialState = {
  markers: storedMarkers,
  map: null,
};

const appReducer = function (state, action) {
  switch (action.type) {
    case "ADD_MARKER": {
      const updatedMarkers = [...state.markers, action.payload];
      localStorage.setItem("markers", JSON.stringify(updatedMarkers));
      return { ...state, markers: updatedMarkers };
    }
    case "SET_MAP":
      return { ...state, map: action.payload };
    default:
      return state;
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  return useContext(AppContext);
}
