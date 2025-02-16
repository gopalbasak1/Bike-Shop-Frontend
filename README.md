# Bike Store Frontend

🏍️ **Project Overview:**
The Bike Store is an e-commerce platform where users can browse, filter, and purchase bikes. The platform includes authentication, product management, checkout, and a role-based admin dashboard.

## Live Deployment Link

[Bike-Stores](https://bike-stores.vercel.app/)

## Features

🔐 **User Authentication**

- Secure **Registration & Login** (JWT-based authentication)
- Role-based access control (Customer, Admin)
- Logout functionality

🛒 **Product Management:**

- View all bikes with **search & filter options**
- **Product details page** with a "Buy Now" button
- **Admin CRUD operations:** Add, update, delete products

💳 **Checkout & Orders**

- Order form with **stock validation**
- **Total price calculation**
- Integrated **SurjoPay payment gateway**
- User can view and track orders in the dashboard
- Admin can manage and update order status

## 🏢 Role-Based Dashboard Implementation

**🎯 Dashboard Features**

**Customer Dashboard**

- View and track orders
- Update user profile
- Update user password

**Admin Dashboard**

- Product Management: Add, update, delete products
- Order Management: View and update order status
- User Management: View all users, update status("blocked", "in-progress")

🎨 **UI/UX & Responsiveness**

- **Responsive Design** (Mobile, Tablet, Desktop)
- Loading states, error handling, and notifications
- **Toast notifications** for important actions

🏗️ **Tech Stack**

- **Frontend:** React, Redux Toolkit, TypeScript, TailwindCSS, Ant Design
- **State Management:** Redux Toolkit & React Query
- 💳 **Secure Payment System:**

## Secure Payment Integration with SurjoPay

This project integrates **SurjoPay**, a reliable and secure payment gateway, to manage customer payments efficiently. Here are the key benefits of using SurjoPay:

- **Encryption:** End-to-end encryption to protect sensitive financial data.
- **Fraud Prevention:** Advanced mechanisms to detect and prevent fraudulent transactions.
- **Seamless Checkout:** Provides a fast and user-friendly checkout experience for customers.
- **Multi-currency Support:** Allows customers to pay using various currencies.
- **Payment Status:** Automatic order status updates based on payment confirmations.

### Payment Flow

1. Customer places an order via `/api/orders`.
2. SurjoPay processes the payment.
3. Upon successful payment, the order is marked as "Paid" in the system.
4. Payment confirmation or failure is handled through secure callbacks.

## Prerequisites

Ensure you have the following installed:

- npm or yarn

## 🚀 Getting Started

## 1 Clone the Repository

```bash
git clone https://github.com/gopalbasak1/Bike-Shop-Frontend
cd Bike-Store-Frontend
```

## 2 Install Dependencies

```bash
npm install
```

## 3 Create a redux baseApi

- Create a redux file and add baseApi configure your API URL:

```bash
http://localhost:5000/api/v1  # Replace with your backend URL
```

## 4 Run the Project

- Development: Start the frontend with hot reloading:

```bash
npm run dev
```

- Production: Build and start the server: Start the server with hot reloading:

```bash
npm run build
npm start:prod
```

### Configuration

## Scripts

- `npm run dev`: Run the fronted in development mode with hot reload.
- `npm run build`: Build the project using TypeScript.

## Project Structure

```bash
📦 bike-store-frontend
├── 📂 src
│   ├── 📂 components       # Reusable UI components
│   ├── 📂 pages            # Application pages (Home, Product, Checkout, etc.)
│   ├── 📂 features         # Redux slices & state management
│   ├── 📂 hooks            # Custom React hooks
│   ├── 📂 services         # API services using RTK Query
│   ├── 📂 utils            # Utility functions
│   ├── 📂 assets           # Images, icons, and static files
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
├── .eslintrc.json          # ESLint configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation

```

## ✅ Best Practices

- Keep components modular and reusable
- Use Redux Toolkit for state management
- Optimize API calls using React Query
- Maintain accessibility (ARIA attributes, semantic HTML)

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.
