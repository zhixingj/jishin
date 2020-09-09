from flask import Flask, render_template, request
from datetime import date
app=Flask(__name__)
@app.route('/')
def hello():
    todayDate = date.today()
    view = 'Today'
    return render_template('hello.html', date=todayDate, view = view)