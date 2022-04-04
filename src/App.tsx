import { Provider } from "react-redux";
import Main from "./Pages/main";
import { store } from "./Store/store";
const App = () => {
    return (
        <Provider store={store}>
            <Main></Main>
        </Provider>
    );
};
export default App;
