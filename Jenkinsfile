pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/jyothig11/fullstacl-new-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pip3 install flask flask-cors pymysql'
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                pkill -f app.py || true
                nohup python3 app.py > backend.log 2>&1 &
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                pkill -f http.server || true
                nohup python3 -m http.server 9090 > frontend.log 2>&1 &
                '''
            }
        }

    }
}
