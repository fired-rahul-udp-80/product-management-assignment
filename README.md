# Product Management Dashboard

A full-stack product management admin dashboard built with **Next.js (App Router)**, **Tailwind CSS**, **Redux Toolkit**, and integrated with the **DummyJSON API**.

### 1. Install Dependencies
npm install

### 2. Run the Development Server
npm run dev

### 3. Open Application
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: Next.js (App Router)
- **State Management**: Redux Toolkit & React-Redux
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios (with Request & Response Interceptors)
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Data Source**: [DummyJSON API](https://dummyjson.com)

---

## 📋 Step-by-Step Implementation Summary

### Step 1: Project Setup & Architecture Configuration
1. Initialized Next.js project with App Router architecture and Tailwind CSS.
2. Configured centralized Axios instance in `lib/axios.js` with `baseURL: 'https://dummyjson.com'`.
3. Added request interceptors to automatically attach Bearer Auth tokens.
4. Added response interceptors for global error handling and session expiration management.
5. Set up global Redux Toolkit store (`store/index.js`) and wrapped the application with `ReduxProvider`.
6. Configured global `Toaster` from `react-hot-toast` in `app/layout.jsx`.

---

### Step 2: Authentication & Protected Routes
1. Built modern login page (`/login`) with form inputs for Username and Password.
2. Added client-side form validation and duplicate request prevention.
3. Implemented DummyJSON Authentication API integration (`POST /auth/login`).
4. Created `authSlice` to manage `token`, `user`, and `isAuthenticated` states.
5. Synced authentication state with `localStorage` for session persistence across page reloads.
6. Created one-click demo credentials auto-fill helper (`emilys` / `emilyspass`).
7. Implemented protected layout (`app/products/layout.jsx`) that checks authentication and redirects unauthenticated users to `/login`.
8. Added logout functionality in Navbar with token clearing and state reset.

---

### Step 3: Dashboard Layout & Navigation System
1. Created responsive admin layout featuring a Left Sidebar, Top Navbar, and Main Content Area.
2. Built `Sidebar.jsx` with collapsible submenus, active route detection, and modern icons.
3. Created routes for menu navigation (`/products`, `/products/add`).
4. Built `Navbar.jsx` displaying logged-in user profile, avatar, mobile hamburger toggle, and logout button.
5. Handled mobile responsiveness with slide-out overlay drawer navigation for small screens.

---

### Step 4: Product Listing & Custom Table Design
1. Created `/products` catalog page connected to real-time DummyJSON data.
2. Implemented customized `ProductTable.jsx` displaying exclusively the 7 essential columns:
   - **IMAGE**: Thumbnail image in a clean rounded border container.
   - **TITLE**: Product title with truncated text.
   - **CATEGORY**: Pill badge with capitalized category name.
   - **PRICE**: Formatted currency display
   - **RATING**: Star icon with numerical rating.
   - **STOCK**: Status badge color-coded by stock level.
   - **ACTIONS**: Action buttons for View, Edit, and Delete.
3. Created `ProductCard.jsx` to render mobile-friendly card layouts for smaller screens.
4. Implemented `LoadingSpinner.jsx`, `EmptyState.jsx`, and `ErrorAlert.jsx` (with a retry trigger).

---

### Step 5: Search, Category Filter, and Sorting
1. Built debounced search bar (`ProductSearch.jsx`) using a custom `useDebounce` hook (400ms delay) to prevent excessive API requests.
2. Built dynamic category dropdown (`CategoryFilter.jsx`) populated via `productService.getCategories()`.
3. Built multi-field sorting dropdown (`ProductSort.jsx`) supporting Title, Price, Rating, and Stock (Ascending / Descending).
4. Created `useProductParams` custom hook to synchronize search, category, page, limit, sort, and order with browser URL search parameters.
5. **Solved API Limitation (Hybrid Search + Category Strategy)**:
   - *Problem*: DummyJSON does not provide an endpoint that combines `/products/category/{cat}` with `?q={search}`.
   - *Solution*: When both filters are active, the app fetches products of the selected category and filters them client-side by query, keeping sorting and pagination seamless without backend errors.

---

### Step 6: Server & Client-side Pagination
1. Built `Pagination.jsx` component displaying current page, total items count, and total page count.
2. Added page size selector allowing users to view 10, 20, or 50 items per page.
3. Fully integrated pagination with query parameters (`page`, `limit`) and server-side skipping (`skip = (page - 1) * limit`).

---

### Step 7: Complete CRUD Operations
1. **Create / Add Product (`/products/add`)**:
   - Reusable `ProductForm.jsx` with comprehensive validation for title, price, category, stock, and thumbnail.
   - API integration with `productService.addProduct(formData)`.
   - Loading state during submission, success toast notification, and auto-redirect to `/products`.
2. **Read / View Product Details (`/products/[id]`)**:
   - Dynamic route fetching single product via `productService.getProductById(id)`.
   - `ProductDetailView.jsx` presenting high-resolution imagery, pricing, ratings, stock, brand, and customer reviews.
3. **Update / Edit Product (`/products/[id]/edit`)**:
   - Form pre-populated with existing product data fetched via `productService.getProductById(id)`.
   - Update submission using `productService.updateProduct(id, formData)`.
   - Success toast and automatic redirection back to `/products`.
4. **Delete Product (`DeleteConfirmModal.jsx`)**:
   - Modal prompt displaying product ID to confirm destructive action.
   - API integration with `productService.deleteProduct(id)`.
   - Immediate optimistic UI update (removes item from state and updates total count without requiring full page reload).
