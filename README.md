This is a simple PoC for running [Lexical](https://github.com/facebook/lexical) on [Next.js](https://github.com/vercel/next.js) to achieve the following:
- SSR the read mode for SEO.
    > You can inspect the rendered HTML by the headless editor from the nextjs server in the network tab of your browser's devTools.
    <img width="930" alt="image" src="https://github.com/2wheeh/lexical-nextjs-ssr/assets/40269597/73b448f6-334b-4381-b8bc-15c13b2ef074">
    
- Editable on the client side for smooth UX.
  
  https://github.com/2wheeh/lexical-nextjs-ssr/assets/40269597/ecf1b914-ae8d-494b-a87e-b2033fb2bf13




### Demo: [lexical-nextjs-ssr.vercel.app](https://lexical-nextjs-ssr.vercel.app)

## Background
While implementing a service with Lexical, you must decide how to serialize data for saving in a repository. There could be several ways, but the two main options would be HTML vs JSON ([lexical-docs-serialization](https://lexical.dev/docs/concepts/serialization)). 

In the case of Lexical, I believe that JSON is a better way for the following reasons:

Lexical injects the theme through class attribute into the exported/created HTML elements ([lexical-docs-theming](https://lexical.dev/docs/getting-started/theming)).
It provides flexibility when data is separated from the theme. This is why I prefer JSON over HTML for saving data - you can change styling policies and make necessary adjustments in the CSS without affecting the data.

Saving HTML in your repository may seem well-separated as well. However, issues arise for the sake of backward compatibility when you want to change the name of a class. Existing data might not be styled correctly. For example, injecting TailwindCSS utility classes directly on theming or changing the strategy from not utilizing theme (such as [TryGhost/Keonig](https://github.com/TryGhost/Koenig/blob/main/packages/koenig-lexical/src/themes/default.js)) to utilizing it (such as [lexical-playground](https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/themes/PlaygroundEditorTheme.ts)) could break the CSS if you save data as HTML.

For these reasons, you might decide to use JSON. Additionally, you might want to SSR for better UX or SEO. Next.js is probably the most popular framework to achieve this in the current frontend environment. 

The thing was that previously @lexical/headless and Next.js were not compatible with each other starting from Lexical@0.6.0. However, with the very recent release(v0.13.1), they have become compatible with SSR on Next.js again ([Release Note](https://github.com/facebook/lexical/releases/tag/v0.13.1))!


## Getting Started
First, install the packages:
```bash
npm install
```

Then, run the development server:
```
npm run dev
```

Open http://localhost:3000 with your browser.

