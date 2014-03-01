CSRF_ENABLED = True
SECRET_KEY = '\xc8]{\x9e\xb7\x93\xc1X\xab#\x8b"K\xe8\xd2\xc5\x17C!I\r$\xca\x7f'

import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
S3_LOCATION = 'http://s3-us-west-2.amazonaws.com'
S3_KEY = 'AKIAJTXCMXK5FHZY6YQA'
S3_SECRET = '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'
S3_UPLOAD_DIRECTORY = '/'
S3_BUCKET = 'momsitting'