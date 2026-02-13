from playwright.sync_api import sync_playwright

def verify_valentine():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the page
            page.goto("http://localhost:8080/index.html")

            # Verify the header text
            header = page.locator("h1")
            header_text = header.inner_text()
            print(f"Header text found: '{header_text}'")

            if "Mimmi, will you be my Valentine?" in header_text:
                print("PASSED: Header text correct.")
            else:
                print("FAILED: Header text mismatch.")

            # Take a screenshot of the main page
            page.screenshot(path="verification/screenshot.png")

            # Verify the Yes button redirection
            # We will use a listener to catch the navigation intent
            # because actual navigation to whatsapp might fail in this environment

            got_request = False
            def handle_request(request):
                nonlocal got_request
                if "wa.me/94725571648" in request.url:
                    print(f"PASSED: Detected navigation request to {request.url}")
                    got_request = True

            page.on("request", handle_request)

            print("Clicking 'Yes' button...")
            page.click("#yes-btn")

            # Wait a bit for the event
            page.wait_for_timeout(2000)

            if not got_request:
                # Fallback: check page url if it managed to change
                if "wa.me/94725571648" in page.url:
                    print("PASSED: URL changed to correct WhatsApp link.")
                else:
                    print("FAILED: Did not detect navigation to correct WhatsApp link.")
                    print(f"Current URL: {page.url}")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_valentine()
