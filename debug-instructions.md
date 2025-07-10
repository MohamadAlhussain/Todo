# Debug Instructions

## Step 1: Check Browser Console

1. Go to your Vercel app: https://todo-git-main-herralhussaingmailcoms-projects.vercel.app/
2. Press F12 to open Developer Tools
3. Click on "Console" tab
4. Look for any error messages (red text)
5. Tell me exactly what errors you see

## Step 2: Check Network Tab

1. In Developer Tools, click "Network" tab
2. Refresh the page
3. Look for any failed requests (red entries)
4. Click on any failed request and tell me the error details

## Step 3: Test API Directly

1. Open a new browser tab
2. Go to: https://todo-qnbf.onrender.com/api/tasks
3. You should see JSON data
4. If you see data, the API is working

## Step 4: Check if it's a CORS Issue

1. In the Console tab, look for messages like:
   - "Access to fetch at... has been blocked by CORS policy"
   - "No 'Access-Control-Allow-Origin' header"
   - "Failed to fetch"

## Common Issues:

- CORS error: "Access to fetch at... has been blocked by CORS policy"
- Network error: "Failed to fetch"
- 404 error: "Not Found"
- 500 error: "Internal Server Error"

Tell me exactly what you see in the console!
