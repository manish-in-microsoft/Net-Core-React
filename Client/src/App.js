/*
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { AppBar, Container, Toolbar, Typography, withStyles } from "@material-ui/core";

import React from 'react';
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

import './App.css';

import MemberList from './components/MemberList';
import { Store } from "./actions/Store";

function App() {
  return (
    <Provider store={Store}>
      <ToastProvider autoDismiss={true}>
        <Container>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Membership Tracker</Typography>
            </Toolbar>
          </AppBar>
          <MemberList />
        </Container>
      </ToastProvider>
    </Provider>
  );
}

export default App;