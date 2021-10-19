export interface IDep {
  [name: string]: string;
}

export interface IPackage {
  name?: string;
  dependencies?: IDep;
  devDependencies?: IDep;
  [key: string]: any;
}

export interface ICommand {
  name: string;
  description: string;
  fn: (args?: any) => void;
}

export interface IHook {
  key: string;
  fn: () => Promise<void>;
  pluginId?: string;
  // before?: string;
  // stage?: number;
}

export interface IPackage {}

export interface IPlugin {
  id: string;
  apply: Function;
  path: string;
  isPreset?: boolean;
}

export interface IConfig {
  presets?: string[];
  plugins?: string[];
  [key: string]: any;
}

export interface IRoute {
  component?: any;
  exact?: boolean;
  title?: string;
  [key: string]: any;
}

export interface IPreset extends IPlugin {}
