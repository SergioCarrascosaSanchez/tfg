describe("BuyCoin", () => {
    it("Buy coin", () => {
      cy.visit("/");
      cy.contains("Iniciar sesión").click()
      cy.get('[name="username"]').type('User');
      cy.get('[name="password"]').type("'testpass'");
      cy.get('[data-testid="submitLoginButton"]').click();
  
      cy.contains("User")
      cy.contains("Portfolio de inversion:")
      cy.contains("Balance:").invoke('text').then((text) => {
        const balance = text.slice(8,-1)
        cy.wrap(Number(balance)).as('balance');
      });
  
      cy.visit("/market");
      cy.contains("ADA").click()
      cy.contains("ADA")
      cy.get('[data-testid="ADAPrice"]').invoke('text').then((text) => {
        const price = text.slice(0,-2)
        cy.wrap(Number(price)).as('price');
      })
      cy.contains("Transacción")
      cy.get('[placeholder="Cantidad"]').type('2');
      cy.get('[placeholder="Justificacion"]').type("texto de prueba");
      cy.contains("Comprar").click()
      cy.contains("Transacción realizada con éxito!")
  
      cy.visit("/students/User")
      cy.contains("User")
      cy.contains("Portfolio de inversion:")
      cy.contains("Balance:").invoke('text').then((text) => {
        const balance2 = text.slice(8,-1)
        cy.wrap(Number(balance2)).as('newBalance');
      });
  
      cy.get('@balance').then((balance) => {
        cy.get('@price').then((price) => {
          const expectedNewBalance = balance - price*2;
          cy.get('@newBalance').should('be.closeTo', expectedNewBalance, 0.01);
        });
      });
    });
  });