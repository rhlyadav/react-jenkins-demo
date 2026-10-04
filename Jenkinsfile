pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                bat 'npm run test:run'
            }
        }

        stage('Build application') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker image') {
            steps {
                bat 'docker build -t react-jenkins-demo .'
            }
        }

        stage('Deploy container') {
            steps {
                bat '''
docker rm --force react-jenkins-demo-app >NUL 2>&1
docker run --detach --name react-jenkins-demo-app --restart unless-stopped --publish 8081:80 react-jenkins-demo:latest
'''
            }
        }

        stage('Verify deployment') {
            steps {
                bat 'curl.exe --fail --silent --show-error --retry 10 --retry-connrefused --retry-delay 1 --output NUL http://localhost:8081/'
            }
        }
    }
}
