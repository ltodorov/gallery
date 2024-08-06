import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        coverage: {
            include: ["src"],
            exclude: ["src/scripts/index.ts"],
            thresholds: {
                100: true,
            },
        },
    },
})
