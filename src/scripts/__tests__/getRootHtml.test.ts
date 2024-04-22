import { describe, expect, it } from "vitest"
import { getRootHtml } from "../getRootHtml.js"

describe("getRootHtml", () => {
    it("should return the passed in string", () => {
        expect(getRootHtml("test")).toBe("test")
    })

    it("should return no media message if empty argument", () => {
        expect(getRootHtml("")).toBe(
            "<p>No media files in the public folder.</p>",
        )
    })
})
