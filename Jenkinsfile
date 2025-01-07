pipeline {
    agent any
    // tools { nodejs "nodejs" }
    stages {
        stage("Build") {
            steps {
                nodejs("nodejs") {
                    echo "Installing dependencies and building the application..."
                    sh 'node -v'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage("Installing PM2") {
            steps {
                nodejs("nodejs") {
                    echo "Installing PM2 globally..."
                    sh 'npm install pm2 -g'
                }
            }
        }
        stage("Start") {
            steps {
                nodejs("nodejs") {
                    echo "Starting the application with PM2..."
                    sh 'pm2 start npm --name app1 -- run start -- -p 3000'
                    sh 'pm2 ls'
                }
                echo "App started successfully"
            }
        }
    }
    post {
        always {
            echo "Pipeline execution completed."
        }
        failure {
            echo "Pipeline execution failed. Check the logs for details."
        }
    }
}
