import { describe, expect, it, vi } from "vitest"
import { logError } from "../logError.js"

describe("logError", () => {
    it("should log an error in the dev console", () => {
        const consoleErrorSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {})

        logError("Test error")

        expect(consoleErrorSpy).toHaveBeenCalledWith("Test error")
    })
})
