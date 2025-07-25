# GIS School Finder Dashboard

A modern web application for searching, visualizing, and managing high school data in your city. Built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS** on the frontend, and a Python backend serving school and infrastructure data.

---

## Features

- **Interactive Map:** View schools, your location, and routes using Google Maps.
- **School Search:** Search by name, type, or category.
- **Radius Filter:** Find schools within 5km of your current location.
- **School Detail Panel:** See detailed info, images, and get directions.
- **Dashboard:** Add, edit, and delete schools via a beautiful admin panel.
- **Legend & UI:** Colorful, user-friendly interface with map legend and quick actions.

---

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- Python 3.8+ (for backend)
- Google Maps API Key (for map features)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/gis-school-finder.git
cd gis-school-finder
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../server
pip install -r requirements.txt
```

---

## Running the Application

### 1. Start the Backend Server

Make sure your backend serves school data and infrastructure images.

```bash
cd server
python manage.py runserver
```

- School API: `http://127.0.0.1:8000/school/`
- Images: `http://127.0.0.1:8000/static/infrastructure_photos/`

### 2. Start the Frontend (React)

```bash
cd ../client
npm run dev
```

- App will run at: [http://localhost:5173](http://localhost:5173)

---

## Usage

- **Map View:** See all schools, filter by radius, and click markers for details.
- **Locate Button:** Center map on your current location.
- **Radius Button:** Show schools within 5km.
- **School Detail:** Click a school for info, images, and directions.
- **Dashboard:** Go to `/dashboard` to manage schools (add, edit, delete).

### Example: Adding a School

1. Go to `/dashboard`
2. Fill in school details and submit.
3. School appears on the map and in the list.

### Example: Viewing School Images

- Click a school marker.
- In the detail panel, click an image to view it larger.

---

## Project Structure

```
client/
  src/
    assets/           # Images and icons
    components/       # React components (map, panels, dashboard, etc.)
    pages/            # Main pages (Home, Dashboard)
    App.tsx           # Main app component
    index.html        # Vite entry point
server/
  gis_app/
    models.py         # Django models
    views.py          # API endpoints
  infrastructure_photos/ # School facility images
```

---

## Dependencies

**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS
- react-icons
- Google Maps JavaScript API

**Backend:**
- Python
- Django (or Flask/FastAPI, depending on your setup)
- Django REST Framework (if using Django)

---

## Requirements

- Google Maps API Key (add to your `.env` or directly in your code)
- Backend must serve school data at `/school/` and images at `/static/infrastructure_photos/`

---

## Customization

- Add more school types, categories, or images in the backend.
- Update map styles or UI in `client/src/components/map/`.
- Change dashboard fields in `client/src/pages/Dashboard.tsx`.

---

## License

MIT License

---

## Contact

For questions or contributions, open an issue
