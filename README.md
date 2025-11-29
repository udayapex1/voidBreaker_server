# VoidBreaker Server API Documentation

A comprehensive backend API for managing educational institutions with support for users, classes, departments, subjects, schedules, and events.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [User Endpoints](#user-endpoints)
- [Teacher Endpoints](#teacher-endpoints)
- [Class Endpoints](#class-endpoints)
- [Department Endpoints](#department-endpoints)
- [Subject Endpoints](#subject-endpoints)
- [Schedule Endpoints](#schedule-endpoints)
- [Event Endpoints](#event-endpoints)

---

## Overview

### Base URL
```
http://localhost:5000
```

### API Prefix
All endpoints use the following prefixes:
- `/api/users` - User management
- `/api/teachers` - Teacher management
- `/api/classes` - Class management
- `/api/departments` - Department management
- `/api/subjects` - Subject management
- `/api/schedules` - Schedule management
- `/api/events` - Event management

### Authentication
Most endpoints require JWT authentication via bearer token in the Authorization header.

---

## Authentication

### Authorization Header
```
Authorization: Bearer <jwt_token>
```

### User Roles
- `student` - Student user role
- `teacher` - Teacher user role
- `admin` - Administrator role

### Protected Endpoints
Endpoints marked with 🔒 require authentication. Some endpoints require specific roles (Admin, Teacher/Admin).

---

## User Endpoints

### 1. Register User
**Endpoint:** `POST /api/users/register`

**Authentication:** ❌ Not required

**Description:** Register a new user with profile photo

**Required Fields:**
- `name` (String) - User's full name
- `email` (String) - User's email address (unique, lowercase)
- `password` (String) - User's password
- `role` (String) - User role: `student`, `teacher`, or `admin`
- `college_id` (String) - College ID (unique)
- `profile_photo` (File) - Profile photo file (required)

**Optional Fields:**
- `year` (Number) - Academic year
- `section` (String) - Class section
- `skills` (Array[String]) - Array of skill strings
- `department_id` (ObjectId) - Reference to Department
- `class_id` (ObjectId) - Reference to Class

**Allowed Photo Formats:**
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/webp`

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "password=securepassword123" \
  -F "role=student" \
  -F "college_id=COLLEGE123" \
  -F "year=2" \
  -F "section=A" \
  -F "profile_photo=@path/to/photo.jpg"
```

**Success Response (200):**
```json
{
  "message": "User registered successfully.",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "college_id": "COLLEGE123",
    "year": 2,
    "section": "A",
    "profile_photo": "https://cloudinary_url.jpg",
    "skills": [],
    "createdAt": "2025-11-29T10:00:00Z",
    "updatedAt": "2025-11-29T10:00:00Z"
  }
}
```

---

### 2. Login User
**Endpoint:** `POST /api/users/login`

**Authentication:** ❌ Not required

**Description:** Authenticate user and receive JWT token

**Required Fields:**
- `email` (String) - User's email
- `password` (String) - User's password

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

### 3. Get All Users
**Endpoint:** `GET /api/users/`

**Authentication:** ❌ Not required

**Description:** Retrieve list of all users

**Example Request:**
```bash
curl http://localhost:5000/api/users/
```

**Success Response (200):**
```json
{
  "users": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "college_id": "COLLEGE123"
    }
  ]
}
```

---

### 4. Get My Profile
**Endpoint:** `GET /api/users/me`

**Authentication:** 🔒 Required

**Description:** Get authenticated user's profile

**Example Request:**
```bash
curl http://localhost:5000/api/users/me \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Profile fetched successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    }
  }
}
```

---

### 5. Logout User
**Endpoint:** `POST /api/users/logout`

**Authentication:** 🔒 Required

**Description:** Logout user and invalidate token

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/users/logout \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 6. Test API
**Endpoint:** `GET /api/users/test`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Test endpoint for teacher/admin users

**Example Request:**
```bash
curl http://localhost:5000/api/users/test \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Teacher Endpoints

### 1. Get All Teachers
**Endpoint:** `GET /api/teachers/allTeachers`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Retrieve list of all teachers

**Example Request:**
```bash
curl http://localhost:5000/api/teachers/allTeachers \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "teachers": [
    {
      "_id": "teacher_id",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "teacher",
      "college_id": "TEACHER001"
    }
  ]
}
```

---

## Class Endpoints

### 1. Create Class
**Endpoint:** `POST /api/classes/createClass`

**Authentication:** 🔒 Required (Admin only)

**Description:** Create a new class

**Required Fields:**
- `year` (Number) - Academic year
- `section` (String) - Class section (e.g., "A", "B", "C")
- `department_id` (ObjectId) - Reference to Department

**Optional Fields:**
- `class_teacher_id` (ObjectId) - Reference to Teacher (User with teacher role)

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/classes/createClass \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2,
    "section": "A",
    "department_id": "department_id_here",
    "class_teacher_id": "teacher_id_here"
  }'
```

**Success Response (201):**
```json
{
  "message": "Class created successfully",
  "class": {
    "_id": "class_id",
    "year": 2,
    "section": "A",
    "department_id": "department_id",
    "class_teacher_id": "teacher_id",
    "createdAt": "2025-11-29T10:00:00Z",
    "updatedAt": "2025-11-29T10:00:00Z"
  }
}
```

---

### 2. Get All Classes
**Endpoint:** `GET /api/classes/getAllClasses`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Retrieve list of all classes

**Example Request:**
```bash
curl http://localhost:5000/api/classes/getAllClasses \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "classes": [
    {
      "_id": "class_id",
      "year": 2,
      "section": "A",
      "department_id": "department_id",
      "class_teacher_id": "teacher_id",
      "createdAt": "2025-11-29T10:00:00Z"
    }
  ]
}
```

---

## Department Endpoints

### 1. Create Department
**Endpoint:** `POST /api/departments/createDepartment`

**Authentication:** 🔒 Required (Admin only)

**Description:** Create a new department

**Required Fields:**
- `department_name` (String) - Name of the department (trimmed)

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/departments/createDepartment \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "department_name": "Computer Science"
  }'
```

**Success Response (201):**
```json
{
  "message": "Department created successfully",
  "department": {
    "_id": "department_id",
    "department_name": "Computer Science",
    "createdAt": "2025-11-29T10:00:00Z",
    "updatedAt": "2025-11-29T10:00:00Z"
  }
}
```

---

### 2. Get All Departments
**Endpoint:** `GET /api/departments/getAllDepartments`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Retrieve list of all departments

**Example Request:**
```bash
curl http://localhost:5000/api/departments/getAllDepartments \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "departments": [
    {
      "_id": "department_id",
      "department_name": "Computer Science",
      "createdAt": "2025-11-29T10:00:00Z",
      "updatedAt": "2025-11-29T10:00:00Z"
    }
  ]
}
```

---

## Subject Endpoints

### 1. Create Subject
**Endpoint:** `POST /api/subjects/createSubject`

**Authentication:** 🔒 Required (Admin only)

**Description:** Create a new subject

**Required Fields:**
- `subject_name` (String) - Name of the subject (trimmed)
- `subject_code` (String) - Unique subject code (uppercase, trimmed, unique)

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/subjects/createSubject \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "subject_name": "Data Structures",
    "subject_code": "CS101"
  }'
```

**Success Response (201):**
```json
{
  "message": "Subject created successfully",
  "subject": {
    "_id": "subject_id",
    "subject_name": "Data Structures",
    "subject_code": "CS101",
    "createdAt": "2025-11-29T10:00:00Z",
    "updatedAt": "2025-11-29T10:00:00Z"
  }
}
```

---

### 2. Get All Subjects
**Endpoint:** `GET /api/subjects/getAllSubjects`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Retrieve list of all subjects

**Example Request:**
```bash
curl http://localhost:5000/api/subjects/getAllSubjects \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "subjects": [
    {
      "_id": "subject_id",
      "subject_name": "Data Structures",
      "subject_code": "CS101",
      "createdAt": "2025-11-29T10:00:00Z"
    }
  ]
}
```

---

## Schedule Endpoints

### 1. Create Schedule
**Endpoint:** `POST /api/schedules/createSchedule`

**Authentication:** 🔒 Required (Admin only)

**Description:** Create a class schedule

**Required Fields:**
- `day` (Number) - Day of week (0-6, where 0 = Sunday, 6 = Saturday)
- `start_time` (String) - Class start time (e.g., "09:00")
- `end_time` (String) - Class end time (e.g., "10:00")
- `class_id` (ObjectId) - Reference to Class
- `subject_id` (ObjectId) - Reference to Subject
- `teacher_id` (ObjectId) - Reference to Teacher (User)

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/schedules/createSchedule \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "day": 1,
    "start_time": "09:00",
    "end_time": "10:00",
    "class_id": "class_id_here",
    "subject_id": "subject_id_here",
    "teacher_id": "teacher_id_here"
  }'
```

**Success Response (201):**
```json
{
  "message": "Schedule created successfully",
  "schedule": {
    "_id": "schedule_id",
    "day": 1,
    "start_time": "09:00",
    "end_time": "10:00",
    "class_id": "class_id",
    "subject_id": "subject_id",
    "teacher_id": "teacher_id",
    "createdAt": "2025-11-29T10:00:00Z",
    "updatedAt": "2025-11-29T10:00:00Z"
  }
}
```

**Day Mapping:**
- `0` = Sunday
- `1` = Monday
- `2` = Tuesday
- `3` = Wednesday
- `4` = Thursday
- `5` = Friday
- `6` = Saturday

---

### 2. Get All Schedules
**Endpoint:** `GET /api/schedules/getAllSchedules`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Retrieve list of all class schedules

**Example Request:**
```bash
curl http://localhost:5000/api/schedules/getAllSchedules \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "schedules": [
    {
      "_id": "schedule_id",
      "day": 1,
      "start_time": "09:00",
      "end_time": "10:00",
      "class_id": "class_id",
      "subject_id": "subject_id",
      "teacher_id": "teacher_id",
      "createdAt": "2025-11-29T10:00:00Z"
    }
  ]
}
```

---

## Event Endpoints

### 1. Create Event
**Endpoint:** `POST /api/events/createEvent`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Create a new event

**Required Fields:**
- `title` (String) - Event title (trimmed)
- `description` (String) - Event description (trimmed)
- `start_date` (Date) - Event start date (ISO format: "YYYY-MM-DDTHH:mm:ss.sssZ")
- `end_date` (Date) - Event end date (ISO format: "YYYY-MM-DDTHH:mm:ss.sssZ")
- `location` (String) - Event location

**Optional Fields:**
- `media_url` (String) - URL to event media (image/video)

**Note:** `created_by` is automatically set to the authenticated user's ID

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/events/createEvent \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Annual Sports Day",
    "description": "Join us for the annual sports day celebration",
    "start_date": "2025-12-15T10:00:00.000Z",
    "end_date": "2025-12-15T17:00:00.000Z",
    "location": "Sports Ground",
    "media_url": "https://example.com/image.jpg"
  }'
```

**Success Response (201):**
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "event_id",
    "title": "Annual Sports Day",
    "description": "Join us for the annual sports day celebration",
    "start_date": "2025-12-15T10:00:00.000Z",
    "end_date": "2025-12-15T17:00:00.000Z",
    "location": "Sports Ground",
    "media_url": "https://example.com/image.jpg",
    "created_by": "user_id",
    "createdAt": "2025-11-29T10:00:00Z",
    "updatedAt": "2025-11-29T10:00:00Z"
  }
}
```

---

### 2. Get All Events
**Endpoint:** `GET /api/events/getAllEvents`

**Authentication:** 🔒 Required (Teacher or Admin only)

**Description:** Retrieve list of all events

**Example Request:**
```bash
curl http://localhost:5000/api/events/getAllEvents \
  -H "Authorization: Bearer <jwt_token>"
```

**Success Response (200):**
```json
{
  "events": [
    {
      "_id": "event_id",
      "title": "Annual Sports Day",
      "description": "Join us for the annual sports day celebration",
      "start_date": "2025-12-15T10:00:00.000Z",
      "end_date": "2025-12-15T17:00:00.000Z",
      "location": "Sports Ground",
      "media_url": "https://example.com/image.jpg",
      "created_by": "user_id",
      "createdAt": "2025-11-29T10:00:00Z"
    }
  ]
}
```

---

## Error Responses

### Common Error Codes

**400 - Bad Request**
```json
{
  "message": "Please fill required fields"
}
```

**401 - Unauthorized**
```json
{
  "message": "Authentication required"
}
```

**403 - Forbidden**
```json
{
  "message": "Insufficient permissions"
}
```

**409 - Conflict**
```json
{
  "message": "User already exists"
}
```

**500 - Server Error**
```json
{
  "message": "Server error"
}
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing
- **cloudinary** - Image hosting
- **express-fileupload** - File upload handling
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **cookie-parser** - Cookie parsing

---

## Getting Started

### Installation

```bash
npm install
```

### Start Server

```bash
npm start
```

The server will run on `http://localhost:5000`

---

## Notes

- All timestamps are in ISO 8601 format
- Passwords are hashed using bcrypt (10 salt rounds)
- Profile photos are stored on Cloudinary
- User passwords and tokens are not included in responses
- Admin-only endpoints require `role: "admin"`
- Teacher/Admin endpoints require `role: "teacher"` or `role: "admin"`

---

**Last Updated:** November 29, 2025
