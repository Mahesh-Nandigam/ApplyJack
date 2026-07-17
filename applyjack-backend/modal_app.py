import os
import modal
import json
from playwright.async_api import async_playwright
from fastapi import FastAPI, Request

app = modal.App("applyjack-backend")

# Define the container image with Playwright dependencies
playwright_image = modal.Image.debian_slim(python_version="3.11").run_commands(
    "apt-get update",
    "apt-get install -y software-properties-common",
    "pip install playwright",
    "playwright install-deps chromium",
    "playwright install chromium"
)

web_app = FastAPI()

@app.function(image=playwright_image)
async def scrape_linkedin_jobs(cookie_value: str, role: str):
    """
    Launches a headless browser, injects the cookie, and navigates to LinkedIn.
    """
    print(f"Starting automation for role: {role}")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        
        # Inject the session cookie
        print("Injecting session cookie...")
        await context.add_cookies([
            {
                "name": "li_at",
                "value": cookie_value,
                "domain": ".www.linkedin.com",
                "path": "/",
                "secure": True,
                "httpOnly": True,
                "sameSite": "None"
            }
        ])
        
        page = await context.new_page()
        
        print("Navigating to LinkedIn Jobs page...")
        search_url = f"https://www.linkedin.com/jobs/search/?keywords={role.replace(' ', '%20')}"
        
        response = await page.goto(search_url, wait_until="domcontentloaded")
        await page.wait_for_timeout(3000)
        
        page_title = await page.title()
        print(f"Successfully reached: {page_title}")
        
        await browser.close()
        
        return {
            "status": "success",
            "message": f"Successfully scraped jobs for {role}",
            "page_title": page_title
        }


@app.function(image=playwright_image)
@modal.asgi_app()
def fastapi_app():
    return web_app

@web_app.post("/trigger")
async def trigger_automation(request: Request):
    """
    This is the Webhook that the Next.js frontend will call!
    """
    item = await request.json()
    cookie = item.get("cookie")
    role = item.get("role", "Software Engineer")
    
    if not cookie:
        return {"error": "Missing cookie"}
        
    print(f"Received webhook request for {role}")
    
    # We trigger the scraping function
    result = await scrape_linkedin_jobs.remote.aio(cookie, role)
    
    return result
