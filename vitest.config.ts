import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        coverage: {
            include: ["src/scripts/**/*.ts"],
            exclude: ["src/scripts/index.ts"],
            thresholds: {
                100: true,
            },
        },
    },
})
