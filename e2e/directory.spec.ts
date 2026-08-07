import { expect, test } from "@playwright/test";

test("searches, compares, and opens an enquiry", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Choose a city").selectOption("delhi-ncr");
  await page.getByLabel("Choose a care type").selectOption("assisted-living");
  await page.getByRole("button", { name: "Search residences" }).click();
  await expect(page).toHaveURL(/directory\?city=delhi-ncr&care=assisted-living/);
  const cards = page.locator(".property-card");
  await expect(cards).toHaveCount(2);
  const firstCompare = cards.nth(0).getByRole("button", { name: "Compare" });
  const secondCompare = cards.nth(1).getByRole("button", { name: "Compare" });
  await firstCompare.click();
  await expect(cards.nth(0).getByRole("button", { name: "Added" })).toBeVisible();
  await secondCompare.click();
  await expect(cards.nth(1).getByRole("button", { name: "Added" })).toBeVisible();
  await page.getByRole("link", { name: /Compare now/ }).click();
  await expect(page.getByRole("heading", { name: "Compare residences" })).toBeVisible();
  await page.getByRole("link", { name: "Enquire" }).first().click();
  await expect(page.getByRole("heading", { name: /Ask / })).toBeVisible();
});

test("supports a mobile directory journey", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/directory");
  await expect(page.getByRole("button", { name: /Filters/ })).toBeVisible();
  await page.getByRole("button", { name: /Filters/ }).click();
  await expect(page.getByLabel("Location")).toBeVisible();
});

test("collects a personalised pricing request", async ({ page }) => {
  await page.goto("/directory");
  await page.getByRole("button", { name: "Get pricing" }).first().click();
  await expect(page.getByRole("dialog")).toContainText("Get pricing for Amaltas Care Residence");
  await page.getByText("My father", { exact: true }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByText("Within 2 weeks", { exact: true }).click();
  await page.getByText("Hospital discharge or rehabilitation", { exact: true }).click();
  await page.getByText("₹1.25–₹2 lakh/month", { exact: true }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("Your name").fill("Rohan Mehta");
  await page.getByLabel("Phone number").fill("9876543210");
  await page.getByLabel("Email address").fill("rohan@example.com");
  await page.getByLabel(/I agree to be contacted/).check();
  await page.getByRole("button", { name: /Request pricing/ }).click();
  await expect(page.getByRole("heading", { name: /we’ll reach out to you soon/i })).toBeVisible();
});
