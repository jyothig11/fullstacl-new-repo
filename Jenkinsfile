pipeline {

    agent any
 
    environment {

        // Update with your server details

        DEPLOY_SERVER = 'your-server-ip'

        SSH_CRED_ID = 'ssh-server-key' // The ID you gave in Jenkins credentials

    }
 
    stages {

        stage('Checkout') {

            steps {

                checkout scm

            }

        }
 
        stage('Backend Setup & Test') {

            steps {

                sh '''

                    python3 -m venv venv

                    source venv/bin/activate

                    pip install -r requirements.txt

                    # Add tests here if you have any

                '''

            }

        }
 
        stage('Deploy to Server') {

            steps {

                sshagent([SSH_CRED_ID]) {

                    sh """

                        ssh -o StrictHostKeyChecking=no ubuntu@${DEPLOY_SERVER} << 'EOF'

                            cd /home/ubuntu/app

                            git pull origin main

                            # Restart Backend

                            source venv/bin/activate

                            pip install -r requirements.txt

                            pkill -f "python3 app.py" || true

                            nohup python3 app.py > backend.log 2>&1 &

                            # Update Frontend

                            # Assuming your HTML is served via Nginx/Apache

                            sudo cp index\ -\ Copy.html /var/www/html/index.html

                        EOF

                    """

                }

            }

        }

    }

}
 
