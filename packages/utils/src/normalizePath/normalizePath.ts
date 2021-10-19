import winPath from '../winPath/winPath';

export default function normalizePath(path: string) {
  path = winPath(path);
  path = `/${path}`;
  path.replace(/\/index$/, '/');
  return path;
}
