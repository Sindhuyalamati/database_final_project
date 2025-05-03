 🛒 **Fake Store Project – Setup Guide**

This project is a full-stack fake store app built with:

* **Backend:** Python (Flask) + PostgreSQL
* **Frontend:** React

---

## 🚀 **Backend Setup (Flask + PostgreSQL)**

### 1️⃣ **Navigate to the backend folder:**

```bash
cd fake-store-backend
```

### 2️⃣ **Install dependencies:**

Make sure you have Python & `pip` installed. Then run:

```bash
pip install -r requirements.txt
```

### 3️⃣ **Set up the database connection:**

In the `fake-store-backend` folder, create a file named `.env` and add:

```dotenv
DATABASE_URL=postgresql://postgres:2314@localhost:5432/fake_store
SECRET_KEY=your_random_secret_key_here
```

> ✅ Replace `2314` with your PostgreSQL password if different.
> ✅ The database `fake_store` should already exist (you can create it via `psql` if needed).

### 4️⃣ **Run the backend:**

```bash
python app.py
```

The backend should now be running (by default on `http://localhost:5000`).

---

---

## 🎨 **Frontend Setup (React)**

### 1️⃣ **Navigate to the frontend folder:**

```bash
cd fake-store-frontend
```

### 2️⃣ **Install dependencies:**

```bash
npm install
```

### 3️⃣ **Start the React app:**

```bash
npm start
```

This will open the frontend at `http://localhost:3000`.

---

---

## 🛠 **Database (PostgreSQL) Quick Tips**

* **View all tables:**

  In `psql` after connecting to your `fake_store` database:

  ```sql
  \dt
  ```

* **View table structure:**

  ```sql
  \d table_name
  ```

* **Common psql commands:**

  | Command     | Description           |
  | ----------- | --------------------- |
  | `\l`        | List all databases    |
  | `\c dbname` | Connect to a database |
  | `\dt`       | List tables           |
  | `\q`        | Quit psql             |

---

## ✅ **Tech Stack**

* **Frontend:** React + React Context API
* **Backend:** Flask + Flask SQLAlchemy
* **Database:** PostgreSQL
* **Environment:** Python, Node.js, npm

---

## 💡 **Troubleshooting**

* **Error:** `react-scripts is not recognized...`
  ➔ Run `npm install` in the frontend folder before starting.

* **Error:** `DATABASE_URL is not set in the .env file.`
  ➔ Make sure your `.env` file is created correctly in the backend folder.

* **Error:** SQLAlchemy version mismatch
  ➔ Ensure you're using `SQLAlchemy==1.4.x` as per the `requirements.txt`.

