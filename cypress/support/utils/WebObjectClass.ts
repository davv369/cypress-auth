abstract class WebObjectClass {
  abstract exist(): void;
  protected abstract getElement(
    selector: string
  ): Cypress.Chainable<JQuery<HTMLElement>>;
  protected abstract getElementLike(
    selector: string
  ): Cypress.Chainable<JQuery<HTMLElement>>;
  protected abstract getElementWithPath(
    selector: string,
    path: string
  ): Cypress.Chainable<JQuery<HTMLElement>>;
  protected abstract shouldBeVisible(selector: string): void;
  protected abstract shouldExist(selector: string): void;
}

export default WebObjectClass;
