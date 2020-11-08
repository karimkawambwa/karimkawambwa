---
slug: "/blog/injecting-a-react-app-into-angular"
langKey: "en"
date: "2020-10-15"
title: "Injecting a React Application into an Angular Application"
excerpt: "So here is the requirement, we need to customise a SaaS platform beyond its offered customizations. The SaaS product is written in angular and they have not offered any ability to load an application or add custom views beyond the customization they offer. So I decided to inject the views since they offered customizing the index.html file where I can load my react bundle 😊."
---

Before we proceed, this is not the best solution going forward. I would have prefered to build a separate application with the features required or maybe build my own SaaS platform and other such level of customization. This solution requires constant communication with the third party solution to ensure things won't break when they make any updates 🤞 amognst other concerns.

Jumping right into this, I go the idea from platforms like [Zenhub](https://www.zenhub.com/). This platform is a great management tool and it can live right on your github profile. I remember being at [AxiomZen](https://www.axiomzen.co/) and beign around the team that developed it, the conversation around injecting the required views and how you need to work with Github to be able to keep up with changes so as not to break Zenhub features. Anyways, that was were my thought started from and I decided injection will be "a" way forward "for now".

I didn't want to inject the views randomly, I wanted the ability to eject one day and with as minimal as possible cleanup of code to become a standlaone application. So each component need to have **0** logic to inject its components but also react (what a pun) to dom mutaions by the angular application including route changes. How do I connect angular router to the react router 😱 ?

Here is my solution, use `ReactDOM.createPortal(...)` but create a library with a react component `<Portal {...}> ... </Portal>` and a Higher Order Component (HOC) `port(...)`. All the logic in a single lib file so ejectig would mean removing `<Portal {...}> ... </Portal>`  and `port(...)`.

The library registers a single [mutation observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) by adding the `PortalProvider` to the begining of the app.

```jsx
export const PortalContext = createContext({});

export default function PortalProvider({ children }) {
  const [components, setComponents] = useState([]);

  const addComponent = useCallback(
    ({ xpath, selector, insertion, onMount, onUnmount }) => {
      setComponents((prev) => [
        {
          xpath,
          selector,
          insertion,
          onUnmount,
          onMount
        },
        ...prev
      ]);
    },
    []
  );

  const removeComponent = useCallback((selector) => {
    setComponents((prev) =>
      prev.filter((c) => (c.xpath || c.selector) !== selector)
    );
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
      // Logic goes here
      });
    });

    observer.observe(document.body, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, [components]);

  return (
    <PortalContext.Provider
      value={{ components, addComponent, removeComponent }}
    >
      {children}
    </PortalContext.Provider>
  );
}
```

Here is the entire portal code to inject components based on DOM mutations:

```jsx
import React, {
  useEffect,
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo
} from "react";

import ReactDOM from "react-dom";

import PropTypes from "prop-types";

const excludeNodeNames = ["pattern", "#text", "INPUT", "input"];
const excludedClasses = ["ng-animating", "mat-progress-bar", "ng-untouched"];

function hashSelector(str) {
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-restricted-properties
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    // eslint-disable-next-line no-bitwise
    hash &= hash; // Convert to 32bit integer
  }
  return `injected-${hash}`;
}

export const PortalContext = createContext({});

export default function PortalProvider({ children }) {
  const [components, setComponents] = useState([]);

  const addComponent = useCallback(
    ({ xpath, selector, insertion, onMount, onUnmount }) => {
      setComponents((prev) => [
        {
          xpath,
          selector,
          insertion,
          onUnmount,
          onMount
        },
        ...prev
      ]);
    },
    []
  );

  const removeComponent = useCallback((selector) => {
    setComponents((prev) =>
      prev.filter((c) => (c.xpath || c.selector) !== selector)
    );
  }, []);

  useEffect(() => {
    function mergeElement(el) {
      if (typeof el.matches !== "function") {
        return;
      }

      const component = components
        .filter(({ mounted }) => !mounted)
        .find(({ selector, xpath }) =>
          xpath
            ? document
                .evaluate(
                  `.${xpath}`,
                  el.parentElement || el,
                  null,
                  XPathResult.ANY_TYPE,
                  null
                )
                .iterateNext()
            : el.matches(selector)
        );

      if (component) {
        const element = component.xpath
          ? document
              .evaluate(
                component.xpath,
                el.parentElement || el,
                null,
                XPathResult.ANY_TYPE,
                null
              )
              .iterateNext()
          : el;
        const { xpath, selector, insertion, onMount } = component;
        const newEl = onMount(element);
        if (newEl && newEl !== element) {
          component.mounted = true;
          newEl.setAttribute("id", hashSelector(xpath || selector));
          newEl.setAttribute("data-injected", "true");
          if (insertion === "replace" && element.parentNode) {
            element.parentNode.replaceChild(newEl, element);
          }
          if (insertion === "replace:hide" && element.parentNode) {
            element.style = "display: none";
            element.parentNode.appendChild(newEl);
          }
          if (insertion === "replace:content" && element.children) {
            Array.from(element.children).forEach((child) => child.remove());
            element.appendChild(newEl, el);
          }
          if (insertion === "append") {
            element.appendChild(newEl);
          }
          if (insertion === "append:before" && element.parentNode) {
            element.parentNode.insertBefore(newEl, element);
          }
          if (insertion === "append:after" && element.parentNode) {
            element.parentNode.insertBefore(newEl, element.nextSibling);
          }
        }
      }
    }

    function injectElement(el) {
      if (!el || !el.matches) {
        return;
      }
      mergeElement(el);

      el.childNodes.forEach((_, i) => {
        injectElement(el.children.item(i));
      });
    }

    injectElement(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if ($) {
          if (
            $(mutation.target)[0].getAttribute &&
            !$(mutation.target)[0].getAttribute("data-injected") &&
            !excludeNodeNames.includes(mutation.target.nodeName) &&
            !excludedClasses.some(
              (c) =>
                mutation.target.classList &&
                mutation.target.classList.contains(c)
            )
          ) {
            if (mutation.type === "attributes") {
              injectElement($(mutation.target)[0]);
            }
            mutation.addedNodes.forEach((node) => {
              injectElement($(node)[0]);
            });
            mutation.removedNodes.forEach((node) => {
              const el = $(node)[0];
              if (typeof el.matches !== "function") {
                return;
              }
              components.forEach((component) => {
                const { selector, xpath, onUnmount } = component;
                if (el.querySelector(`#${hashSelector(xpath || selector)}`)) {
                  // eslint-disable-next-line no-param-reassign
                  component.mounted = false;
                  onUnmount();
                }
              });
            });
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, [components]);

  return (
    <PortalContext.Provider
      value={{ components, addComponent, removeComponent }}
    >
      {children}
    </PortalContext.Provider>
  );
}

PortalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();

  return div.firstChild;
}

export function Portal({
  portalElement,
  insertion,
  xpath,
  selector,
  children,
  observe
}) {
  const [render, setRender] = useState(false);
  const root = useMemo(() => createElementFromHTML(portalElement), [
    portalElement
  ]);
  const { addComponent, removeComponent } = useContext(PortalContext);

  useEffect(() => {
    addComponent({
      xpath,
      selector,
      insertion,
      onMount: () => {
        setRender(true);
        return root;
      },
      onUnmount: () => {
        setRender(false);
      }
    });

    return () => {
      root.remove();
      removeComponent(xpath || selector);
    };
  }, [
    root,
    selector,
    insertion,
    observe,
    addComponent,
    removeComponent,
    xpath
  ]);

  return render && ReactDOM.createPortal(children, root);
}

Portal.propTypes = {
  portalElement: PropTypes.string,
  insertion: PropTypes.string
};

Portal.defaultProps = {
  portalElement: "<div />",
  insertion: "append"
};

export function port(C, insertion, selector, portalElement) {
  return ({ ...props }) => (
    <Portal
      portalElement={portalElement}
      insertion={insertion}
      selector={!selector.startsWith("//") && selector}
      xpath={selector.startsWith("//") && selector}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <C {...props} />
    </Portal>
  );
}
```