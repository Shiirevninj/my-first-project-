import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "../app/page";

describe("Home page", () => {
  it("renders the main content landmark", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toMatch(/<main\b/);
  });

  it("renders the getting started heading", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toMatch(/<h1\b[^>]*>To get started, edit the /);
    expect(html).toContain("page.tsx");
  });

  it("provides alternative text for the Next.js logo", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain('alt="Next.js logo"');
  });

  it("links to the Next.js documentation", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toMatch(/href="https:\/\/nextjs\.org\/docs\?[^\"]*"/);
    expect(html).toContain("Documentation</a>");
  });

  it("protects links that open in a new tab", () => {
    const html = renderToStaticMarkup(<Home />);
    const newTabLinks = html.match(/<a\b[^>]*target="_blank"[^>]*>/g);

    expect(newTabLinks).toHaveLength(2);
    for (const link of newTabLinks ?? []) {
      expect(link).toContain('rel="noopener noreferrer"');
    }
  });
});
