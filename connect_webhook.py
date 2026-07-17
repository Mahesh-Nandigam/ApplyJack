import pathlib

file_path = 'src/app/dashboard/page.js'
content = pathlib.Path(file_path).read_text(encoding='utf-8')

# The Modal Webhook URL
webhook_url = "https://mahesh-nandigam--applyjack-backend-fastapi-app.modal.run/trigger"

new_logic = f"""
      // Alert the user that scraping is starting
      triggerStepPopup(`Initiating Playwright Scraping for ${{platform}}...`);
      
      // Trigger Modal Webhook
      fetch('{webhook_url}', {{
        method: 'POST',
        headers: {{ 'Content-Type': 'application/json' }},
        body: JSON.stringify({{ 
            cookie: userProfile[cookieKey],
            role: "Frontend Engineer" // Mock role for the demo
        }})
      }})
      .then(res => res.json())
      .then(data => {{
          if (data.status === "success") {{
              triggerStepPopup(data.message + " | Reached: " + data.page_title);
          }} else {{
              triggerStepPopup("Scraping error: " + JSON.stringify(data));
          }}
      }})
      .catch(err => {{
          triggerStepPopup("Failed to trigger webhook: " + err.message);
      }});
"""

# Because we used `alert` in the previous injection or `triggerStepPopup` if I changed it back.
# Wait, my previous injection script used `alert(\`Initiating AI Agents for ${platform}...\`);`
content = content.replace(
    "alert(`Initiating AI Agents for ${platform}...`);",
    new_logic.strip()
)

pathlib.Path(file_path).write_text(content, encoding='utf-8')
print("Successfully connected Dashboard to Modal Webhook!")
