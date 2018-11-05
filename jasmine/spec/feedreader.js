/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$((function() {
	
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe("RSS Feeds", () => {
	
		/* This test ensures that the allFeeds variable has been
		 * defined and that it is not empty.
		 */
		it("are defined", () => {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* This test iterates through the allFeeds object and ensures
		 * that it has a non-empty URL defined
		 */
		it("urls are defined", () => {
			allFeeds.forEach(feed => {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});

		/* This test iterates through the allFeeds object and ensures
		 * that it has a non-empty name defined
		 */
		it("names are defined", () => {
			allFeeds.forEach(feed => {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		});
	});

	// This test suite tests the functionality of the hamburger menu
	describe("The Menu", () => {
		
		// This test ensures that the menu is hidden by default
		it("is hidden by default", () => {
			const body = document.querySelector("body");
			expect(body.classList.contains("menu-hidden")).toBe(true);
		});

		// This test ensures that the manu is toggleable
		it("toggles on and off", () => {
			const body = document.querySelector("body");
			expect(body.classList.contains("menu-hidden")).toBe(true);

			const menuIcon = document.querySelector(".menu-icon-link");
			menuIcon.click();
			expect(body.classList.contains("menu-hidden")).toBe(false);

			menuIcon.click();
		});
	});

	// This test suite ensures that the RSS feed loads
	describe("Initial Entries", () => {
	
		/* A test that ensures when the loadFeed
	 	 * function is called and completes its work, there is at least
	 	 * a single .entry element within the .feed container.
	 	 */
		beforeEach(done => {
			loadFeed(0, done);
		});

		it("are populated", () => {
			const feed = document.querySelector(".feed");
			expect(feed.children.length > 0).toBe(true);
		});
	});

	// Test suite that checks if content changes when a new feed is selected
	describe("New Feed Selection", () => {
		const feed = document.querySelector(".feed");
		const firstFeed = [];

		beforeEach(done => {
			loadFeed(0);
			Array.from(feed.children).forEach(entry => {
				firstFeed.push(entry.innerText);
			});
			loadFeed(1, done);
		});

		it("changes content", () => {
			Array.from(feed.children).forEach((entry, index) => {
				expect(entry.innerText === firstFeed[index]).toBe(false);
			});
		});
	});
})());
