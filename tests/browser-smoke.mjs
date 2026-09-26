import { chromium } from "playwright";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const browser = await chromium.launch({
    executablePath:
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
    args: ["--disable-gpu", "--disable-software-rasterizer", "--no-sandbox"],
  });
  try {
    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (entry) => {
        if (entry.type() === "error") errors.push(entry.text());
      });
      await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
      await page.getByRole("heading", { level: 1 }).waitFor();
      const sizes = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
      }));
      if (sizes.document > sizes.viewport) {
        const overflow = await page.evaluate(() =>
          [...document.querySelectorAll("body *")]
            .filter(
              (node) =>
                !node.closest(".marquee-wrap") &&
                node.getBoundingClientRect().right > window.innerWidth + 1,
            )
            .map((node) => ({
              tag: node.tagName,
              className: node.className?.baseVal ?? node.className,
              right: Math.round(node.getBoundingClientRect().right),
            }))
            .sort((a, b) => b.right - a.right)
            .slice(0, 25),
        );
        console.error(overflow);
      }
      assert.ok(
        sizes.document <= sizes.viewport,
        `Horizontal overflow at ${width}px: ${JSON.stringify(sizes)}`,
      );
      assert.deepEqual(errors, [], `Browser errors at ${width}px`);
      await page.waitForTimeout(900);
      await page.screenshot({
        path: path.join(testDirectory, `preview-${width}.png`),
        fullPage: false,
      });
      if (width === 390) {
        await page.route("**/api/contact", (route) =>
          route.fulfill({
            status: 503,
            contentType: "application/json",
            body: JSON.stringify({
              ok: false,
              message: "Delivery failed. Please email me directly.",
            }),
          }),
        );
        await page.getByRole("button", { name: "Open menu" }).click();
        const beforeScroll = await page.evaluate(() => window.scrollY);
        const workPosition = await page.evaluate(() => {
          const target = document.getElementById("work");
          return (
            window.scrollY +
            target.getBoundingClientRect().top -
            document.querySelector(".site-header").getBoundingClientRect()
              .height -
            12
          );
        });
        await page
          .getByRole("navigation", { name: "Mobile navigation" })
          .getByRole("link", { name: "Work" })
          .click();
        assert.equal(new URL(page.url()).hash, "#work");
        await page.waitForTimeout(220);
        const midScroll = await page.evaluate(() => window.scrollY);
        assert.ok(
          midScroll > beforeScroll + 20 && midScroll < workPosition - 20,
          "Navigation should visibly ease between sections",
        );
        await page.waitForFunction(
          (expected) => Math.abs(window.scrollY - expected) < 24,
          workPosition,
          { timeout: 2500 },
        );
        await page.locator("#contact").scrollIntoViewIfNeeded();
        await page.getByRole("textbox", { name: "Name" }).fill("Joseph");
        await page
          .getByRole("textbox", { name: "Email" })
          .fill("joseph@example.com");
        await page
          .getByRole("textbox", { name: "Tell me about your project" })
          .fill(
            "I would like to discuss a React Native application for my team.",
          );
        await page.getByRole("button", { name: "Send message" }).click();
        await page.getByRole("status").waitFor();
        assert.match(
          await page.getByRole("status").innerText(),
          /email me directly/i,
        );
        assert.equal(
          await page.getByRole("textbox", { name: "Name" }).inputValue(),
          "Joseph",
        );
      }
      if (width === 1440) {
        assert.equal(await page.locator(".site-particles canvas").count(), 1);
        assert.ok(
          await page
            .locator(".site-particles canvas")
            .evaluate((canvas) => canvas.width > 0 && canvas.height > 0),
          "Particles background should render a viewport-sized canvas",
        );
        assert.equal(await page.locator(".react-bits-blur-text").count(), 1);
        assert.equal(await page.locator(".react-bits-true-focus").count(), 1);
        assert.equal(
          await page.locator(".react-bits-true-focus__word").count(),
          7,
        );
        await page.waitForFunction(() => {
          const frame = document.querySelector(".react-bits-true-focus__frame");
          return frame && Number(getComputedStyle(frame).opacity) > 0.9;
        });
        const reducedFocus = page.locator(".react-bits-true-focus__frame");
        const reducedStart = await reducedFocus.boundingBox();
        await page.waitForTimeout(1700);
        const reducedEnd = await reducedFocus.boundingBox();
        assert.ok(
          reducedStart &&
            reducedEnd &&
            (Math.abs(reducedEnd.x - reducedStart.x) > 2 ||
              Math.abs(reducedEnd.y - reducedStart.y) > 2),
          "True Focus should remain visible and advance with reduced motion enabled",
        );
        assert.ok((await page.locator(".react-bits-magnet").count()) >= 1);
        assert.equal(await page.locator(".react-bits-fuzzy-text").count(), 2);
        assert.equal(
          await page.locator(".react-bits-electric-border").count(),
          5,
        );
        assert.ok(
          await page
            .locator(".hero-art__portrait")
            .evaluate((image) => image.naturalWidth > 0),
          "Hero portrait should load",
        );
        assert.ok(
          await page
            .locator(".hero-art__portrait-wrap")
            .evaluate((portrait) => {
              const imageCenter =
                portrait.getBoundingClientRect().left +
                portrait.getBoundingClientRect().width / 2;
              const art = portrait.closest(".hero-art").getBoundingClientRect();
              return Math.abs(imageCenter - (art.left + art.width / 2)) < 2;
            }),
          "Portrait should be centered in the hero artwork",
        );
        assert.equal(
          await page.locator(".react-bits-spotlight-card").count(),
          4,
        );
        await page.locator(".services-grid").scrollIntoViewIfNeeded();
        await page.waitForTimeout(900);
        assert.ok(
          await page
            .locator(".service-reveal")
            .first()
            .evaluate(
              (element) => Number(getComputedStyle(element).opacity) > 0.95,
            ),
          "Service cards should reveal after entering the viewport",
        );
        await page.screenshot({
          path: path.join(testDirectory, "preview-services.png"),
        });
        await page.locator(".contact-panel").scrollIntoViewIfNeeded();
        await page.waitForTimeout(900);
        assert.ok(
          await page
            .locator(".contact-reveal")
            .evaluate(
              (element) => Number(getComputedStyle(element).opacity) > 0.95,
            ),
          "Contact form should reveal after entering the viewport",
        );
        await page.screenshot({
          path: path.join(testDirectory, "preview-contact.png"),
        });
      }
      console.log(`${width}px: no overflow, no page errors`);
      await context.close();
    }

    const marqueeContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    const marqueePage = await marqueeContext.newPage();
    await marqueePage.goto("http://localhost:3000", {
      waitUntil: "networkidle",
    });
    const groups = marqueePage.locator(".marquee-group");
    assert.equal(await groups.count(), 2, "Marquee needs two identical groups");
    const geometry = await marqueePage.evaluate(() => {
      const [first, second] = document.querySelectorAll(".marquee-group");
      const firstBox = first.getBoundingClientRect();
      const secondBox = second.getBoundingClientRect();
      return { distance: secondBox.x - firstBox.x, width: firstBox.width };
    });
    assert.ok(
      Math.abs(geometry.distance - geometry.width) < 1,
      "Marquee groups must join without a reset gap",
    );
    const track = marqueePage.locator(".marquee-track");
    const start = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await marqueePage.waitForTimeout(350);
    const next = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    assert.notEqual(next, start, "Marquee should move when motion is allowed");
    await marqueePage.emulateMedia({ reducedMotion: "reduce" });
    await marqueePage.waitForTimeout(150);
    const reducedStart = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await marqueePage.waitForTimeout(350);
    const reducedNext = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    assert.notEqual(
      reducedNext,
      reducedStart,
      "Marquee should remain usable with reduced motion enabled",
    );
    await marqueePage
      .getByRole("button", { name: "Pause scrolling tools" })
      .click();
    const pausedStart = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await marqueePage.waitForTimeout(350);
    const pausedNext = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    assert.equal(
      pausedNext,
      pausedStart,
      "Pause control should stop the marquee",
    );
    await marqueePage
      .getByRole("button", { name: "Resume scrolling tools" })
      .click();
    const resumedStart = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await marqueePage.waitForTimeout(350);
    const resumedNext = await track.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    assert.notEqual(
      resumedNext,
      resumedStart,
      "Resume control should restart the marquee",
    );
    await marqueePage.emulateMedia({ reducedMotion: "no-preference" });
    await marqueePage.waitForTimeout(250);
    const trueFocus = marqueePage.locator(".react-bits-true-focus");
    await trueFocus.scrollIntoViewIfNeeded();
    const focusFrame = trueFocus.locator(".react-bits-true-focus__frame");
    await marqueePage.waitForFunction(
      (element) => Number(getComputedStyle(element).opacity) > 0.9,
      await focusFrame.elementHandle(),
      { timeout: 2500 },
    );
    await marqueePage.screenshot({
      path: path.join(testDirectory, "preview-true-focus.png"),
    });
    const focusStart = await focusFrame.boundingBox();
    await marqueePage.waitForTimeout(1750);
    const focusEnd = await focusFrame.boundingBox();
    assert.ok(
      focusStart &&
        focusEnd &&
        (Math.abs(focusEnd.x - focusStart.x) > 2 ||
          Math.abs(focusEnd.y - focusStart.y) > 2),
      "Hero focus frame should advance between headline words",
    );
    const availability = marqueePage.locator(".hero-art__label--top");
    await availability.scrollIntoViewIfNeeded();
    const availabilityStart = await availability.boundingBox();
    await marqueePage.waitForTimeout(800);
    const availabilityEnd = await availability.boundingBox();
    assert.ok(
      availabilityStart &&
        availabilityEnd &&
        Math.abs(availabilityEnd.y - availabilityStart.y) < 1,
      "Availability badge should remain stationary",
    );
    const fuzzy = marqueePage.locator(".header-brand .react-bits-fuzzy-text");
    await fuzzy.hover();
    await marqueePage.waitForFunction(
      (canvas) => Number(getComputedStyle(canvas).opacity) > 0.5,
      await fuzzy.locator("canvas").elementHandle(),
      { timeout: 2000 },
    );
    assert.ok(
      await fuzzy.locator("canvas").evaluate((element) => {
        const context = element.getContext("2d");
        const pixels = context.getImageData(
          0,
          0,
          element.width,
          element.height,
        ).data;
        return pixels.some((value, index) => index % 4 === 3 && value > 0);
      }),
      "Fuzzy logo canvas should contain rendered text",
    );
    const magnet = marqueePage.locator(".react-bits-magnet").first();
    await magnet.scrollIntoViewIfNeeded();
    await marqueePage.waitForTimeout(200);
    const magnetBox = await magnet.boundingBox();
    assert.ok(magnetBox);
    await marqueePage.mouse.move(0, 0);
    await marqueePage.mouse.move(
      magnetBox.x + magnetBox.width / 2 + 24,
      magnetBox.y + magnetBox.height / 2 + 18,
    );
    await marqueePage.waitForFunction(
      () => {
        const inner = document.querySelector(".react-bits-magnet__inner");
        if (!inner) return false;
        const value = getComputedStyle(inner).transform;
        return value !== "none" && value !== "matrix(1, 0, 0, 1, 0, 0)";
      },
      null,
      { timeout: 2000 },
    );
    const magnetTransform = await magnet
      .locator(".react-bits-magnet__inner")
      .evaluate((element) => getComputedStyle(element).transform);
    assert.notEqual(
      magnetTransform,
      "none",
      "Hero CTA should react to the pointer",
    );
    assert.notEqual(
      magnetTransform,
      "matrix(1, 0, 0, 1, 0, 0)",
      "Hero CTA should move toward the pointer",
    );

    const spotlight = marqueePage.locator(".react-bits-spotlight-card").first();
    await spotlight.scrollIntoViewIfNeeded();
    await spotlight.hover();
    await marqueePage.waitForTimeout(400);
    const spotlightOpacity = await spotlight.evaluate((element) =>
      Number(getComputedStyle(element, "::before").opacity),
    );
    assert.ok(
      spotlightOpacity > 0.5,
      "Service card spotlight should appear on hover",
    );
    await marqueeContext.close();
    console.log("Marquee: continuous group geometry and active motion");
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
