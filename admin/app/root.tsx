import React from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
} from '@remix-run/react';

import type { LinksFunction } from '@remix-run/node';
import styles from './root.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
];

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Outlet />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
