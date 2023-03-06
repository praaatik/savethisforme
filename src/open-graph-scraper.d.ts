declare module "open-graph-scraper" {
  interface Options {
    url: string;
    timeout?: number;
    headers?: { [header: string]: string };
  }

  interface Image {
    url: string;
    width?: string;
    height?: string;
    type?: string;
  }

  interface Result {
    error?: Error;
    success?: boolean;
    result?: {
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: Image;
      ogUrl?: string;
      ogSiteName?: string;
      ogLocale?: string;
      twitterCard?: string;
      twitterSite?: string;
      twitterCreator?: string;
      twitterTitle?: string;
      twitterDescription?: string;
      twitterImage?: Image;
    };
  }

  type Callback = (error: Error | null, result?: Result) => void;

  function ogs(options: Options, callback: Callback): void;
  function ogs(options: Options): Promise<Result>;
}
