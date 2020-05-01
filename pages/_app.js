import Router from "next/router";
import React from "react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import '../styles/global.scss'
import thunkMiddleware from 'redux-thunk';

import reducer from '../lib/store/reducer';

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
// const makeStore = (initialState, options) => {
//   return createStore(reducer);
// };

let store = null

export const initStore = (reducer, initialState, isServer) => {
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
  } else {
    if (!store) {
      store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
    }
    return store
  }
}

class MyApp extends App {

  static async getInitialProps({Component, ctx, req}) {
    const isServer = !!req
    const store = initStore(reducer, {}, isServer)
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return {pageProps, initialState: store.getState(), isServer};
  }

  constructor (props) {
    super(props)
    this.store = initStore(reducer, props.initialState, props.isServer)
  }

  render() {
      const {Component, pageProps} = this.props;
      return (
        <Provider store={this.store}>
          <Component {...pageProps} />
        </Provider>
      );
  }

}

export default MyApp;

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default function App({ Component, pageProps }) {
//   const [loading, setLoading] = React.useState(false);
//   React.useEffect(() => {
//     const start = () => {
//       console.log("start");
//       setLoading(true);
//     };
//     const end = () => {
//       console.log("findished");
//       setLoading(false);
//     };
//     Router.events.on("routeChangeStart", start);
//     Router.events.on("routeChangeComplete", end);
//     Router.events.on("routeChangeError", end);
//     return () => {
//       Router.events.off("routeChangeStart", start);
//       Router.events.off("routeChangeComplete", end);
//       Router.events.off("routeChangeError", end);
//     };
//   }, []);
//   return (
//     <>
//       {loading ? (
//         <h1>Loading...</h1>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </>
//   );
// }