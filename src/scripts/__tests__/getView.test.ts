import { afterEach, describe, expect, it, vi } from "vitest"
import { getView } from "../getView.js"

vi.mock("node:fs/promises", () => ({
    readFile: vi.fn().mockResolvedValue("<img src={{file}} alt>"),
}))

describe("getView", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    it("should return the requested file content", async () => {
        const file = await getView("./dummy")

        expect(file).toBe("<img src={{file}} alt>")
    })
})
