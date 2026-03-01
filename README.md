# 🚀 Subport Microservices

ตัวอย่างระบบ **NestJS Monorepo + Microservices Architecture**  
สื่อสารกันผ่าน **RabbitMQ** และใช้ **PostgreSQL** เป็นฐานข้อมูล  

มี **Swagger** สำหรับทดสอบ API ได้ทันที

---

# 🏗 Project Structure

```text
apps/
 ├── api-gateway      # รับ HTTP Request (HTTP Entry Point)
 ├── auth-service     # Register / Login / JWT Authentication
 └── users-service    # จัดการข้อมูลผู้ใช้
```

---

# 🧱 Technology Stack

- **NestJS** (Monorepo Pattern + Microservices)
- **RabbitMQ** (Message Broker)
- **PostgreSQL**
- **JWT Authentication (RS256)**
- **Swagger Documentation**

---

# ⚙️ Project Setup

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Create PostgreSQL Databases

สร้างฐานข้อมูลตามที่ระบุใน `.env.example`

```sql
CREATE DATABASE auth_service;
CREATE DATABASE users_service;
```

> ตรวจสอบชื่อ database ให้ตรงกับค่าในไฟล์ `.env`

---

## 3️⃣ Setup Environment Variables

คัดลอกไฟล์ตัวอย่าง:

```bash
cp .env.example .env
```

แก้ไขค่าใน `.env`:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

RMQ_URL=amqp://localhost:5672
```

---

## 4️⃣ Start All Services

รันแต่ละ service แยกกัน:

```bash
nest start api-gateway
nest start users-service
nest start auth-service
```

หรือแบบ development mode:

```bash
npm run start:dev api-gateway
npm run start:dev users-service
npm run start:dev auth-service
```

---

# 📚 API Testing (Swagger)

หลังจากรันโปรเจคแล้ว เปิด:

```
http://localhost:3000/docs
```

---

# 🧪 Test Flow Example

## ✅ Step 1 — Register

- ไปที่ `POST /api/v1/auth/register`
- กด **Try it out**
- กรอกข้อมูล
- กด **Execute**
- ควรได้ response success

---

## ✅ Step 2 — Login

- ไปที่ `POST /api/v1/auth/login`
- กด **Execute**
- จะได้ `access_token`
- Copy token

---

## ✅ Step 3 — Authorize

- กดปุ่ม **Authorize**
- วาง token ในรูปแบบ:

```
Bearer <your_token>
```

---

## ✅ Step 4 — Test Users API

- ไปที่ Tag **Users**
- เลือก endpoint ที่ต้องการทดสอบ
- กด **Try it out → Execute**

---

# 🏗 System Overview

- ใช้ NestJS แบบ Monorepo
- แยกบริการเป็น Microservices
- สื่อสารกันผ่าน RabbitMQ
- ทดสอบ API ได้แบบ One-Click ผ่าน Swagger

---

# 🚀 Deployment Strategy

ระบบนี้สามารถ deploy ได้หลายรูปแบบ ขึ้นอยู่กับระดับของระบบ (Scale)

| Scale            | วิธี Deploy                          | เหมาะกับ |
|------------------|--------------------------------------|----------|
| Dev              | `nest start`                        | พัฒนาในเครื่อง |
| VPS เครื่องเดียว | Docker Compose                      | ระบบขนาดเล็ก / Staging |
| Production       | Docker + Reverse Proxy (Nginx/Kong) | ระบบใช้งานจริง |
| Enterprise       | Kubernetes + API Gateway            | ระบบขนาดใหญ่ / High Availability |

---

## 🔹 Dev

รันแยก service ด้วยคำสั่ง:

```bash
nest start api-gateway
nest start auth-service
nest start users-service
```

เหมาะสำหรับการพัฒนาและทดสอบในเครื่อง

---

## 🔹 VPS เครื่องเดียว

ใช้ **Docker Compose** รวมทุก service:

```bash
docker compose up -d --build
```

เหมาะสำหรับระบบขนาดเล็กหรือ Staging

---

## 🔹 Production

- แยก Docker container ต่อ service
- ใช้ Reverse Proxy เช่น Nginx หรือ Kong
- เปิด HTTPS (Let's Encrypt)
- แยก Database และ RabbitMQ ออกจาก container หลัก

เหมาะสำหรับระบบที่มีผู้ใช้งานจริง

---

## 🔹 Enterprise

- ใช้ Kubernetes (K8s)
- ใช้ External API Gateway (เช่น Kong / APISIX)
- ใช้ Managed Database และ Managed RabbitMQ
- รองรับ Auto Scaling และ High Availability

เหมาะสำหรับระบบขนาดใหญ่ หรือระบบองค์กร