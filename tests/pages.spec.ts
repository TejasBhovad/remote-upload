import { test, expect } from "@playwright/test";

test("should navigate to the upload page", async ({ page }) => {
  await page.goto("/");

  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Share files" }).click();

  await expect(page).toHaveURL("https://localhost:3000/upload");
  await expect(page.locator("h1")).toContainText("upload files here");
});

test("should navigate to the scan page", async ({ page }) => {
  await page.goto("/");

  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Receive files" }).click();

  await expect(page).toHaveURL("https://localhost:3000/scan");
  await expect(page.locator("h1")).toContainText("scan code here");
});
