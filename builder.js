require("esbuild")
  .build({
    entryPoints: ["./src/main.js"],
    bundle: true,
    minify: true,
    sourcemap: false,
    outfile: "dist/main.js",
  })
  .catch(() => process.exit(1));
