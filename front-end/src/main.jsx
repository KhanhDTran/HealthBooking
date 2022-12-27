import React from "react";
import ReactDOM from "react-dom/client";
import HealthBooking from "./pages/HealthBooking";
import i18n from "./translations/i18n";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <HealthBooking />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
