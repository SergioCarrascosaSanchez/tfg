describe("Complete app", () => {
  before(() => {
    cy.wait(60000);
  });

  describe("Trade Coins", () => {
    it("Buy coin", () => {
      
      cy.visit("/");
      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("Admin");
      cy.get('[name="password"]').type("'testpass'");
      cy.get('[data-testid="submitLoginButton"]').click();

      cy.contains("Panel de control de usuarios");
      cy.contains("Dar de alta un estudiante").click()
      cy.contains("Nuevo estudiante")
      cy.get('[placeholder="Nombre de usuario"]').type("UserTest");
      cy.get('[placeholder="Email"]').type("UserTest@gmail.com");
      cy.get('[placeholder="Balance inicial"]').type("1000")
      cy.get('[placeholder="Contraseña"]').type("elrijjkfh");
      cy.contains("Crear estudiante").click()
      cy.contains("Operación completada con éxito")
      cy.get('[data-testid="CloseIcon"]').click();

      cy.get("[data-testid='Cerrar sesiónNavbar']").click();
      
      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("UserTest");
      cy.get('[name="password"]').type("elrijjkfh");
      cy.get('[data-testid="submitLoginButton"]').click();

      cy.contains("UserTest");
      cy.contains("Cartera de inversion:");
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

      cy.visit("/users/UserTest");
      cy.contains("UserTest");
      cy.contains("Cartera de inversion:");
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
      cy.get('a:contains("ADA")').should('have.length', 1);
      cy.get('p:contains("ADA")').should('have.length', 1);
      cy.get('p:contains("Cantidad: 2")').should('have.length', 2);
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

      cy.visit("/users/UserTest");
      cy.contains("UserTest");
      cy.get('a:contains("ADA")').should('have.length', 1);
      cy.get('p:contains("ADA")').should('have.length', 2);
      cy.get('p:contains("Cantidad: 1")').should('have.length', 2);
      cy.contains("Balance:")
        .invoke("text")
        .then((text) => {
          const balance = text.slice(8, -1);
          cy.wrap(Number(balance)).as("newBalanceAfterFirstSell");
        });
      cy.get("@newBalance").then((balance) => {
        cy.get("@priceFirstSell").then((price) => {
          const expectedNewBalance = balance + price;
          cy.get("@newBalanceAfterFirstSell").should(
            "be.closeTo",
            expectedNewBalance,
            0.01
          );
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

      cy.visit("/users/UserTest");
      cy.contains("UserTest");
      cy.get('a:contains("ADA")').should('have.length', 0);
      cy.get('p:contains("ADA")').should('have.length', 3);
      cy.contains("Balance:")
        .invoke("text")
        .then((text) => {
          const balance = text.slice(8, -1);
          cy.wrap(Number(balance)).as("newBalanceAfterSecondSell");
        });
      cy.get("@newBalanceAfterFirstSell").then((balance) => {
        cy.get("@priceSecondSell").then((price) => {
          const expectedNewBalance = balance + price;
          cy.get("@newBalanceAfterSecondSell").should(
            "be.closeTo",
            expectedNewBalance,
            0.01
          );
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

  describe("Teacher and student trades", () => {
    it("show show student trades", () => {
      cy.visit("/");
      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("Admin");
      cy.get('[name="password"]').type("'testpass'");
      cy.get('[data-testid="submitLoginButton"]').click();

      cy.contains("Panel de control de usuarios");

      cy.contains("Dar de alta un estudiante").click()
      cy.contains("Nuevo estudiante")
      cy.get('[placeholder="Nombre de usuario"]').type("StudentForE2E");
      cy.get('[placeholder="Email"]').type("StudentForE2E@UserTest.com");
      cy.get('[placeholder="Balance inicial"]').type("1000")
      cy.get('[placeholder="Contraseña"]').type("elrijjkfh");
      cy.contains("Crear estudiante").click()
      cy.contains("Operación completada con éxito")
      cy.get('[data-testid="CloseIcon"]').click();

      cy.contains("Dar de alta un profesor").click()
      cy.contains("Nuevo profesor")
      cy.get('[placeholder="Nombre de usuario"]').type("TeacherForE2E");
      cy.get('[placeholder="Email"]').type("TeacherForE2E@UserTest.com");
      cy.get('[placeholder="Contraseña"]').type("elrijjkfh2");
      cy.contains("Crear profesor").click()
      cy.contains("Operación completada con éxito")
      cy.get('[data-testid="CloseIcon"]').click();

      cy.contains("Agregar estudiantes a un profesor").click()
      cy.contains("Añadir alumnos a un profesor")
      cy.get('[placeholder="Nombre del profesor"]').type("TeacherForE2E");
      cy.get('[data-testid="student2RemoveButton"]').click();
      cy.get('[data-testid="student3RemoveButton"]').click();
      cy.get('[data-testid="student4RemoveButton"]').click();
      cy.get('[data-testid="student5RemoveButton"]').click();
      cy.get('[placeholder="Nombre del alumno 1"]').type("StudentForE2E");
      cy.get('[data-testid="submitAddStudentsButton"]').click();
      cy.contains("Operacion correcta")
      cy.get('[data-testid="CloseIcon"]').click();

      cy.get("[data-testid='Cerrar sesiónNavbar']").click();

      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("StudentForE2E");
      cy.get('[name="password"]').type("elrijjkfh");
      cy.get('[data-testid="submitLoginButton"]').click();
      cy.contains("StudentForE2E");
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

      cy.visit("/market");
      cy.contains("ADA").click();
      cy.contains("ADA");
      cy.get('[data-testid="ADAPrice"]')
        .invoke("text")
        .then((text) => {
          const price = text.slice(0, -2);
          cy.wrap(Number(price)).as("price2");
        });
      cy.contains("Transacción");
      cy.get('[placeholder="Cantidad"]').type("1");
      cy.get('[placeholder="Justificacion"]').type("texto de prueba");
      cy.contains("Vender").click();
      cy.contains("Transacción realizada con éxito!");

      cy.contains("Cerrar sesión").click();
      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("TeacherForE2E");
      cy.get('[name="password"]').type("elrijjkfh2");
      cy.get('[data-testid="submitLoginButton"]').click();

      cy.contains("TeacherForE2E")
      cy.contains("Transacciones: 2");
      cy.contains("StudentForE2E").click();
      cy.contains("Transacciones de StudentForE2E");

      cy.get('[data-testid="StudentForE2ETradeChart0"]');
      cy.get('[data-testid="StudentForE2ETrade0CoinADA"]');
      cy.contains("Compra");
      cy.contains("Cantidad: 2");
      cy.get('[data-testid="StudentForE2ETradeChart1"]');
      cy.get('[data-testid="StudentForE2ETrade1CoinADA"]');
      cy.contains("Venta");
      cy.contains("Cantidad: 1");
      cy.get("@price").then((priceBuy) => {
        cy.contains(`Precio: ${priceBuy}`);
      });
      cy.get("@price2").then((priceSell) => {
        cy.contains(`Precio: ${priceSell}`);
      });
      cy.contains("Comentarios del profesor:")
      cy.get('textarea').eq(0).type('Comentario')
      cy.contains("Enviar comentario").eq(0).click()
      cy.contains("Comentario")
    });
  });
  describe("navbar redirect", () => {
    it("Should redirect to market when clicking Mercados option", () => {
      cy.visit("/users/User");
      cy.get("[data-testid='MercadosNavbar']").click();
      cy.location().should((location) => {
        expect(location.pathname).to.equal('/market');
      });
    });

    it("Should redirect to mainPage when clicking Cerrar sesión option", () => {
      cy.visit("/market");
      cy.get("[data-testid='Cerrar sesiónNavbar']").click();
      cy.location().should((location) => {
        expect(location.pathname).to.equal('/');
      });
    });

    it("Should redirect to mainPage when clicking Mi perfil option", () => {
      cy.visit("/");
      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("Admin");
      cy.get('[name="password"]').type("'testpass'");
      cy.get('[data-testid="submitLoginButton"]').click();

      cy.contains("Panel de control de usuarios");
      cy.contains("Dar de alta un estudiante").click()
      cy.contains("Nuevo estudiante")
      cy.get('[placeholder="Nombre de usuario"]').type("StudentForE2ENavbar");
      cy.get('[placeholder="Email"]').type("StudentForE2ENavbar@gmail.com");
      cy.get('[placeholder="Balance inicial"]').type("1000")
      cy.get('[placeholder="Contraseña"]').type("elrijjkfh");
      cy.contains("Crear estudiante").click()
      cy.contains("Operación completada con éxito")
      cy.get('[data-testid="CloseIcon"]').click();

      cy.get("[data-testid='Cerrar sesiónNavbar']").click();
      
      cy.contains("Iniciar sesión").click();
      cy.get('[name="username"]').type("StudentForE2ENavbar");
      cy.get('[name="password"]').type("elrijjkfh");
      cy.get('[data-testid="submitLoginButton"]').click();
      cy.contains("StudentForE2ENavbar");

      cy.visit("/market");
      cy.get("[data-testid='Mi perfilNavbar']").click();
      cy.location().should((location) => {
        expect(location.pathname).to.equal('/users/StudentForE2ENavbar');
      });
    });
  });
  describe("NotFoundPage", () => {
    it("Should load error message", () => {
      cy.visit("/ajkh");
      cy.contains("Esta página no existe")
    });
    it("Should load error message", () => {
      cy.visit("/adkadjhk/akjhdakjhsd");
      cy.contains("Esta página no existe")
    });
    it("Should load error message", () => {
      cy.visit("/cin/BTC");
      cy.contains("Esta página no existe")
    });
    it("Should load error message", () => {
      cy.visit("/usnn/Sergio");
      cy.contains("Esta página no existe")
    });
    it("Should load error message", () => {
      cy.visit("/murket");
      cy.contains("Esta página no existe")
    });
  });
});
