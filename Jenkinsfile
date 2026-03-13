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
if [ ! -d "/home/ec2-user/app" ]; then
    git clone https://github.com/jyothig11/fullstacl-new-repo.git /home/ec2-user/app
fi

cd /home/ec2-user/app

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
