**Call Analytics Dashboard
**
This is a small React + TypeScript dashboard built as part of a frontend assignment.
It visualizes call analytics for voice agents using simple charts and dummy data.

Users can edit call duration values directly from the UI. Before saving, the app asks for an email and stores the data in Supabase. If data already exists for that email, the user is asked once before overwriting it.

**Tech used
**
React + TypeScript

Vite

Tailwind CSS

Recharts

Supabase

**Run locally
**
Install dependencies
npm install

Add environment variables in .env

VITE_SUPABASE_URL=your_url
VITE_SUPABASE_KEY=your_key


**Start the app
**npm run dev

**Notes
**
Dummy data is the same for all users

Changes are saved per email

Charts update live while editing
