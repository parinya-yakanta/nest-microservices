🚀 Subport Microservices

ระบบตัวอย่าง NestJS Monorepo + Microservices Architecture
สื่อสารกันผ่าน RabbitMQ และใช้ PostgreSQL เป็นฐานข้อมูล

มี Swagger สำหรับทดสอบ API ได้ทันที

🏗 Project Structure

apps/

 ├── api-gateway      → รับ HTTP Request

 ├── auth-service     → Register / Login / JWT

 └── users-service    → จัดการข้อมูลผู้ใช้
 
🧱 Technology Stack

NestJS (Monorepo Pattern)

RabbitMQ (Message Broker)

PostgreSQL

JWT Authentication (RS256)

Swagger Documentation

🚀 Project Setup
1️⃣ Install Dependencies
npm install
2️⃣ Create PostgreSQL Databases

สร้างฐานข้อมูลตามที่ระบุใน .env.example

ตัวอย่าง:

CREATE DATABASE auth_service;
CREATE DATABASE users_service;

ตรวจสอบชื่อ database ให้ตรงกับค่าในไฟล์ .env

3️⃣ Setup Environment Variables

คัดลอกไฟล์ตัวอย่าง:

cp .env.example .env

จากนั้นแก้ไขค่าต่าง ๆ ใน .env ให้ตรงกับเครื่องของคุณ เช่น:

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

RMQ_URL=amqp://localhost:5672
4️⃣ Start All Services

รันแต่ละ service แยกกัน:

nest start api-gateway
nest start users-service
nest start auth-service

หรือถ้าใช้ development mode:

npm run start:dev api-gateway
npm run start:dev users-service
npm run start:dev auth-service
🧱 Tech Stack

NestJS (Monorepo Pattern + Microservices)

RabbitMQ (Message Broker)

PostgreSQL

Swagger (API Documentation พร้อมตัวอย่าง Mock Data)

📚 API Testing (Swagger)

หลังจากรันโปรเจคแล้ว เปิด:

http://localhost:3000/docs

สามารถทดสอบ API ได้ทันทีผ่าน Swagger UI

🧪 Test Flow Example
Step 1 — Register

ไปที่ POST /api/v1/auth/register

กด Try it out

กรอกข้อมูล

กด Execute

หากสำเร็จ จะได้ response success

Step 2 — Login

ไปที่ POST /api/v1/auth/login

กด Try it out

กด Execute

ระบบจะส่งกลับ access_token

Copy token ไปใช้ในขั้นตอนถัดไป

Step 3 — Authorize

กดปุ่ม Authorize บน Swagger

วาง token ในรูปแบบ:

Bearer <your_token>
Step 4 — Test Users API

ไปที่ Tag Users

เลือก endpoint ที่ต้องการทดสอบ

กด Try it out → Execute

🏗 System Overview

ใช้ NestJS แบบ Monorepo

แยกบริการเป็น microservices

สื่อสารกันผ่าน RabbitMQ

ทดสอบ API ได้แบบ One-Click ผ่าน Swagger