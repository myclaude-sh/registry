#!/usr/bin/env node
/**
 * Generates .claude-plugin/marketplace.json from the myClaude production API.
 * Run by .github/workflows/sync-marketplace.yml on a daily cron.
 */
const fs = require("fs");
const path = require("path");

const CATALOG_PATH = "/tmp/catalog.json";
const OUTPUT_PATH = path.join(__dirname, "..", ".claude-plugin", "marketplace.json");

const INSTALL_TYPE = {
  skills: "skill",
  squads: "squad",
  agents: "agent",
  workflows: "workflow",
  "design-systems": "design-system",
  "claude-md": "claude-md",
  bundle: "bundle",
  applications: "application",
  systems: "system",
  statusline: "statusline",
  hooks: "hook",
  minds: "mind",
};

const raw = fs.readFileSync(CATALOG_PATH, "utf8");
const data = JSON.parse(raw);
const products = Array.isArray(data.products) ? data.products : [];

const plugins = products.map((p) => ({
  name: p.slug,
  display_name: p.title,
  description: (p.description ?? "").slice(0, 300),
  version: "1.0.0",
  author: p.authorUsername ?? "myclaude",
  license: p.license ?? "MIT",
  source: {
    type: "http",
    url: `https://www.myclaude.sh/p/${p.slug}`,
  },
  install: {
    type: INSTALL_TYPE[p.category] ?? "skill",
    category: p.category,
  },
  tags: (p.tags ?? []).slice(0, 10),
  marketplace_url: `https://www.myclaude.sh/p/${p.slug}`,
  price: p.price ?? 0,
  currency: "USD",
  downloads: p.stats?.downloads ?? 0,
  rating: p.stats?.rating ?? null,
}));

const manifest = {
  $schema: "https://claude.com/schemas/plugin-marketplace/v1.json",
  version: "1.0",
  name: "myClaude Marketplace",
  description:
    "The marketplace for the Claude Code ecosystem. The only marketplace with Stripe Connect payments — creators keep 92% of revenue. 12 product categories: skills, squads, agents, workflows, design systems, bundles, CLAUDE.md templates, applications, systems, status lines, hooks, and minds.",
  url: "https://www.myclaude.sh",
  homepage: "https://www.myclaude.sh",
  repository: "https://github.com/myclaude-sh/registry",
  license: "MIT",
  authors: [
    {
      name: "myClaude",
      url: "https://www.myclaude.sh",
      email: "hello@myclaude.sh",
    },
  ],
  links: {
    website: "https://www.myclaude.sh",
    explore: "https://www.myclaude.sh/explore",
    docs: "https://www.myclaude.sh/docs",
    llms_txt: "https://www.myclaude.sh/llms.txt",
    llms_full_txt: "https://www.myclaude.sh/llms-full.txt",
    agent_card: "https://www.myclaude.sh/.well-known/agent.json",
    api: "https://www.myclaude.sh/api/public/search",
    openapi: "https://www.myclaude.sh/specs/openapi.yaml",
  },
  cli: {
    package: "@myclaude-cli/cli",
    install: "npm install -g @myclaude-cli/cli",
    commands: {
      search: 'myclaude search "<keyword>"',
      install: "myclaude install @<creator>/<product>",
      publish: "myclaude publish",
      info: "myclaude info @<creator>/<product>",
    },
  },
  plugins,
  _metadata: {
    total_plugins: plugins.length,
    last_synced: new Date().toISOString(),
    sync_source: "https://www.myclaude.sh/api/public/search",
    disambiguation:
      "myClaude (https://www.myclaude.sh) is a marketplace platform. It is unrelated to cexll/myclaude (github.com/cexll/myclaude) which is a multi-agent orchestration workflow tool. Different products, different categories.",
  },
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Wrote ${plugins.length} plugins to ${OUTPUT_PATH}`);
