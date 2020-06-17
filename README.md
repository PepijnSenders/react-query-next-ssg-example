# `react-query` + `next.js` & `SSG` Example

This example uses [`react-query`](https://github.com/tannerlinsley/react-query) and [`next.js`](https://github.com/vercel/next.js).

## What's special?

This example uses SSG, meaning that basically every page is statically generated and could be served straight from the CDN. It also uses `react-query`'s latest `CacheProvider` API's to be able to render the data statically at build time.

## Some caveats

The SSR caching of `react-query` is not completely done yet. The progress to enable this is being tracked [here](https://github.com/tannerlinsley/react-query/issues/461). We can however already accomplish something similar by hydrating the cache manually trough the [`queryCache.setQueryData`](https://github.com/tannerlinsley/react-query#querycachesetquerydata) API.

We can use next.js's [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) to get the props for the page. The caveat here is that we need to identify the props by supplying the same query key that we use for `useQuery` to hydrate the cache.
