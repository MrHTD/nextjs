pipeline {
    agent any
    environment {
        REPO_NAME = "mawrid-vendor"
        DOCKER_REPO = "devopsdevxonic/mawrid-vendor"
        IMAGE_TAG = "${DOCKER_REPO}:${env.BRANCH_NAME}-${BUILD_NUMBER}"
        PORT = "${env.BRANCH_NAME == 'main' ? '3005' : env.BRANCH_NAME == 'staging' ? '3015' : env.BRANCH_NAME == 'testing' ? '3025' : error("Invalid branch: ${env.BRANCH_NAME}.")}"
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1329384928579817513/dJIdE2afGsiQtloHfcnVJNMzOmNYypvyHsp-fKPYQ9ktHLEpGTP1JRHejfJYs0zPYZqK"
    }

    stages {
        stage("Checkout Code") {
            steps {
                checkout scm
            }
        }

        stage("Docker Build") {
            steps {
                echo "Building Docker image..."
                sh "DOCKER_BUILDKIT=1 docker build -t ${IMAGE_TAG} ."
            }
        }

        stage("Docker Push") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerR', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${IMAGE_TAG}

                        # Clean up builder cache
                        docker builder prune -af
                    '''
                }
            }
        }

        stage("Docker Run") {
            steps {
                sshagent(['ssh']) {
                    echo "Deploying the application..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << 'ENDSSH'
                        set -x
                    
                        # Stop & remove existing container if exists
                        if [ "\$(docker ps -aq -f name=${REPO_NAME})" ]; then
                          echo "Container exists. Stopping and removing..."
                          docker stop ${REPO_NAME} || true
                          docker rm ${REPO_NAME} || true
                        else
                          echo "No existing container named ${REPO_NAME} found."
                        fi
                    
                        # Remove existing image if exists
                        if [ "\$(docker images -q ${IMAGE_TAG})" ]; then
                            echo "Old image found. Removing..."
                            docker rmi -f ${IMAGE_TAG} || true
                        fi
                        
                        # Pull latest image
                        echo "Pulling latest image: ${IMAGE_TAG}"
                        docker pull ${IMAGE_TAG}
                    
                        # Run new container
                        docker run -d --name ${REPO_NAME} --restart unless-stopped -p ${PORT}:3000 ${IMAGE_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            discordSend description: "✅ Pipeline succeeded for ${REPO_NAME}:${env.BRANCH_NAME}!", footer: "Jenkins Pipeline Notification", link: env.BUILD_URL, result: "SUCCESS", title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        failure {
            discordSend description: "❌ Pipeline failed for ${REPO_NAME}:${env.BRANCH_NAME}. Check logs!", footer: "Jenkins Pipeline Notification", link: env.BUILD_URL, result: "FAILURE", title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        aborted {
            discordSend description: "⚠️ Pipeline aborted for ${REPO_NAME}:${env.BRANCH_NAME}!.", footer: "Jenkins Pipeline Notification", link: env.BUILD_URL, result: "ABORTED", title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        always {
            echo "Pipeline completed."
        }
    }
}
