pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Backend') {
            steps {

                sh '''
if [ ! -d "/var/lib/jenkins/app" ]; then
    git clone https://github.com/jyothig11/fullstacl-new-repo.git /var/lib/jenkins/app
fi

cd /var/lib/jenkins/app

git pull origin main

python3 -m venv venv

source venv/bin/activate

pip install flask flask-cors pymysql

sudo fuser -k 5000/tcp || true

nohup python3 app.py > backend.log 2>&1 &
'''

            }
        }

    }
}
