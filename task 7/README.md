# Dog Browser (Task 7)

Fetch and display data from a public API using the Fetch API. This project uses TheDogAPI to render a responsive gallery of dog images with breed details.

## Overview

- Fetches dogs from TheDogAPI using `fetch`
- Parses JSON and displays results as cards (image, breed, temperament, weight/height/lifespan)
- Loading spinner while fetching; stops only after images are fully loaded
- Errors are handled and shown in a visible alert
- Reload button to refetch a fresh set of results
- Modern, responsive UI (pure HTML/CSS/JS)

## Requirements

- A modern browser
- Internet connection

## Getting Started

1. Open `task 7/index.html` directly in your browser.
2. Wait for the loader to complete; cards will appear when images finish loading.
3. Click the “Reload” button to fetch another set.

## Configuration

- API Key: The project uses TheDogAPI. An API key is required and is currently set in `task 7/script.js` as `API_KEY`.
  - Replace the placeholder with your own key if needed.
  - Location: `const API_KEY = 'YOUR_DOG_API_KEY_HERE';`
- Results per load: Adjust the `limit` query parameter in `DOGS_API` inside `task 7/script.js`.
  - Example: `.../images/search?limit=12&has_breeds=1`

## Testing Error Handling

- Disable your internet connection.
- Click “Reload”.
- You should see a readable error message in the alert box.
- Re-enable your internet and click “Reload” to recover.

## Project Structure

```
/task 7
  ├─ index.html     # Markup, loader/error containers, cards section, reload button
  ├─ style.css      # Modern dark theme, responsive card grid, typography
  ├─ script.js      # Fetch logic (TheDogAPI), image preloading, error handling
  └─ README.md      # You are here
```

## Notes

- Security: This demo keeps the API key in frontend code for simplicity. For production, use a backend or proxy to keep keys private.
- Accessibility: Error region uses `role="alert"` and `aria-live`; the reload button is disabled while loading to prevent duplicate requests.

## Credits

- Data: TheDogAPI (`https://thedogapi.com`)
