import { lstat, readdir } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

const realpath = (input: string) => fileURLToPath(new URL(input, import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: {
        "index": realpath("src/index.ts"),
        "c3runtime/index": realpath("src/c3runtime/index.ts"),
        "c3runtime/domSide": realpath("src/c3runtime/domSide.ts")
      },
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        dir: ".build",
        chunkFileNames: "c3runtime/[name].js",

        manualChunks: function(id)
        {
          if (id.includes("node_modules")) { return "vendor"; }

          return undefined;
        }
      }
    },
    sourcemap: true
  },
  plugins: [{
    name: "watch:public",
    buildStart: async function(): Promise<void>
    {
      const publicDir = realpath("public");
      const publicFiles = await readdir(publicDir, { recursive: true });

      for (const filePath of publicFiles.map((fileName) => `${publicDir}/${fileName}`))
      {
        const stats = await lstat(filePath);
        if (stats.isDirectory()) { continue; }

        this.addWatchFile(filePath);
      }
    }
  }],
  resolve: { alias: { "@": realpath("src/") } },
  server: { cors: true }
});
