/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PurchasingPowerComponentsPage, PurchasingPowerDeleteDialog, PurchasingPowerUpdatePage } from './purchasing-power.page-object';

const expect = chai.expect;

describe('PurchasingPower e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let purchasingPowerUpdatePage: PurchasingPowerUpdatePage;
  let purchasingPowerComponentsPage: PurchasingPowerComponentsPage;
  let purchasingPowerDeleteDialog: PurchasingPowerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PurchasingPowers', async () => {
    await navBarPage.goToEntity('purchasing-power');
    purchasingPowerComponentsPage = new PurchasingPowerComponentsPage();
    await browser.wait(ec.visibilityOf(purchasingPowerComponentsPage.title), 5000);
    expect(await purchasingPowerComponentsPage.getTitle()).to.eq(
      'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.home.title'
    );
  });

  it('should load create PurchasingPower page', async () => {
    await purchasingPowerComponentsPage.clickOnCreateButton();
    purchasingPowerUpdatePage = new PurchasingPowerUpdatePage();
    expect(await purchasingPowerUpdatePage.getPageTitle()).to.eq(
      'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.home.createOrEditLabel'
    );
    await purchasingPowerUpdatePage.cancel();
  });

  it('should create and save PurchasingPowers', async () => {
    const nbButtonsBeforeCreate = await purchasingPowerComponentsPage.countDeleteButtons();

    await purchasingPowerComponentsPage.clickOnCreateButton();
    await promise.all([
      purchasingPowerUpdatePage.setYearInput('year'),
      purchasingPowerUpdatePage.setCityInput('city'),
      purchasingPowerUpdatePage.setCategoryInput('category'),
      purchasingPowerUpdatePage.setValueInput('5')
    ]);
    expect(await purchasingPowerUpdatePage.getYearInput()).to.eq('year', 'Expected Year value to be equals to year');
    expect(await purchasingPowerUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await purchasingPowerUpdatePage.getCategoryInput()).to.eq('category', 'Expected Category value to be equals to category');
    expect(await purchasingPowerUpdatePage.getValueInput()).to.eq('5', 'Expected value value to be equals to 5');
    await purchasingPowerUpdatePage.save();
    expect(await purchasingPowerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await purchasingPowerComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PurchasingPower', async () => {
    const nbButtonsBeforeDelete = await purchasingPowerComponentsPage.countDeleteButtons();
    await purchasingPowerComponentsPage.clickOnLastDeleteButton();

    purchasingPowerDeleteDialog = new PurchasingPowerDeleteDialog();
    expect(await purchasingPowerDeleteDialog.getDialogTitle()).to.eq(
      'plantyComparePortalApp.plantyComparePurchasingPowerPurchasingPower.delete.question'
    );
    await purchasingPowerDeleteDialog.clickOnConfirmButton();

    expect(await purchasingPowerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
