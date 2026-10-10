# Smart Campus Exam Management System

A modern university exam management application built with React, TypeScript, Tailwind CSS, and Supabase.

## Features
- Responsive academic dashboard with role-aware navigation
- Secure Supabase authentication and RLS-ready schema
- Student, faculty, academic, examination, hall allocation, and result management
- Notifications, analytics, and printable exam documents

## Stack
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Supabase + PostgreSQL
- Auth: Supabase Auth with role-based checks

## Getting started
1. Copy `.env.example` to `.env.local` and fill in your Supabase project values.
2. Apply the SQL schema in `supabase/schema.sql` to your Supabase project.
3. Install dependencies: `npm install`
4. Run the app: `npm run dev`

## Production notes
- Never expose service-role keys in frontend code.
- Use RLS policies in Supabase and gate protected routes on the backend.
- Use the provided SQL schema for tables, indexes, validation, and audit logs.
