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
    this.state = ({loaded: false})

  }

  componentWillUnmount() {
    this.routeStart();
    Router.events.off('routeChangeStart', () => this.routeStart());
    Router.events.off('routeChangeComplete', () => this.routeEnd());
  }

  componentDidMount() {
    this.routeEnd();
    Router.events.on('routeChangeStart', () => this.routeStart());
    Router.events.on('routeChangeComplete', () => this.routeEnd());
  }

  routeStart() {
    this.setState({loaded: false});
  }

  routeEnd() {
    setTimeout(
      function() {
        this.setState({loaded: true});
      }
      .bind(this),
      1500
    );
  }

  render() {
      const {Component, pageProps} = this.props;
      return (
        <Provider store={this.store}>
          <>
            {!this.state.loaded ? (
              <div className="page-loading">
                <img src="/images/page-loading.gif" alt="..." />
              </div>
            ) : (
              <Component {...pageProps} />
            )}
          </>
        </Provider>
      );
  }

}

export default MyApp;