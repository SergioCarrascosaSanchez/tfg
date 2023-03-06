describe("Complete app", () => {
  before(() => {
    cy.wait(60000);
  });

  describe("BuyCoin", () => {
    it("Buy coin", () => {
      cy.request({
        method: 'POST',
        url: 'http://users-api:8081/signup',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          "username":"UserTest",
          "email":"UserTest@UserTest.com",
          "password":"elrijjkfh",
          "initialBalance":1000,
          "roles": ["STUDENT"]
      },
      })
        .its('status')
        .should('equal', 200)

      cy.visit("/");
      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("UserTest");
      cy.get('[name="password"]').type("elrijjkfh");
      cy.get('[data-testid="submitLoginButton"]').click();

      cy.contains("UserTest");
      cy.contains("Portfolio de inversion:");
      cy.contains("Balance:")
        .invoke("text")
        .then((text) => {
          const balance = text.slice(8, -1);
          cy.wrap(Number(balance)).as("balance");
        });

      cy.visit("/market");
      cy.contains("ADA").click();
      cy.contains("ADA");
      cy.get('[data-testid="ADAPrice"]')
        .invoke("text")
        .then((text) => {
          const price = text.slice(0, -2);
          cy.wrap(Number(price)).as("price");
        });
      cy.contains("Transacción");
      cy.get('[placeholder="Cantidad"]').type("2");
      cy.get('[placeholder="Justificacion"]').type("texto de prueba");
      cy.contains("Comprar").click();
      cy.contains("Transacción realizada con éxito!");

      cy.visit("/students/UserTest");
      cy.contains("UserTest");
      cy.contains("Portfolio de inversion:");
      cy.contains("Balance:")
        .invoke("text")
        .then((text) => {
          const balance2 = text.slice(8, -1);
          cy.wrap(Number(balance2)).as("newBalance");
        });

      cy.get("@balance").then((balance) => {
        cy.get("@price").then((price) => {
          const expectedNewBalance = balance - price * 2;
          cy.get("@newBalance").should("be.closeTo", expectedNewBalance, 0.01);
        });
      });
      cy.contains("ADA");

      cy.visit("/market");
      cy.contains("ADA").click();
      cy.contains("ADA");
      cy.get('[data-testid="ADAPrice"]')
        .invoke("text")
        .then((text) => {
          const price = text.slice(0, -2);
          cy.wrap(Number(price)).as("priceFirstSell");
        });
      cy.contains("Transacción");
      cy.get('[placeholder="Cantidad"]').type("1");
      cy.get('[placeholder="Justificacion"]').type("texto de prueba");
      cy.contains("Vender").click();
      cy.contains("Transacción realizada con éxito!");

      cy.visit("/students/UserTest");
      cy.contains("UserTest");
      cy.contains("ADA");
      cy.contains("Balance:")
        .invoke("text")
        .then((text) => {
          const balance = text.slice(8, -1);
          cy.wrap(Number(balance)).as("newBalanceAfterFirstSell");
        });
      cy.get("@newBalance").then((balance) => {
        cy.get("@priceFirstSell").then((price) => {
          const expectedNewBalance = balance + price;
          cy.get("@newBalanceAfterFirstSell").should("be.closeTo", expectedNewBalance, 0.01);
        });
      });
      cy.visit("/market");
      cy.contains("ADA").click();
      cy.contains("ADA");
      cy.get('[data-testid="ADAPrice"]')
        .invoke("text")
        .then((text) => {
          const price = text.slice(0, -2);
          cy.wrap(Number(price)).as("priceSecondSell");
        });
      cy.contains("Transacción");
      cy.get('[placeholder="Cantidad"]').type("1");
      cy.get('[placeholder="Justificacion"]').type("texto de prueba");
      cy.contains("Vender").click();
      cy.contains("Transacción realizada con éxito!");

      cy.visit("/students/UserTest");
      cy.contains("UserTest");
      cy.contains('ADA').should('not.exist');
      cy.contains("Balance:")
        .invoke("text")
        .then((text) => {
          const balance = text.slice(8, -1);
          cy.wrap(Number(balance)).as("newBalanceAfterSecondSell");
        });
      cy.get("@newBalanceAfterFirstSell").then((balance) => {
        cy.get("@priceSecondSell").then((price) => {
          const expectedNewBalance = balance + price;
          cy.get("@newBalanceAfterSecondSell").should("be.closeTo", expectedNewBalance, 0.01);
        });
      });
    });
  });
  describe("marketSearch", () => {
    beforeEach(() => {
      cy.visit("/market");
    });

    it("Page loads title", () => {
      cy.get("h1").should("contain", "Mercados");
    });

    it("Should redirect to CoinPage when clicking on a card", () => {
      cy.get("[data-testid='BTCCoinChartCard']").click();
      cy.url().should("include", "/coins/BTC");
    });

    it("Should redirect to CoinPage when seaching", () => {
      cy.get("[placeholder='Buscar criptomoneda']").type("BTC");
      cy.contains("Buscar").click();
      cy.url().should("include", "/coins/BTC");
    });

    it("Should redirect to CoinPage BTC when seaching BTCBUSD", () => {
      cy.get("[placeholder='Buscar criptomoneda']").type("BTCBUSD");
      cy.contains("Buscar").click();
      cy.url().should("include", "/coins/BTC");
    });
  });
});
