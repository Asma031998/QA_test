describe("Navigation", () => {
  it("should navigate to the login page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The new url should include "/about"
    cy.get("h2").first().should("have.text", "Log in");
  });
});
