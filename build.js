/**
 * Multi-vertical build script.
 *
 * Usage:
 *   node build.js --vertical=law-firm
 *   node build.js --vertical=architecture
 *   node build.js --all
 *   node build.js --vertical=law-firm --watch
 */
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const watch = args.includes("--watch");
const buildAll = args.includes("--all");

function getVerticalArg() {
  const flag = args.find((a) => a.startsWith("--vertical="));
  return flag ? flag.split("=")[1] : null;
}

function discoverVerticals() {
  const verticalsDir = path.join(__dirname, "verticals");
  return fs
    .readdirSync(verticalsDir)
    .filter((name) => {
      if (name.startsWith("_")) return false; // skip _template
      const entryPath = path.join(verticalsDir, name, "entry.js");
      return fs.existsSync(entryPath);
    });
}

function buildOptionsFor(vertical) {
  return {
    entryPoints: [`verticals/${vertical}/entry.js`],
    bundle: true,
    outfile: `dist/${vertical}-v2.js`,
    format: "iife",
    globalName: "ArchificialsAssessmentV2",
    target: ["es2020"],
    minify: !watch,
    sourcemap: watch ? "inline" : false,
    banner: {
      js: `/* Archificials ${vertical} AI Readiness Assessment v2 | archificials.com */`,
    },
  };
}

async function buildVertical(vertical) {
  const opts = buildOptionsFor(vertical);

  // Ensure dist/ exists
  const distDir = path.dirname(opts.outfile);
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  if (watch) {
    const ctx = await esbuild.context(opts);
    await ctx.watch();
    console.log(`[${vertical}] Watching for changes...`);
  } else {
    await esbuild.build(opts);
    const stat = fs.statSync(opts.outfile);
    console.log(`[${vertical}] Built ${opts.outfile} (${(stat.size / 1024).toFixed(1)}KB)`);
  }
}

async function main() {
  let verticals;

  if (buildAll) {
    verticals = discoverVerticals();
    if (verticals.length === 0) {
      console.error("No verticals found with entry.js files.");
      process.exit(1);
    }
    console.log(`Building all verticals: ${verticals.join(", ")}`);
  } else {
    const v = getVerticalArg();
    if (!v) {
      console.error("Usage: node build.js --vertical=<name> | --all [--watch]");
      process.exit(1);
    }
    const entryPath = path.join(__dirname, "verticals", v, "entry.js");
    if (!fs.existsSync(entryPath)) {
      console.error(`Vertical "${v}" not found (no entry.js at ${entryPath})`);
      process.exit(1);
    }
    verticals = [v];
  }

  for (const v of verticals) {
    await buildVertical(v);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
