pipeline{
    agent any
    tools {nodejs "nodejs"}
    stages{
        stage("Build"){
            steps{
                nodejs("nodejs") {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage("Start"){
            steps{
                nodejs("nodejs") {
                    sh 'npm start'
                }
                echo "App started successfully"
            }
        }
    }
}
