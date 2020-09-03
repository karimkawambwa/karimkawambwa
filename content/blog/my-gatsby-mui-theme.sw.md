---
slug: "/sw/blog/mtindo-wangu-wa-material-ui-na-gatsby"
langKey: "sw"
date: "2020-08-29"
title: "Mtindo wangu wa Material UI (MUI) pamoja na Gatsby"
excerpt: "Siku 26 baada ya kutengeneza blogu hii 😅, hivi ndio jinsi nilivyo tumia dakika chache ndani ya siku yangu kurekebisha muonekano wa blogu yango baada ya kugundua kuwa kurasa zina onekana bila mtindo, yani css, kwa kama sekunde moja baada ya kupakua kurasa; yani Flash/Flicker of Unstyled Contenct (FOUC). Mimi binafsi hutumia Material UI. Ila nafamu kuna njia tofauti za kuunda mitindo kama tailwind, style-components, style-jsx etc."
---

Kwakua nilipakua na kusanidi [@material-ui/core](https://translate.google.com/translate?hl=en&sl=en&tl=sw&u=https%3A%2F%2Fmaterial-ui.com%2F)), kilichobaki ni kupaku [gatsby-plugin-material-ui](https://www.gatsbyjs.com/plugins/gatsby-plugin-material-ui/), kama ilivyo elekezwa, kisha kuchapishwa kwenye faili **site/gatsby-config.js** **(tovuti/gatsby-config.js)**. Baada ya kukamilisha hayo tu, utaona mtindo wa Material UI na huduma ya mtido huu, yani theme provider, ita ambatanishwa na kijenzi kikuu, yani root component, na kutatua [Flash/Flicker of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

> **NOTE:** Itabidi uianzishe tena tovuti yako kwa kutumia amri hii, **gatsby develop** pale utakapo fanya mabadiliko kwenye faili za usanidi (yani config files).

Baada ya hapo, nikasogeza **HudumaYaMtido**, yani **ThemeProvider**, kutoka kwenya faili **site/src/components/layout.js** kwenda kwenye mkoba wa [programu-jalizi za gatsby](https://www.gatsbyjs.com/docs/creating-a-local-plugin/) **site/plugins/my-mui-theme**. Kufanya hivyo kutahakikisha kurasa zote zina Server Side Rendering (SSR) kwakutumia Application Protocol Interface (API) za Gatsby, [gatsby-browser.js](https://www.gatsbyjs.com/docs/browser-apis/#wrapRootElement) na [gatsby-ssr.js](https://www.gatsbyjs.com/docs/ssr-apis/#wrapRootElement) [(kwa ufahamu zaidi)](https://translate.google.com/translate?hl=en&sl=en&tl=sw&u=https%3A%2F%2Fmaterial-ui.com%2Fstyles%2Fadvanced%2F%23server-side-rendering).

## Muudo wa code, mkoba na faili nikama ifuatavyo:

### tovuti/programu-jalizi/mtido-wangu/mtindo.js (site/plugins/my-mui-theme/theme.js)

Unaweza ukauona mtido wangu [hapa.](https://github.com/karimkawambwa/karimkawambwa/blob/master/site/plugins/my-mui-theme/theme.js)

```js
// pakua createMuiTheme kutoka "@material-ui/core"
import { createMuiTheme } from "@material-ui/core";

// fichua createMuiTheme
export default createMuiTheme({ ... })
```

### tovuti/programu-jalizi/mtido-wangu/mtindo.js (site/plugins/my-mui-theme/theme.js)

```jsx
// pakua React kutoka "react"
import React from "react";
// pakua { HudumaYaMtindo } kutoka "@material-ui/core"
import { ThemeProvider } from "@material-ui/core";

// pakua Mtido kutoka "./mtido"
import Theme from "./theme";

// fichua const ambatanishaKipengeleKikuu
export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={Theme}>{element}</ThemeProvider>;
};
```

### tovuti/programu-jalizi/mtido-wangu/gatsby-browser.js (site/plugins/my-mui-theme/gatsby-browser.js)

```js
// fichua { ambatanishaKipengeleKikuu } kutoka "./ambatanishaKipengeleKikuu"
// yaani kutoka kwenye faili 
export { wrapRootElement } from "./wrapRootElement";
```

### tovuti/programu-jalizi/mtido-wangu/gatsby-ssr.js (site/plugins/my-mui-theme/gatsby-ssr.js)

```js
// fichua { ambatanishaKipengeleKikuu } kutoka "./ambatanishaKipengeleKikuu"
// yaani kutoka kwenye faili 
export { wrapRootElement } from "./wrapRootElement";
```
