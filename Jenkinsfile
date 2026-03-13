pipeline {

    agent any

    environment {
        DEPLOY_SERVER = '127.0.0.1'
        SSH_CRED_ID = 'f4a0a4e2-a4c8-49bb-85a4-78fd06c177aa'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to EC2') {
            steps {

                sshagent([SSH_CRED_ID]) {

                    sh """
                    ssh -o StrictHostKeyChecking=no ec2-user@${DEPLOY_SERVER} << EOF

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

                    EOF
                    """
                }

            }
        }

    }
}
