This is a simple demo running [Lexical](https://github.com/facebook/lexical) on [Next.js](https://github.com/vercel/next.js) sever side.

Demo: [lexical-nextjs-ssr.vercel.app](https://lexical-nextjs-ssr.vercel.app)

## Background
While implementing a service with Lexical, you must decide how to serialize data for saving in a repository. There could be several ways, but the two main options would be HTML vs JSON ([lexical-docs-serialization](https://lexical.dev/docs/concepts/serialization)). 

In the case of Lexical, I believe that JSON is a better way for the following reaseons:

Lexical injects the theme through class attribute into the exported/created HTML elements ([lexical-docs-theming](https://lexical.dev/docs/getting-started/theming)).
It provides flexibility when data is separated from the theme. That is the reason I prefer JSON over HTML for saving dat.
When you need to change styling policies, you can make the necessary adjustments in the CSS without affecting the data

Saving HTML in your repository may seem well-separated as well. However, the issue arises when you want to change the name of a class. Existing data might not be styled correctly. For example, injecting TailwindCSS utility classes directly on theming or changing the strategy from not utilizing theme (such as [TryGhost/Keonig](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/themes/default.js)) to utilizing it (such as [lexical-playground](https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/themes/PlaygroundEditorTheme.ts)) could break the CSS if you save data as HTML.

Due to this reason, you might decide to use JSON. Additionally, you might want to SSR for better UX or SEO. Next.js is probably the most popular framework to acheive this in the current frontend environment. 

The thing was that previously @lexical/headless and Next.js were not compatible with each other starting from Lexical@0.6.0. However, with the very recent release(v0.13.1), they have become compatiable with SSR on Next.js again ([Release Note](https://github.com/facebook/lexical/releases/tag/v0.13.1))!


## Getting Started
First, install the packages:
```bash
npm install
```

Then, run the development server:
```
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

You can inspect that the rendered HTML from the saved JSON is served in the network tab of your browser's devTools.

<img width="936" alt="image" src="https://github.com/2wheeh/lexical-nextjs-ssr/assets/40269597/0774ba4d-d7b6-4713-9fb2-6b36816db29f">
