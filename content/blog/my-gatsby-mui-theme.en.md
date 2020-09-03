---
slug: "/blog/my-gatsby-material-ui-theme"
langKey: "en"
date: "2020-08-29"
title: "My Custom Material UI (MUI) on Gatsby"
excerpt: "26 days after quickly putting together this site, this is how I spent a few minutes of my day configuring Material UI (MUI) after I noticed a Flash/Flicker of Unstyled Contenct (FOUC). I personally use MUI alot but I do know there are many other styling methods like tailwind, style-components, style-jsx etc."
---

Let's jump right to it. Since I had [@material-ui/core](https://material-ui.com/) installed, what was left was to install [gatsby-plugin-material-ui](https://www.gatsbyjs.com/plugins/gatsby-plugin-material-ui/), add the configuration to my site's config file **site/gatsby-config.js** and right off the bat, you get the default theme. The theme provider will be wrapped to the root component consiquently resolving the [Flash/Flicker of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content). 

> **NOTE:** You will have to re-run your site with the command **gatsby develop** whenever you make config changes.

I then moved the **ThemeProvider** from my **site/src/components/layout.js** to my [local gatsby plugin](https://www.gatsbyjs.com/docs/creating-a-local-plugin/) folder **site/plugins/my-mui-theme** to ensure its added to the root component of all my pages to support Server Side Rendering (SSR). The configuration was relatively straight forward using gatsby's APIs where I added the files [gatsby-browser.js](https://www.gatsbyjs.com/docs/browser-apis/#wrapRootElement) for client/browser support and [gatsby-ssr.js](https://www.gatsbyjs.com/docs/ssr-apis/#wrapRootElement) for ssr support [(here is a little advanced knowledge for you)](https://material-ui.com/styles/advanced/#server-side-rendering).

## The code and file structure is presented below:

### site/plugins/my-mui-theme/theme.js

You can find my theme configuration [here.](https://github.com/karimkawambwa/karimkawambwa/blob/master/site/plugins/my-mui-theme/theme.js)

```js
import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({ ... })
```

### site/plugins/my-mui-theme/theme.js
```jsx
import React from "react";
import { ThemeProvider } from "@material-ui/core";

import Theme from "./theme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={Theme}>{element}</ThemeProvider>
}
```

### site/plugins/my-mui-theme/gatsby-browser.js
```js
export { wrapRootElement } from "./wrapRootElement";
```

### site/plugins/my-mui-theme/gatsby-ssr.js
```js
export { wrapRootElement } from "./wrapRootElement";
```
