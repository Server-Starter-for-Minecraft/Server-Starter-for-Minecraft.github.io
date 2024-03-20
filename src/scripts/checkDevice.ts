let userAgent: string;

export function setUserAgent(ua: string) {
  userAgent = ua.toLowerCase();
}

export function isWindows() {
  return userAgent.indexOf('windows') !== -1;
}

export function isMac() {
  return userAgent.indexOf('Macintosh') !== -1;
}

export function isLinux() {
  return (
    userAgent.indexOf('linux') !== -1 && userAgent.indexOf('android') === -1
  );
}

export function isMobile() {
  return !(isWindows() || isMac() || isLinux());
}
