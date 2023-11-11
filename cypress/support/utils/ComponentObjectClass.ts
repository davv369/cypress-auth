import WebObjectClass from './WebObjectClass';
import {getErrorMessageSelector, getTranslation} from "../commands";

abstract class ComponentObjectClass extends WebObjectClass {
  protected componentName: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getElement(selector: string, ...args: any[]) {
    return cy.getBySelector(`${this.componentName}_${selector}`, ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getElementLike(selector: string, ...args: any[]) {
    return cy.getBySelectorLike(`${this.componentName}_${selector}`, ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getElementWithPath(selector: string, path: string, ...args: any[]) {
    return cy.getBySelectorWithPath(
      `${this.componentName}_${selector}`,
      path,
      ...args
    );
  }

  protected assertErrorMessageVisibility(selector: string, translationCode: string) {
    this.shouldBeVisible(getErrorMessageSelector(selector))
    this.checkVisibility(getTranslation(translationCode))
    this.getElement(getErrorMessageSelector(selector)).within(() => {
      this.checkVisibility(getTranslation(translationCode))
    });
  }

  protected checkVisibility(errorMessage: string, timeoutOptions: object = {}) {
    cy.contains(errorMessage).should('be.visible');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected shouldBeVisible(selector: string, ...args: any[]) {
    this.getElement(selector, ...args)
      .should('exist')
      .should('be.visible');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected shouldExist(selector: string, ...args: any[]) {
    this.getElement(selector, ...args).should('exist');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected shouldAllBeVisible(selectors: string[], ...args: any[]) {
    selectors.forEach((selector: string) => {
      this.shouldBeVisible(selector, ...args);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected shouldAllExist(selectors: string[], ...args: any[]) {
    selectors.forEach((selector: string) => {
      this.shouldExist(selector, ...args);
    });
  }
}

export default ComponentObjectClass;
