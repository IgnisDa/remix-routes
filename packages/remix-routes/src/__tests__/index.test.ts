import { test, expect } from "vitest";
import { $path, $params } from "../index";

test("$path", () => {
	expect($path("/posts")).toBe("/posts");
});

test("$path + params", () => {
	expect($path("/posts/:id", { id: 1 })).toBe("/posts/1");
	expect($path("/posts/:id", { id: "3/4 situps" })).toBe(
		"/posts/3%2F4%20situps",
	);
});

test("$path + query", () => {
	expect($path("/posts", { order: "desc" })).toBe("/posts?order=desc");
});

test("$path + undefined queries", () => {
	expect($path("/posts", { order: undefined })).toBe("/posts");
	expect($path("/posts", { order: undefined, filter: "draft" })).toBe(
		"/posts?filter=draft",
	);
	expect($path("/posts", { order: undefined, isDraft: false })).toBe(
		"/posts?isDraft=false",
	);
});

test("$path + array query", () => {
	expect(
		$path("/posts/delete", [
			["id", "1"],
			["id", "2"],
		]),
	).toBe("/posts/delete?id=1&id=2");
});

test("$path + params + query", () => {
	expect($path("/posts/:id", { id: 1 }, { raw: "true" })).toBe(
		"/posts/1?raw=true",
	);
});

test("$path + optional route fragment", () => {
	expect($path("/:lang?/about", {})).toBe("/about");
	expect($path("/:lang?/about", { lang: "en" })).toBe("/en/about");
});

test("$path + catch all route", () => {
	expect($path("/sign-in/*", { "*": "admin" })).toBe("/sign-in/admin");
	expect($path("/sign-in/*")).toBe("/sign-in");
	expect($path("/sign-in/*", { "*": "" })).toBe("/sign-in/");
});

test("$params", () => {
	expect($params("/posts/:id", { id: "1" })).toStrictEqual({ id: "1" });
});
