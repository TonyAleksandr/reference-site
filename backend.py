from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import *
import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    email: str
    password: str
    login: str
    name: str
    lastName: str

class Order(BaseModel):
    id: int
    email: str
    fullName: str
    institution: str
    course: str
    phone: str
    medicalData: str
    status: str
    description: str

@app.options("/users/")
async def options_users():
    response = JSONResponse(content={"message": "CORS preflight request"})
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return response

@app.post("/users/")
async def create_new_user(req: Request):
    user = await req.json()
    created = create_user(user["email"], user["password"], user["login"], user["name"], user["lastName"])
    if not created:
        raise HTTPException(status_code=400, detail="Ошибка создания пользователя: адрес электронной почты или логин уже существуют")
    return JSONResponse(content={"message": "Пользователь успешно создан"})

@app.get("/users/")
async def read_users():
    users = get_users()
    return users

@app.get("/user/{id}")
async def read_user(id: int):
    users = get_users()
    user = next((user for user in users if user[0] == id), None)
    return user

@app.get("/users/{email}/{password}")
async def read_user(email: str, password: str):
    user = get_user(email, password)
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return {"user": user}

@app.delete("/users/{email}/{password}")
async def delete_user(email: str, password: str):
    removed = remove_user(email, password)
    if not removed:
        raise HTTPException(status_code=404, detail="Пользователь не найден или не может быть удален")
    return {"message": "Пользователь успешно удален"}

@app.get("/orders/{email}")
async def read_orders(email: str):
    return get_orders() if email == "all" else get_email_orders(email)

@app.post("/order/")
async def create_new_order(req: Request):
    data = await req.json()
    created = create_order(data["email"], data["fullName"], data["institution"], data["course"], data["phone"], data["medicalData"], data["status"], data["description"])
    if not created:
        raise HTTPException(status_code=400, detail="Ошибка создания заказа")
    return {"message": "Заказ успешно создан", "id": created}

@app.put("/order/")
async def put_order(req: Request):
    data = await req.json()
    print(data)
    if "id" not in data:
        raise HTTPException(status_code=400, detail="ID отсутствует в запросе")
    edit = edit_order(data["id"], data["result"], data["status"])
    if not edit:
        raise HTTPException(status_code=400, detail="Ошибка изменения заказа")
    return {"message": "Заказ успешно изменён"}


@app.post("/students/")
async def create_student_api(req: Request):
    student = await req.json()
    created = create_student(student["email"], int(datetime.datetime.now().timestamp()))
    if not created:
        raise HTTPException(status_code=400, detail="Ошибка создания студента: адрес электронной почты уже существует")
    return JSONResponse(content={"message": "Студент успешно создан"})

@app.delete("/students/")
async def delete_student_api(req: Request):
    student = await req.json()
    created = remove_student(student["email"])
    if not created:
        raise HTTPException(status_code=400, detail="Ошибка удаления студента: адреса электронной почты уже нет")
    return JSONResponse(content={"message": "Студент успешно удалён"})

@app.get("/students/")
async def read_students():
    students = get_students()
    return students

@app.get("/student/{email}")
async def read_student(email: str):
    students = get_students()
    student = next((student for student in students if student[1] == email), None)
    return student

@app.get("/admins/")
async def read_admins():
    admins = get_admins()
    return admins

@app.post("/teachers/")
async def create_teacher_api(req: Request):
    teacher = await req.json()
    created = create_teacher(teacher["email"], int(datetime.datetime.now().timestamp()))
    if not created:
        raise HTTPException(status_code=400, detail="Ошибка создания учителя: адрес электронной почты уже существует")
    return JSONResponse(content={"message": "Учитель успешно создан"})

@app.delete("/teachers/")
async def delete_teacher_api(req: Request):
    teacher = await req.json()
    removed = remove_teacher(teacher["email"])
    if not removed:
        raise HTTPException(status_code=400, detail="Ошибка удаления учителя: адреса электронной почты нет")
    return JSONResponse(content={"message": "Учитель успешно удалён"})

@app.get("/teachers/")
async def read_teachers():
    teachers = get_teachers()
    return teachers

@app.get("/teacher/{email}")
async def read_teacher(email: str):
    teachers = get_teachers()
    teacher = next((teacher for teacher in teachers if teacher[1] == email), None)
    return teacher

@app.post("/notification/")
async def create_notification_api(req: Request):
    notification = await req.json()
    created = create_notification(notification["email"], notification["message"], int(datetime.datetime.now().timestamp()))
    if not created:
        raise HTTPException(status_code=400, detail="Ошибка создания уведомления")
    return JSONResponse(content={"message": "Уведомление успешно создано"})

@app.get("/notifications/{email}")
async def read_notifications(email: str):
    notifications = get_notifications(email)
    return notifications

@app.get("/logs/")
async def get_all_logs():
    return get_logs()

@app.post("/log/")
async def create_log_api(req: Request):
    data = await req.json()
    status = create_log(data["email"], data["message"], int(datetime.datetime.now().timestamp()))
    if not status:
        raise HTTPException(status_code=400, detail="Ошибка создания лога")
    return JSONResponse(content={"message": "Лог успешно создан", "logs": get_logs()})


@app.post("/unauth/")
async def create_unauth_api(req: Request):
    data = await req.json()
    status = create_unauth(data["email"],int(datetime.datetime.now().timestamp()))
    if not status:
        raise HTTPException(status_code=400, detail="Ошибка создания лога")
    return JSONResponse(content={"message": "Лог успешно создан"})


@app.post("/auth/")
async def create_auth_api(req: Request):
    data = await req.json()
    status = create_auth(data["email"], int(datetime.datetime.now().timestamp()))
    if not status:
        raise HTTPException(status_code=400, detail="Ошибка создания лога")
    return JSONResponse(content={"message": "Лог успешно создан"})


@app.post("/click/")
async def create_click_api(req: Request):
    data = await req.json()
    status = create_click(data["email"], data["nameButton"], int(datetime.datetime.now().timestamp()))
    if not status:
        raise HTTPException(status_code=400, detail="Ошибка создания лога")
    return JSONResponse(content={"message": "Лог успешно создан"})




if __name__ == "__main__":
    init_database()
    import uvicorn
    uvicorn.run(app)
