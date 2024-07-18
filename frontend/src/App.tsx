import { Fragment } from "react/jsx-runtime";
import RootRoute from "./routes/rootRoute";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <RootRoute />
      </Provider>
    </Fragment>
  );
}

export default App;
