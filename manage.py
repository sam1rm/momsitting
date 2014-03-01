import sys,os
from app.database import *
from app.models import *
from hashlib import md5


arg = sys.argv[1]

if arg == 'create_db':
    init_db()
    print "db initialized"


if arg == 're-create_db':
    os.remove('app.db')
    init_db()

if arg == 'create_user':
    user = User(name='Samir', email='makhani@berkeley.edu', \
        password='test', zip_code='11111')
    db_session.add(user)
    db_session.commit()

if arg == 'delete':
    email = sys.argv[2]
    user = User.query.filter_by(email=email).first()
    db_session.delete(user)
    db_session.commit()
    print email + ' deleted'