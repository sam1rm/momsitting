from app import app
from flask import render_template

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/profile/')
def profile():
	return render_template('profile.html')

@app.route('/search-list/')
def search_list():
    return render_template('search_list.html')

@app.route('/search/')
def search():
    return render_template('search.html')

@app.route('/settings/')
def settings():
    return render_template('settings.html')

@app.route('/step1/')
def step1():
    return render_template('step1.html')

@app.route('/step2/')
def step2():
    return render_template('step2.html')