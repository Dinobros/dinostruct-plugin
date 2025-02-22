import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const realpath = (input: string) => fileURLToPath(new URL(input, import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: {
        "index": realpath("src/index.ts"),
        "c3runtime/actions": realpath("src/c3runtime/actions.ts"),
        "c3runtime/conditions": realpath("src/c3runtime/conditions.ts"),
        "c3runtime/expressions": realpath("src/c3runtime/expressions.ts"),
        "c3runtime/instance": realpath("src/c3runtime/instance.ts"),
        "c3runtime/plugin": realpath("src/c3runtime/plugin.ts"),
        "c3runtime/type": realpath("src/c3runtime/type.ts")
      },
      formats: ["es"]
    },
    rollupOptions: {
      output: {
        dir: "dist",
        chunkFileNames: "c3runtime/[name].js",

        manualChunks: function(id)
        {
          if (/src\/\w+\.ts/.exec(id)) { return undefined; }
          if (id.includes("node_modules")) { return "vendors"; }
          if (!(id.includes("c3runtime"))) { return "internals"; }
          else if (/src\/c3runtime\/\w+\/(?!index)\w+\.ts/.exec(id)) { return "runtime"; }

          return undefined;
        }
      }
    },
    sourcemap: true
  },
  resolve: { alias: { "@": realpath("src/") } },
  server: { cors: true }
});
