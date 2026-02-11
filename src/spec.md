# Specification

## Summary
**Goal:** Build a professional insurance advisor informational website that explains available insurance products and captures inquiries online, with an admin-only area to review submitted inquiries.

**Planned changes:**
- Create a multi-section marketing site with one clear section/page for each insurance type: term (including HDFC Life), health, vehicle, property, stock, group mediclaim, and other products.
- Add concise English copy per insurance type describing coverage, who it is for, and what info prospects should prepare before inquiring.
- Add a partner/available insurers section that includes “HDFC Life” and supports listing multiple companies.
- Implement an online inquiry form (name, phone, optional email, insurance type select, optional preferred company, message) with validation and on-page success confirmation/reset.
- Persist inquiries in a single Motoko actor with server-generated id and createdAt timestamp; provide APIs to create and (admin-only) list inquiries in reverse chronological order.
- Add an admin dashboard page requiring Internet Identity login to view inquiries (read-only), filter by insurance type, and open a detail view.
- Apply a cohesive modern visual theme (colors, typography, spacing, components) consistently across marketing sections, inquiry form, and admin dashboard.
- Add and use generated static image assets under `frontend/public/assets/generated` (e.g., hero/section visuals).

**User-visible outcome:** Visitors can browse clearly organized insurance information and submit an inquiry online; the advisor can sign in with Internet Identity to view, filter, and read inquiry details in an admin dashboard.
