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
        stage("Installing PM2"){
            steps{
                nodejs("nodejs") {
                    sh 'npm install pm2 -g'
                }
            }
        }
        stage("Start"){
            steps{
                nodejs("nodejs") {
                    sh 'pm2 start npm --name app1 -- run start -- -p 3000'
                    sh 'pm2 ls'
                }
                echo "App started successfully"
            }
        }
    }
}
