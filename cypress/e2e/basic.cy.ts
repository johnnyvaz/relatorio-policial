describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it("should allow you to register and login", () => {
    const loginForm = {
      email: 'test@example.com',
      password: 'test1234!',
    };
    cy.findByRole("link", { name: /Cadastrar/i }).click();
    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/senha/i).type(loginForm.password);
    cy.findByRole("button", { name: /Criar conta/i }).click();
  })
}) 