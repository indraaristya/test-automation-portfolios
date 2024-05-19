import { faker } from '@faker-js/faker';
import { type Page, type Locator } from '@playwright/test';
import { waitForElement } from '../helper/web-helper';
import { setup } from '../helper/setup';

export class TodoPage {
  readonly page: Page;
  readonly txtTodoField: Locator;
  readonly lblTodoTitle: Locator;
  readonly btnMarkTodo: Locator;
  readonly btnDeleteSingleTodo: Locator;

  readonly lblCountTodo: Locator;
  readonly btnTabAll: Locator;
  readonly btnTabActive: Locator;
  readonly btnTabCompleted: Locator;
  readonly btnClearCompletedTodo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtTodoField = page.locator('.new-todo');
    this.lblTodoTitle = page.locator('//label[@data-testid="todo-title"]');
    this.btnMarkTodo = page.locator('//ul[@class="todo-list"]//input[@type="checkbox"]')
    this.btnDeleteSingleTodo = page.locator('//button[@class="destroy"]');

    this.lblCountTodo = page.locator('//span[@data-testid="todo-count"]');
    this.btnTabAll = page.locator('//a[text()="All"]');
    this.btnTabActive = page.locator('//a[text()="Active"]');
    this.btnTabCompleted = page.locator('//a[text()="Completed"]');
    this.btnClearCompletedTodo = page.locator('//button[@class="clear-completed"]')
  }

  async goto() {
    await this.page.goto(setup.baseUrl);
  }

  async addSingleTodo(title: string = 'random') {
    let value: string;
    if (title == 'random') {
      value = faker.word.verb();
    } else {
      value = title;
    }

    await waitForElement(this.txtTodoField);
    await this.txtTodoField.fill(value);
    await this.page.keyboard.press('Enter');

    return value;
  }
}