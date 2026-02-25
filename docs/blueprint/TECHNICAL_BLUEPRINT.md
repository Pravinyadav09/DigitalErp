# 🖨️ Ease Print ERP: Final Technical Blueprint
**Project Version:** 1.0.0 | **Focus:** Factory Floor Control & Financial Intelligence

---

## 🏗️ 1. Dashboard Module (Control Center)
*Designed for the Owner to get a 1-minute business health check.*

### **KPI Widgets (4 Cards)**
- **Total Income (Today):** Green, Currency format (₹). Fetches from paid/partial invoices.
- **Total Expense (Today):** Red, Currency format (₹). Sum of operational costs + raw material purchases.
- **Active Jobs:** Blue, Count. Total jobs where status is NOT 'Completed'.
- **Market Outstanding:** Orange, Currency format. Sum of `Total Bill - Amount Received` from all customers.

### **Visual Analytics**
- **Sales Trend:** Line Chart (X: Months, Y: Revenue) with dual lines for Revenue vs. Profit.
- **Job Status:** Donut Chart showing % share of Pending, Printing, Post-Press, and Done.
- **Machine Distribution:** Pie Chart showing work volume on Digital vs. Offset machines.

---

## 🧠 2. Smart Cost Estimator (The Core Logic)
*Prevents manual calculation errors and leakage.*

### **Input Schema**
- **Paper Selection:** Searchable dropdown linked to Inventory.
- **Job Quantity / Ups / Wastage:** Number inputs to calculate `Total Sheets Required`.
- **Machine Master:** Fetches `Click Rate` (Digital) or `Plate/Hourly Rate` (Offset).
- **Post-Press Rows:** Multi-add rows for Lamination, Binding, Creasing, etc.

### **Backend Logic**
- `Required Sheets = (Quantity / Ups) + Wastage`
- `Base Cost = (Sheets * Paper Unit Price) + (Impressions * Click Rate) + Post-Press Fixed Costs`
- `Final Rate = (Base Cost + Margin %) / Quantity`

---

## 💼 3. CRM & Sales (Order Management)
### **Quotation Lifecycle**
- **QT Table:** Statuses (Draft, Approved, Rejected).
- **Action:** Hammer Icon 🔨 to convert Approved Quotation to a **Job Card**.

### **GST Invoicing**
- **Tax Types:** Automatic split for CGST/SGST (Local) or IGST (Interstate).
- **Payment Lifecycle:** Track Advance -> Partial -> Final Payment with a **Customer Ledger**.
- **Output:** PDF generation with "Send to WhatsApp" button logic.

---

## 🏭 4. Production & Workflow (Factory Control)
### **Job Ticket Details**
- **Auto-Job ID:** e.g., JB-2026-0001.
- **Visuals:** Design Preview Asset + Technical Specs (Size, GSM, Grip, Pinc).
- **Operator View:** "Mark Done" buttons for each stage: `Pre-Press -> Printing -> Post-Press -> QA`.

### **Production Scheduler**
- **Calendar View:** Drag-and-drop or list view of delivery deadlines.
- **Machine Load:** Real-time percentage of machine capacity used for the day.

---

## 📦 5. Inventory Management (Stock Control)
### **Paper Stock**
- **Conversion:** Buy in Kg (₹/kg) -> Auto-convert to Sheets based on Rim Weight/GSM.
- **Auto-Deduction:** Stock reduces automatically when a Job is marked "Printing".

### **Ink & Toner (Yield Tracking)**
- **Compulsory Logging:** Modal asks for **Machine Meter Reading** before issuing new ink.
- **Intelligence:** calculates `Prints per Cartridge` to detect high wastage or toner quality issues.

---

## 📉 6. Machine Management (Meter Audit)
### **Anti-Theft Logic**
- **Daily Log:** Mandatory `Opening` and `Closing` meter readings for every machine.
- **Reconciliation:** System checks: `(Closing - Opening) vs (Total Bill Prints for that Machine)`.
- **Alert:** Displays "Unaccounted Prints" if the machine ran more than the billed quantity.

---

## 🤝 7. Outsourcing Module
- **Vendor Portal:** List of CTP, Binding, and Flex vendors.
- **PO Generation:** Technical PO with `Gripper Margin`, `Plate Size`, and `Dot Details` to avoid errors.

---

## 💰 8. Finance & Expense Module
- **Expense Categories:** Record Rent, Electricity, Tea/Pantry, Staff Wages.
- **Purchase Ledger:** Log raw material buying (Paper/Ink) to track **GST Input Tax Credit**.
- **Net Profit Report:** `Total Revenue - (Raw Material + Operational Expenses + Machine Depreciation)`.

---

## 🛡️ 9. Security & Access Control
- **Admin (Owner):** Full visibility of financials.
- **Operator:** View active Jobs only, Update Status. Cannot see "Income" or "Profit".
- **Designer:** Upload design assets, check job specs. No financial or stock access.

---

## 🛠️ 10. Developer's Code Checklist
- [ ] **Frontend:** React/Next.js for speed.
- [ ] **Theming:** Shadcn/ui (Premium/Modern look).
- [ ] **PDF Engine:** Client-side (jspdf) or Server-side (Puppeteer) for Job Cards/Invoices.
- [ ] **Database:** Relation DB (PostgreSQL) for Ledger accuracy.
- [ ] **Responsiveness:** Mobile UI for floor operators.
- [ ] **Real-time:** WebSockets (optional) for Live Dashboard updates.
