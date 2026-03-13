pipeline {

    agent any
 
    environment {

        // Use your EC2 Public IP or Elastic IP

        DEPLOY_SERVER = '98.86.103.174' 

        SSH_CRED_ID = 'joesnewkey11.pem' // The ID you created in Jenkins Credentials

    }
 
    stages {

        stage('Checkout') {

            steps {

                // Pulls the latest code from your GitHub repository

                checkout scm

            }

        }
 
        stage('Deploy to EC2') {

            steps {

                sshagent([SSH_CRED_ID]) {

                    sh """

                        ssh -o StrictHostKeyChecking=no ubuntu@${DEPLOY_SERVER} << 'EOF'

                            # Navigate to your app directory

                            cd /home/ubuntu/app || git clone <YOUR_GITHUB_REPO_URL> /home/ubuntu/app

                            cd /home/ubuntu/app

                            # Update to the latest code

                            git pull origin main

                            # Setup/Activate Virtual Environment

                            python3 -m venv venv

                            source venv/bin/activate

                            pip install flask flask-cors pymysql

                            # CRITICAL: Kill the old process so the new one can start on port 5000

                            sudo fuser -k 5000/tcp || true

                            # Start the updated Flask app in the background

                            nohup python3 app.py > nohup.out 2>&1 &

                            # Update the Frontend file in the web server directory

                            sudo cp "index - Copy.html" /var/www/html/index.html

                        EOF

                    """

                }

            }

        }

    }

}
 
