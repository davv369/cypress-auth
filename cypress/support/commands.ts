import 'cypress-wait-until';
import translations from "./data/translations.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBySelector = (selector: string, ...args: any[]) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
};

export const clickOnElement = (selector: string) => {
  return cy.get(selector).click();
};

export const getTranslation = (translationCode: string) => {
  // @ts-ignore
  return translations[translationCode]
}

export const getErrorMessageSelector = (selector: string) => {
  return `${selector}_ErrorMessage`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBySelectorLike = (selector: string, ...args: any[]) => {
  return cy.get(`[data-cy*=${selector}]`, ...args);
};

export const getBySelectorWithPath = (
  selector: string,
  _path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => {
  return cy.get(`[data-cy*=${selector}] ${_path}`, ...args);
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Shortcut for cy.get(`[data-cy=${selector}]`, ...args)
       */
      getBySelector: typeof getBySelector;

      /**
       * Shortcut for cy.get(`[data-cy*=${selector}]`, ...args)
       */
      getBySelectorLike: typeof getBySelectorLike;

      /**
       * Shortcut for cy.get(`[data-cy*=${selector}] {_path}`, ...args)
       */
      getBySelectorWithPath: typeof getBySelectorWithPath;
    }
  }
}

Cypress.Commands.add('getBySelector', getBySelector);
Cypress.Commands.add('getBySelectorLike', getBySelectorLike);
Cypress.Commands.add('getBySelectorWithPath', getBySelectorWithPath);

