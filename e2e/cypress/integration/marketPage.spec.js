describe("Market Page", () => {
  beforeEach(() => {
    cy.visit("/market");
  })

  it("Page loads title", () => {
    cy.get("h1").should('contain', 'Mercados');
  });

  it("Should redirect to CoinPage when clicking on a card", () => {
    cy.get("[data-testid='BTCCoinChartCard']").click();
    cy.url().should("include", "/coins/BTC");
  });

  it("Should redirect to CoinPage when seaching", () => {
    cy.get("[placeholder='Buscar criptomoneda']").type("BTC")
    cy.contains("Buscar").click()
    cy.url().should("include", "/coins/BTC");
  });

  it("Should redirect to CoinPage BTC when seaching BTCBUSD", () => {
    cy.get("[placeholder='Buscar criptomoneda']").type("BTCBUSD")
    cy.contains("Buscar").click()
    cy.url().should("include", "/coins/BTC");
  });
});
