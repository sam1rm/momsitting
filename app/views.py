from app import app
from flask import render_template, session, url_for, \
redirect, jsonify, request, flash, make_response
from app.models import User
from app.database import db_session
import boto
from hashlib import md5

@app.route('/', methods=('GET','POST'))
def index():
    user = None
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
    return render_template('new_index.html', \
        logged_in = session.get('user_id'), user=user)

@app.route('/terms/')
def tos():
    user = None
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
    return render_template('tos.html', user=user)

@app.route('/privacy/')
def privacy():
    user = None
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
    return render_template('privacy.html', user=user)

@app.route('/download/')
def download():
    if session.get('admin'): 
        csv = write_to_csv()
        # We need to modify the response, so the first thing we 
        # need to do is create a response out of the CSV string
        response = make_response(csv)
        # This is the key: Set the right header for the response
        # to be downloaded, instead of just printed on the browser
        response.headers["Content-Disposition"] = "attachment; filename=momsitting_data.csv"
        return response
    else:
        return redirect(url_for('index'))

@app.route('/create-user/', methods=('GET', 'POST'))
def create_user():
    if request.method == "POST":
        ajax_json = {}
        ajax_json = request.json
        return_json = {}
        print ajax_json
        if request.files:
            user_id = session.get('user_id')
            user = User.query.get(user_id)
            file = request.files['file']
            extension = file.filename.rsplit('.',1)[1]
            destination_filename = md5(str(user_id)).hexdigest() + "." + extension

            upload_file_to_amazon(destination_filename, file)
            
            #save this to the db
            amazon_url = "https://s3.amazonaws.com/momsitting/"+destination_filename
            user.profile_url = amazon_url

            db_session.commit();
            return jsonify(return_json)
        if 'create-momsitter' in ajax_json:
            name = ajax_json.get('name')
            email = ajax_json.get('email')
            password = ajax_json.get('password')
            zip_code = ajax_json.get('zip')

            user = User(
                name=name,
                email=email,
                password=password,
                zip_code=zip_code
                )
            db_session.add(user)
            db_session.commit()
            session['user_id'] = user.id
            user.address = ajax_json['address']
            user.languages = ajax_json['momsitter-languages']

            user.childcare_experience = ajax_json['childhood-years']
            user.age_group_0_2 = ajax_json['age-0-2']
            user.age_group_3_5 = ajax_json['age-3-5']
            user.age_group_6_8 = ajax_json['age-6-8']
            user.age_group_9_11 = ajax_json['age-9-11']
            user.age_group_12 = ajax_json['age-12']
            user.licensed = ajax_json['licensed']
            user.background_check = ajax_json['bg_check']
            user.cpr_certified = ajax_json['cpr']
            user.part_time = ajax_json['part_time']
            user.full_time = ajax_json['full_time']
            user.weekly_full_time_rate = ajax_json['full-time-rate']
            

            db_session.commit()
            return jsonify(ajax_json)

        if 'create-user' in ajax_json:
            name = ajax_json.get('name')
            email = ajax_json.get('email')
            password = ajax_json.get('password')
            zip_code = ajax_json.get('zip')

            user = User(
                name=name,
                email=email,
                password=password,
                zip_code=zip_code
                )
            db_session.add(user)
            db_session.commit()
            session['user_id'] = user.id
            flash("Your account has successfully been created! Feel free to browse any profiles and contact multiple Momsitters.")
            return jsonify(ajax_json)
        if 'make-changes' in ajax_json:
            user_id = session.get('user_id')
            user = User.query.get(user_id)
            name = ajax_json.get('name')
            email = ajax_json.get('email')
            zip_code = ajax_json.get('zip')
            user.name = name
            user.email = email
            user.zip_code = zip_code
            db_session.commit()
            return jsonify(ajax_json)

        if 'make-changes-momsitter' in ajax_json:
            user_id = session.get('user_id')
            user = User.query.get(user_id)
            user.address = ajax_json['address']
            user.languages = ajax_json['momsitter-languages']

            user.childcare_experience = ajax_json['childhood-years']
            user.age_group_0_2 = ajax_json['age-0-2']
            user.introduction = ajax_json['introduction']
            user.age_group_3_5 = ajax_json['age-3-5']
            user.age_group_6_8 = ajax_json['age-6-8']
            user.age_group_9_11 = ajax_json['age-9-11']
            user.age_group_12 = ajax_json['age-12']
            user.licensed = ajax_json['licensed']
            user.background_check = ajax_json['bg_check']
            user.cpr_certified = ajax_json['cpr']
            user.part_time = ajax_json['part_time']
            user.full_time = ajax_json['full_time']
            user.weekly_full_time_rate = ajax_json['full-time-rate']
            db_session.commit()
            return jsonify(ajax_json)

    return render_template('search.html')

@app.route('/login/', methods=('GET', 'POST'))
def login():
    if request.method == "POST":
        json = {}
        ajax_json = request.json
        return_json = {}
        email = ajax_json['email']
        password = ajax_json['password']
        query = User.query.filter_by(email=email, password=password).first()
        if email.lower() =="admin@momsitting.com" and password=="alykhanscott1":
            json['admin'] = True
            session['admin'] = True
            return jsonify(json=json)
        if query:
            user = query
            session['user_id'] = user.id
            if user.languages:
                json['momsitter'] = True
            json['success'] = True                
        else:
            json['failure'] = False
            json['momsitter'] = False
        return jsonify(json=json)

@app.route('/logout/')
def logout():
    session.pop('user_id')
    return redirect(url_for('index'))

@app.route('/profile/')
def profile():
    user = None
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
	return render_template('new-profile.html', logged_in=session.get('user_id'), user=user)

@app.route('/old-search/')
def old_search():
    return render_template('search.html')

@app.route('/old-profile/')
def old_profile():
    return render_template('profile.html')

@app.route('/search-list/')
def search_list():
    return render_template('search_list.html')

@app.route('/search/')
def search():
    user = None
    if session.get('user_id'):
        user = User.query.get(session.get('user_id'))
    return render_template('new_search.html', logged_in = session.get('user_id'), user=user)

@app.route('/settings/')
def settings():
    return render_template('settings.html')

@app.route('/step1/')
def step1():
    return render_template('step1.html')

@app.route('/step2/')
def step2():
    return render_template('step2.html')

@app.route('/base/')
def base():
    return render_template('base.html')

def upload_file_to_amazon(filename, file):
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    b = conn.get_bucket(app.config["S3_BUCKET"])
    sml = b.new_key("/".join(["/",filename]))
    sml.set_contents_from_file(file)
    sml.set_acl('public-read')

def write_to_csv():
    csv_string = """NAME, EMAIL, ZIP, LANGUAGES, ADDRESS, WEEKLY RATE, CHILDCARE EXPERIENCE, BIO, PROFILE URL\n"""
    for user in User.query.all():
        csv_string += "%s, %s, %s, %s, %s, %s, %s, %s, %s" % (user.name, user.email, user.zip_code, user.address, \
        (" ").join(str(user.languages).split(", ")), str(user.weekly_full_time_rate), str(user.childcare_experience), user.introduction, user.profile_url) + "\n"
    return csv_string

