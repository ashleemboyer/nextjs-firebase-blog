// This is called a "Custom `App` in Next.js.
// We use it for global styles and will later use it for loading an
// icon library. You can read more about this in the Next.js docs at:
// https://nextjs.org/docs/advanced-features/custom-app

import { AuthProvider } from '@contexts/auth';
import '@styles/global.scss';

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default App;
