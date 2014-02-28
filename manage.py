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