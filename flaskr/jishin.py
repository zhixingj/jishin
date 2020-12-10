from flask import Flask, render_template, request, url_for, redirect
from datetime import date, datetime
import os
from flask import Flask, session
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from get_weather import get_weather
app=Flask(__name__)

# Set up database
engine = create_engine("postgres://yhqxvmvkqgjejj:e33d4add729fbd26d9bb18ea8d27a948bbd4e882ebcffd0c561be7dc77e70cc0@ec2-34-237-166-54.compute-1.amazonaws.com:5432/d2i4ri2ikk75is")
db = scoped_session(sessionmaker(bind=engine))

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
# engine = create_engine(os.getenv("DATABASE_URL"))
# db = scoped_session(sessionmaker(bind=engine))
@app.route("/")
def hello():
    return render_template('login.html')



@app.route('/add_task/<string:username>', methods=["GET","POST"])
def add_task(username):        
    if request.method=="POST": #add a task
        user_id =  db.execute(
            "SELECT user_id FROM users WHERE username=:username",{"username":username}
        ).fetchall()
        user_id=user_id[0][0]
        if request.form.get("task")!="":
            db.execute("INSERT INTO tasks (task, owner_id) VALUES (:task, :owner_id)", {"task":request.form.get("task"),"owner_id":user_id})
            db.commit()
    return display_main_page(username)

@app.route("/check_id", methods=["POST"])
def check_id():
    has_user=db.execute(
        "SELECT password from users WHERE (username, password)=(:username, :password)",{"username":request.form.get("username"), "password":request.form.get("password")}
        ).fetchone()
    if has_user:
        return display_main_page(request.form.get("username"))
    else:
        return render_template("register.html")

@app.route("/register", methods=["GET","POST"])
def register():
    if request.method=="POST":
        username = request.form.get("username")
        password = request.form.get("password")
        db.execute(
            "INSERT INTO users (username, password) VALUES (:username, :password)",
            {"username":username, "password":password}
        )
        db.commit()
        return redirect(url_for('.display_main_page',username=username))
    else:
        return render_template("register.html")
    
@app.route("/display_main/<string:username>")
def display_main_page(username):
    weather, feels_like, humidity = get_weather()
    feels_like=round(feels_like-273.15, 1)
    todayDate = date.today()
    weekday=datetime.today().strftime('%A')
    view = 'Today'
    user_id = db.execute(
            "SELECT user_id FROM users WHERE username=:username",{"username":username}
    ).fetchone()
    user_id = user_id[0]
    tasks = db.execute(
        "SELECT task, task_id FROM tasks WHERE owner_id = :user_id", {"user_id":user_id}
    ).fetchall()
    return render_template('hello.html', date=todayDate, view = view, username=username, tasks=tasks, weather=weather, feels_like=feels_like, humidity=humidity, weekday=weekday)

@app.route('/delete_task/<int:task_id>/<string:username>', methods=["GET","POST"])
def delete_task(task_id, username):
    db.execute(
        "DELETE FROM tasks WHERE task_id = :task_id", {"task_id":task_id}
    )
    db.commit()
    return redirect(url_for('.display_main_page',username=username))