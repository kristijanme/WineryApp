# 🍷 WineryApp

Full-stack Winery Management System built with ASP.NET Core, React, and SQL Server, featuring ERP-style modules for wines, users, and orders with real-time CRUD operations, analytics logic, and modern responsive UI.

**Stack:** 
· Backend: .NET 9 Web API (C#) 
· Frontend: React + Bootstrap + CSS 
· Database: Microsoft SQL Server (MSSQL) + Using SQL Server Management Studio (SSMS)
· Testing: xUnit (tests)

---

## Screenshots of the app functionality
- Home page
![Home page](docs/Home_page.png)
- Wine page
![Wine page](docs/Wines_page.png)
- Wines page after adding wine
![Wines page after adding wine](docs/Adding_wines_page.png)
- Users page
![Users page](docs/Users_page.png)
- Users page after adding user
![Users page after adding user](docs/Adding_users_page.png)
- Orders and order items page
![Orders and order items page](docs/Orders_and_order_item.png)
- Adding person to order items
![Adding person to order items](docs/Adding_order_person.png)
- Adding wines on orders
![Adding wines on orders](docs/Adding_wines_on_orders.png)

---

## Quick features
- Add / Edit / Delete wines  
- Add / Delete users
- Add / Edit / Delete person ordering 
- Add / Delete wines in orders 
- Responsive UI with Bootstrap  
- Unit tests for backend (xUnit)

---

## Quick start (run locally)

### Requirements
- .NET 9 SDK  
- Node.js (>=16)
- The backend and frontend have to run simultaneously on different terminals so that the app has all the functionalities

### Run backend
- From app root
dotnet run --project WineryApp.Api

### Run frontend
- From app root
cd frontend
npm start

### Testing
- From app root
cd WineryApp.Tests
dotnet test



