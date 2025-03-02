import sqlite3
import os

DATABASE_PATH = os.path.join(os.getcwd(), 'db.sqlite3')

def get_db():
    return sqlite3.connect(DATABASE_PATH)

def init_database():
    with get_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY,
                email TEXT UNIQUE,
                password TEXT,
                login TEXT UNIQUE,
                name TEXT,
                lastName TEXT
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Orders (
                id INTEGER PRIMARY KEY,
                email TEXT,
                fullName TEXT,
                institution TEXT,
                course TEXT,
                phone TEXT,
                medicalData TEXT,
                status TEXT,
                result TEXT,
                description TEXT
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Students (
                id INTEGER PRIMARY KEY,
                email TEXT UNIQUE,
                timestamp INTEGER
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Teachers (
                id INTEGER PRIMARY KEY,
                email TEXT UNIQUE,
                timestamp INTEGER
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Auths (
                id INTEGER PRIMARY KEY,
                email TEXT,
                timestamp INTEGER
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS UnAuths (
                id INTEGER PRIMARY KEY,
                email TEXT,
                timestamp INTEGER
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Clicks (
                id INTEGER PRIMARY KEY,
                email TEXT,
                nameButton TEXT,
                timestamp INTEGER
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Logs (
                id INTEGER PRIMARY KEY,
                email TEXT,
                message TEXT,
                timestamp INTEGER
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Admins (
                id INTEGER PRIMARY KEY,
                email TEXT UNIQUE
            )
        """)
        db.execute("""
            CREATE TABLE IF NOT EXISTS Notifications (
                id INTEGER PRIMARY KEY,
                email TEXT,
                message TEXT,
                timestamp INTEGER
            )
        """)
        db.commit()

def get_users():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Users")
        return cursor.fetchall()

def get_user(email: str, password: str):
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Users WHERE email = ? AND password = ?", (email, password))
        return cursor.fetchone()

def create_user(email: str, password: str, login: str, name: str, last_name: str):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Users (email, password, login, name, lastName) VALUES (?, ?, ?, ?, ?)",
                       (email, password, login, name, last_name))
            return True
    except sqlite3.IntegrityError:
        return False

def remove_user(email: str, password: str):
    with get_db() as db:
        cursor = db.execute("DELETE FROM Users WHERE email = ? AND password = ?", (email, password))
        return cursor.rowcount > 0
    
def get_orders(): 
    with get_db() as db: 
        cursor = db.execute("SELECT * FROM Orders") 
        return cursor.fetchall()

def get_email_orders(email: str):
    with get_db() as db: 
        cursor = db.execute("SELECT * FROM Orders WHERE email = ?", (email, )) 
        return cursor.fetchall()
    
def create_order(email: str, fullName: str, institution: str, course: str, phone: str, medicalData: str, status: str, description: str): 
    try: 
        with get_db() as db: 
            cur = db.execute("INSERT INTO Orders (email, fullName, institution, course, phone, medicalData, status, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                (email, fullName, institution, course, phone, medicalData, status, description)
            )
            order_id = cur.lastrowid
            return order_id
    except Exception as e: 
        print(f"Error creating order: {e}") 
        return False
    
def edit_order(id: int, result: str, status: str): 
    try: 
        print((status, result, id, ))
        with get_db() as db: 
            db.execute("UPDATE Orders SET status = ?, result = ? WHERE id = ?", 
                (status, result, id, )
            ) 
            return True
    except Exception as e: 
        print(f"Error editing order: {e}") 
        return False
    
def create_student(email: str, timestamp: int):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Students (email, timestamp) VALUES (?, ?)", (email, timestamp))
            return True
    except sqlite3.IntegrityError:
        return False

def remove_student(email: str):
    with get_db() as db:
        cursor = db.execute("DELETE FROM Students WHERE email = ?", (email, ))
        return cursor.rowcount > 0
    
def get_students():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Students")
        return cursor.fetchall()

def create_teacher(email: str, timestamp: int):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Teachers (email, timestamp) VALUES (?, ?)", (email, timestamp))
            return True
    except sqlite3.IntegrityError:
        return False

def remove_teacher(email: str):
    with get_db() as db:
        cursor = db.execute("DELETE FROM Teachers WHERE email = ?", (email,))
        return cursor.rowcount > 0
    
def get_teachers():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Teachers")
        return cursor.fetchall()

def create_auth(email: str, timestamp: int):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Auths (email, timestamp) VALUES (?, ?)", (email, timestamp))
            return True
    except sqlite3.IntegrityError:
        return False

def get_auths():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Auths")
        return cursor.fetchall()

def create_unauth(email: str, timestamp: int):
    try:
        with get_db() as db:
            db.execute("INSERT INTO UnAuths (email, timestamp) VALUES (?, ?)", (email, timestamp))
            return True
    except sqlite3.IntegrityError:
        return False

def get_unauths():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM UnAuths")
        return cursor.fetchall()

def create_click(email: str, nameButton: str, timestamp: int):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Clicks (email, nameButton, timestamp) VALUES (?, ?, ?)", (email, nameButton, timestamp))
            return True
    except sqlite3.IntegrityError:
        return False

def get_clicks():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Clicks")
        return cursor.fetchall()

def create_log(email: str, message: str, timestamp: int):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Logs (email, message, timestamp) VALUES (?, ?, ?)", (email, message, timestamp))
            return True
    except sqlite3.IntegrityError:
        return False

def get_logs():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Logs")
        return cursor.fetchall()
    
def create_admin(email: str):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Admins (email) VALUES (?)", (email,))
            return True
    except sqlite3.IntegrityError:
        return False

def get_admins():
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Admins")
        return cursor.fetchall()

def create_notification(email: str, message: str, timestamp: int):
    try:
        with get_db() as db:
            db.execute("INSERT INTO Notifications (email, message, timestamp) VALUES (?, ?, ?)", 
                       (email, message, timestamp))
            return True
    except sqlite3.IntegrityError:
        return False

def get_notifications(email: str):
    with get_db() as db:
        cursor = db.execute("SELECT * FROM Notifications WHERE email = ?", (email, ))
        return cursor.fetchall()