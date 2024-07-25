type BuildConfig = {
  js?: string[];
};

type CopyConfig = {
  css?: string[];
};

type WatchConfig = {
  files?: string[];
  port?: number;
}

export type Config = {
  outDir?: string;
  build?: BuildConfig;
  copy?: CopyConfig;
  watch?: WatchConfig;
};
