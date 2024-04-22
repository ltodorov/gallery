import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        coverage: {
            exclude: ["src/scripts/index.ts"],
            thresholds: {
                100: true,
            },
        },
    },
})
