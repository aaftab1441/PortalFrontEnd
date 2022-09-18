import "../styles/globals.scss";
//import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import App from "next/app";
import { wrapper } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import {Provider, ReactReduxContext } from "react-redux";
//import { BrowserRouter, Switch, Routes, Route, HashRouter } from 'react-router-dom';
/*import {
  MuiPickersUtilsProvider,
} from '@mui/x-date-pickers';*/
import DateFnsUtils from '@date-io/date-fns';
import { withRouter } from 'next/router';
class MyApp extends App {
  constructor(props) {
    super(props);
  }

  // Getting Initial props.
  static getInitialProps = async ({ Component, ctx }) => {
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    return {
      pageProps,
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <PersistGate
            persistor={store.__PERSISTOR}
            loading={<div>Loading</div>}
          >
            <Provider store={store} context={ReactReduxContext}>
              
              <Component {...pageProps} />
             
            </Provider>
          
          </PersistGate>
        )}
      </ReactReduxContext.Consumer>
    
    );
   
  }
}

export default withRouter(wrapper.withRedux(MyApp));
