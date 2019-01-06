import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { TOKEN_KEY, LOGOUT_KEY } from 'consts';

export const setToken = (token) => {
  if (!process.browser) {
    return;
  }
  Cookie.set(TOKEN_KEY, token);
}

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookie.remove(TOKEN_KEY);
  window.localStorage.setItem(LOGOUT_KEY, Date.now());
}

export const getUserFromServerCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${TOKEN_KEY}=`))
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1]
  return jwtDecode(jwt);
}

export const getUserFromLocalCookie = () => {
  const jwt = Cookie.getJSON(TOKEN_KEY);
  if (!jwt) {
    return undefined;
  }
  return jwtDecode(jwt);
}