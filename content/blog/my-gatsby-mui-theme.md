---
slug: "/blog/my-gatsby-material-ui-theme"
date: "2020-08-29"
title: "My Custom Material UI (MUI) on Gatsby"
excerpt: "26 days later 😅 this is how I spent a few minutes of my day configuring MUI after I noticed my blog had Flash/Flicker of Unstyled Contenct (FOUC). I personally use material ui alot. I know there are many other styling methods using tailwind, style-components, style-jsx etc."
---

Since I had [@material-ui/core](https://material-ui.com/) already install, I just had to intall [gatsby-plugin-material-ui](https://www.gatsbyjs.com/plugins/gatsby-plugin-material-ui/), add the config mentioned into my **site/gatsby-config.js** and right off the bat you get the default theme and the theme provider will be wrapped on the root compoent resolving the [Flash/Flicker of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content). 

> **NOTE:** You will have to rerun your site with the command **gatsby develop** whenever you make config changes.

I then moved the **ThemeProvider** from my **site/src/components/layout.js** to my [local gatsby plugin](https://www.gatsbyjs.com/docs/creating-a-local-plugin/) folder **site/plugins/my-mui-theme** to ensure its added to the root component all my pages especially supporting ssr. The configuration was relatively straight forward using gatsby's apis where I added the files [gatsby-browser.js](https://www.gatsbyjs.com/docs/browser-apis/#wrapRootElement) for client/browser support  and [gatsby-ssr.js](https://www.gatsbyjs.com/docs/ssr-apis/#wrapRootElement) for ssr support which will ensure the styles are pre injected [(here is a little advanced knowledge for you 😉)](https://material-ui.com/styles/advanced/#server-side-rendering).

## Here is the code and file structure:

### site/plugins/my-mui-theme/theme.js

You cna fund my theme configuration in my repo [here](https://github.com/karimkawambwa/karimkawambwa/blob/master/site/plugins/my-mui-theme/theme.js).

```js
import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({ ... })
```

###site/plugins/my-mui-theme/theme.js
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
