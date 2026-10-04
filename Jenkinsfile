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
    }
}
