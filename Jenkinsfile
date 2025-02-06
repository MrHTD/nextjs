pipeline {
    agent any

    environment {
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        
        DEV_APP_NAME = "nextjs"
        PROD_APP_NAME = "nextjs-prod"
        
        REPO_NAME = "nextjs"
        DEV_PORT = '3000'
        PROD_PORT = '5000'
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
    }

    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['myubuntu']) {
                    script {
                        parallel(
                            "Dev - Git Operations": {
                                echo "Running Git operations for Dev..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                    set -x
            
                                    # Check if the development directory exists
                                    if [ ! -d "/home/ahmed/development" ]; then
                                        echo "Directory /home/ahmed/development does not exist. Creating it..."
                                        mkdir -p "/home/ahmed/development"
                                    fi
            
                                    # Navigate to the directory (outside the if block so it always runs)
                                    cd /home/ahmed/development || { echo "Failed to change directory"; exit 1; }
            
                                    # List files to ensure we're in the right directory
                                    echo 'Listing contents of development directory...';
                                    ls -la;
            
                                    # Check if the repository folder exists inside development
                                    if [ ! -d '${REPO_NAME}' ]; then
                                        echo 'Repository folder does not exist. Cloning repository...';
                                        git clone ${REPO_URL} ${REPO_NAME};
                                        cd ${REPO_NAME};
                                        git switch ${env.BRANCH_NAME};
                                    else
                                        echo 'Repository folder exists. Checking if it is a Git repository...';
                                        cd ${REPO_NAME};
                
                                        # Check if it's a Git repository
                                        if [ ! -d '.git' ]; then
                                            echo 'Not a Git repository. Initializing repository...';
                                            git init;
                                            git remote add origin ${REPO_URL};
                                            git fetch origin;
                                            git switch ${env.BRANCH_NAME};
                                        else
                                            echo 'Directory is a Git repository. Pulling latest changes...';
                                            git fetch origin;
                                            git switch ${env.BRANCH_NAME};
                                            git pull origin ${env.BRANCH_NAME};
                                        fi
                                    fi
                                """
                            },
                            "Prod - Git Operations": {
                                echo "Running Git operations for Prod..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                    set -x
            
                                    # Check if the development directory exists
                                    if [ ! -d "/home/ahmed/production" ]; then
                                        echo "Directory /home/ahmed/production does not exist. Creating it..."
                                        mkdir -p "/home/ahmed/production"
                                    fi
            
                                    # Navigate to the directory (outside the if block so it always runs)
                                    cd /home/ahmed/production || { echo "Failed to change directory"; exit 1; }
            
                                    # List files to ensure we're in the right directory
                                    echo 'Listing contents of production directory...';
                                    ls -la;
            
                                    # Check if the repository folder exists inside development
                                    if [ ! -d '${REPO_NAME}' ]; then
                                        echo 'Repository folder does not exist. Cloning repository...';
                                        git clone ${REPO_URL} ${REPO_NAME};
                                        cd ${REPO_NAME};
                                        git switch ${env.BRANCH_NAME};
                                    else
                                        echo 'Repository folder exists. Checking if it is a Git repository...';
                                        cd ${REPO_NAME};
                
                                        # Check if it's a Git repository
                                        if [ ! -d '.git' ]; then
                                            echo 'Not a Git repository. Initializing repository...';
                                            git init;
                                            git remote add origin ${REPO_URL};
                                            git fetch origin;
                                            git switch ${env.BRANCH_NAME};
                                        else
                                            echo 'Directory is a Git repository. Pulling latest changes...';
                                            git fetch origin;
                                            git switch ${env.BRANCH_NAME};
                                            git pull origin ${env.BRANCH_NAME};
                                        fi
                                    fi
                                """
                            }
                        )
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Building for Dev..."
                    } else if (env.BRANCH_NAME == 'main') {
                        echo "Building for Production..."
                    }
                }
            }
        }
        stage('Deploy to Dev') {
            steps {
                echo "Deploying to Dev..."
                deployApplication("development", DEV_APP_NAME, DEV_PORT)
            }
        }
        
        stage('Approve Production Deployment') {
            when { branch 'main' } // Runs only on the main branch
            steps {
                input message: 'Deploy to Production?', ok: 'Proceed'
            }
        }
        
        stage('Deploy to Prod') {
            when { branch 'main' } // Runs only on the main branch
            steps {
                echo "Deploying to Production..."
                deployApplication("production", PROD_APP_NAME, PROD_PORT)
            }
        }
        
    }

    post {
        success {
            script {
                sendDiscordNotification("✅ Deployment succeeded!", "SUCCESS")
            }
             // mail to: 'mughis01@gmail.com',
             // subject: "Successful : Build ${env.JOB_NAME}",
             // body: "Build Successful ${env.JOB_NAME} and Build number: ${env.BUILD_NUMBER} .\n\n View the logs at : \n ${env.BUILD_URL}"
        }
        failure {
            script {
                sendDiscordNotification("❌ Deployment failed. Check logs!", "FAILURE")
            }
        }
        always {
            echo "Pipeline completed."
        }
    }
}

def deployApplication(envName, appName, port) {
    sshagent(['myubuntu']) {
        sh """
            ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
            cd /home/ahmed/${envName}/${REPO_NAME}
            if npx pm2 list | grep -qw "${appName}"
            then
                npx pm2 restart "${appName}"
            else
                npx pm2 start "PORT='${port}' yarn run start" --name '${appName}'
            fi
            npx pm2 save
            npx pm2 logs ${appName} --lines 5 --nostream
        """
    }
}

def sendDiscordNotification(message, status) {
    discordSend(
        description: message,
        footer: "Jenkins Pipeline Notification",
        link: env.BUILD_URL,
        result: status,
        title: env.JOB_NAME,
        webhookURL: env.DISCORD_WEBHOOK
    )
}
