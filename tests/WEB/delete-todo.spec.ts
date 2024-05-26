import { test, expect } from '@playwright/test';
import { TodoPage } from '../../pages/todo.pages';
import { generateRandomTodo } from '../../helper/web-helper';

test.describe('Success to Delete Completed ToDo', async() => {
  test('TWEB0017-Success to delete completed todo', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    const todoTitle = await generateRandomTodo('with-emoji');
    await todoPage.addSingleTodo(todoTitle);

    await expect(todoPage.lblCountTodo).toContainText('1 item left');
    expect(await todoPage.lblTodoTitle.count()).toBe(1);
    expect(await todoPage.lblTodoTitle.first().textContent()).toEqual(todoTitle)

    await todoPage.checkTodoAs(1, 'completed');
    await expect(todoPage.lblCountTodo).toContainText('0 items left');

    await todoPage.btnTabCompleted.click();
    await todoPage.lblTodoTitle.first().hover();
    await todoPage.btnDeleteSingleTodo.first().click();

    await expect(todoPage.lblCountTodo).not.toBeVisible();
    await expect(todoPage.lblTodoTitle).not.toBeVisible();
  });
})

test.describe('Success to Delete Active ToDo', async() => {
  test('TWEB0018-Success to delete active todo', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.goto();
    const todoTitle = await generateRandomTodo('with-emoji');
    await todoPage.addSingleTodo(todoTitle);

    await expect(todoPage.lblCountTodo).toContainText('1 item left');
    expect(await todoPage.lblTodoTitle.count()).toBe(1);
    expect(await todoPage.lblTodoTitle.first().textContent()).toEqual(todoTitle)

    await todoPage.btnTabActive.click();
    await todoPage.lblTodoTitle.first().hover();
    await todoPage.btnDeleteSingleTodo.first().click();

    await expect(todoPage.lblCountTodo).not.toBeVisible();
    await expect(todoPage.lblTodoTitle).not.toBeVisible();
  });
})