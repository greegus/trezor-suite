const GalaxyNexusChromeUA =  'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19';

// todo: stubbing user agents, needs to be done in cypress.run options. I am working on this in another PR
describe.skip('Browser ', () => {
    beforeEach(() => {
        cy.viewport(1024, 768).resetDb();
        cy.task('stopEmu');
    });

    it('Outdated browser', () => {});
    
    it('No webusb support mobile browser', () => {});

    it('On mobile chrome, install bridge and udev rules shall NOT appear', () => {
        cy.prefixedVisit('/');
        cy.passThroughInitialRun();
    })
})