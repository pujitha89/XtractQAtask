describe('form to fill', () => {
  it('fill the field data', () => {
      cy.fixture('field-configuration.json').then((configData) => {
          cy.fixture('fixture-data.json').then((fixtureData) => {
              cy.visit('https://xtract360-qa-challenge.s3.eu-west-1.amazonaws.com/index.html');
              configData.forEach((screen) => {
                  screen.fields.forEach((field) => {
                      //adding data into first page
                      if (screen.title === 'Vehicle details') {
                          switch (field.label) {
                              case 'Driver Name':
                                  cy.fillAndVerifyData(field.testId, fixtureData.driver.name);
                                  break;
                              case 'Vehicle Regplate':
                                  cy.get(`[data-testid="${field.testId}"]`).clear().type(fixtureData.vehicle.regplate);
                                  cy.get(`[data-testid="${field.testId}"] input`).should('have.value', fixtureData.vehicle.regplate);
                                  break;
                              case 'Vehicle Type':
                                  cy.dropdownOptions(field.testId, fixtureData.vehicle.type);
                                  break;
                              case 'Driver Age':
                                  cy.fillAndVerifyData(field.testId, fixtureData.driver.age);
                                  break;
                              case 'Driver Field B':
                                  cy.fillAndVerifyData(field.testId, fixtureData.driver.fieldB);
                                  break;
                              case 'Vehicle Trade Value':
                                  cy.get(`[data-testid="${field.testId}"]`).clear().type(fixtureData.vehicle.tradeValue.value);
                                  cy.get(`[data-testid="${field.testId}"] input`).should('have.value', fixtureData.vehicle.tradeValue.value);
                                  cy.get(`[data-testid="${field.testId}"]`).contains('EUR').click();
                                  cy.get('ul[role="listbox"]').contains(fixtureData.vehicle.tradeValue.currency).click();
                                  break;
                          }
                      }
                  })
              })
              //adding data into second web page
              cy.get('[type="button"]').should('have.text', 'Next').click();
              configData.forEach((screen) => {
                  screen.fields.forEach((field) => {
                      if (screen.title === 'Third Party Details') {
                          switch (field.label) {
                              case 'Number of third parties':
                                  cy.dropdownOptions(field.testId, fixtureData.thirdParties.count);
                                  break;
                              case 'Third Party Name':
                                  cy.fillAndVerifyData(field.testId, fixtureData.thirdParties[1].name);
                                  break;
                              case 'Third Party Vehicle Regplate':
                                  cy.fillAndVerifyData(field.testId, fixtureData.thirdParties[1].regplate);
                                  break;
                              case 'Third Party Vehicle Type':
                                  cy.dropdownOptions(field.testId, fixtureData.thirdParties[1].type);
                                  break;
                              case 'Second Third Party Name':
                                  cy.fillAndVerifyData(field.testId, fixtureData.thirdParties[2].name);
                                  break;
                              case 'Second Third Party Vehicle Regplate':
                                  cy.fillAndVerifyData(field.testId, fixtureData.thirdParties[2].regplate);
                                  break;

                          }
                      }
                  })
              })
              // click on Done button
              cy.get('[type="button"]').should('have.text', 'Done').click();
              //verify the data in confirmation page
              cy.verifyConfirmationPage('driver.name', fixtureData.driver.name)
              cy.verifyConfirmationPage('vehicle.regplate', fixtureData.vehicle.regplate)
              cy.verifyConfirmationPage('vehicle.type', fixtureData.vehicle.type);
              cy.verifyConfirmationPage('driver.age', fixtureData.driver.age);
              cy.verifyConfirmationPage('driver.fieldB', fixtureData.driver.fieldB);
              cy.verifyConfirmationPage('vehicle.tradeValue', fixtureData.vehicle.tradeValue.value);
              cy.verifyConfirmationPage('thirdParties.count', fixtureData.thirdParties.count);
              cy.verifyConfirmationPage('thirdParties.1.name', fixtureData.thirdParties[1].name);
              cy.verifyConfirmationPage('thirdParties.1.regplate', fixtureData.thirdParties[1].regplate);
              cy.verifyConfirmationPage('thirdParties.1.type', fixtureData.thirdParties[1].type);
              cy.verifyConfirmationPage('thirdParties.2.name', fixtureData.thirdParties[2].name);
              cy.verifyConfirmationPage('thirdParties.2.regplate', fixtureData.thirdParties[2].regplate);

          })
      })
  })
})