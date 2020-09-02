---
slug: "/sw/blog/mtindo-wangu-wa-material-ui-na-gatsby"
langKey: "sw"
date: "2020-08-29"
title: "Mtindo wangu wa Material UI (MUI) pamoja na Gatsby"
excerpt: "Siku 26 baada ya kutengeneza blogu hii 😅, hivi ndio jinsi nilivyo tumia dakika chache ndani ya siku ku weka sawa mandahari au muonekano wa blogu yango baada ya kugundua kuwa kurasa zina onekana bila mtindo (yani css) kwa kama sekunde moja baada ya kupakua ukurasa; yani Flash/Flicker of Unstyled Contenct (FOUC). Mimi binafsi huktumia Material UI sana. Nafamu kuna njia tofauti za ku tegeneza mitindo kama tailwind, style-components, style-jsx etc."
---

Kwasababu nilisha pakua na kusanidi [@material-ui/core](https://material-ui.com/) ([tasfiri](https://translate.google.com/translate?hl=en&sl=en&tl=sw&u=https%3A%2F%2Fmaterial-ui.com%2F)), ilibidi na pakue na kusanidi [gatsby-plugin-material-ui](https://www.gatsbyjs.com/plugins/gatsby-plugin-material-ui/) kama ilivyo elekezwa na kuwekwa kwenye faili **site/gatsby-config.js** **(tovuti/gatsby-config.js)**. Baada ya kukamilisha hayo tu utaona mtindo wa Material UI na huduma ya mtido huu (yani theme provider) ita ambatanishwa na kijenzi kikuu (yani root component) kutatua [Flash/Flicker of Unstyled Content (FOUC)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) ([tasfiri](https://translate.google.com/translate?hl=en&sl=en&tl=sw&u=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFlash_of_unstyled_content&sandbox=1)).

> **NOTE:** Itabidi uianzishe tena tovuti yako kwa kutumia amri **gatsby develop** pale utakapo fanya mabadiliko kwenye faili za usanidi (yani config files).

Baada ya hapo, nikasogeza **ThemeProvider** (yaani HudumaYaMtido) kutoka kwenya faili **site/src/components/layout.js** kwenda kwenye folda la [programu-jalizi za gatsby](https://www.gatsbyjs.com/docs/creating-a-local-plugin/) **site/plugins/my-mui-theme** kuhakikisha kurasa zote zina ssr kwakutumuia API za Gatsby [gatsby-browser.js](https://www.gatsbyjs.com/docs/browser-apis/#wrapRootElement) na [gatsby-ssr.js](https://www.gatsbyjs.com/docs/ssr-apis/#wrapRootElement) [(kwa ufahamu zaidi 😉)](https://material-ui.com/styles/advanced/#server-side-rendering) ([tasfiri](https://translate.google.com/translate?hl=en&sl=en&tl=sw&u=https%3A%2F%2Fmaterial-ui.com%2Fstyles%2Fadvanced%2F%23server-side-rendering)).

## Muudo was code, folda na faili nikama ifuatavyo:

### site/plugins/my-mui-theme/theme.js (tovuti/programu-jalizi/mtido-wangu/mtindo.js)

Unaweza ukauona mtido wangu [hapa.](https://github.com/karimkawambwa/karimkawambwa/blob/master/site/plugins/my-mui-theme/theme.js)

```js
import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({ ... })
```

### site/plugins/my-mui-theme/theme.js (tovuti/programu-jalizi/mtido-wangu/mtindo.js)

```jsx
// fichua React kutoka "react"
import React from "react";
// fichua { HudumaYaMtindo } kutoka "@material-ui/core"
import { ThemeProvider } from "@material-ui/core";

// fichua Mtido kutoka "./mtido"
import Theme from "./theme";

// fichua const ambatanishaKipengeleKikuu
export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={Theme}>{element}</ThemeProvider>;
};
```

### site/plugins/my-mui-theme/gatsby-browser.js (tovuti/programu-jalizi/mtido-wangu/gatsby-browser.js)

```js
// fichua { ambatanishaKipengeleKikuu } kutoka "./ambatanishaKipengeleKikuu"
// yaani kutoka kwenye faili 
export { wrapRootElement } from "./wrapRootElement";
```

### site/plugins/my-mui-theme/gatsby-ssr.js (tovuti/programu-jalizi/mtido-wangu/gatsby-ssr.js)

```js
// fichua { ambatanishaKipengeleKikuu } kutoka "./ambatanishaKipengeleKikuu"
// yaani kutoka kwenye faili 
export { wrapRootElement } from "./wrapRootElement";
```
