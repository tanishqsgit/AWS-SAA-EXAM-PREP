import {test as base,expect,type Page} from '@playwright/test';
export {expect};
export const testEmail='learner@example.test';
export async function registerLocal(page:Page,email=testEmail){await page.getByRole('button',{name:'Create profile',exact:true}).click();await page.getByLabel('Email address').fill(email);await page.getByLabel('Password',{exact:true}).fill('local-study-password');await page.getByLabel('Confirm password').fill('local-study-password');await page.getByRole('button',{name:'Create profile and start'}).click();await expect(page.getByRole('heading',{name:/Build confidence/})).toBeVisible();}
export const test=base.extend({page:async({page},use)=>{await page.goto('/');await registerLocal(page);await use(page);}});
