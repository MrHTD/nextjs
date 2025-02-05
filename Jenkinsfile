pipeline {
    agent any
    environment {
        APP_NAME = "nextjs"
        REPO_NAME = "nextjs"
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
        DEV_PORT = '3000'
        PROD_PORT = '5000'
    }
    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['myubuntu']) {
                    script {
                        parallel(
                            "Development - Git Operations": {
                                echo "Pulling latest code from Git repository..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST}<< ENDSSH
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
                            "Production - Git Operations": {
                                echo "Pulling latest code from Git repository..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST}<< ENDSSH
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
                                            git clone ${REPO_URL};
                                            git switch ${env.BRANCH_NAME};
                                            git pull origin  ${env.BRANCH_NAME};
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
        stage("Build") {
            steps {
                sshagent(['myubuntu']) {
                    script{
                        parallel(
                            "Development - Build": {
                                echo "Building the application..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                    set -x
                                    
                                    cd /home/ahmed/development/${REPO_NAME}
            
                                    # Ensure Yarn is installed
                                    if ! command -v yarn &> /dev/null; then
                                        echo 'Yarn not found. Installing...'
                                        sudo npm install -g yarn
                                    else
                                        echo 'Yarn is installed. Skipping installation...'
                                        yarn --version;
                                    fi
            
                                    # Clean cache and reinstall dependencies
                                    echo 'Cleaning node_modules and cache...';
                                    yarn cache clean;
            
                                    yarn install;
            
                                    yarn build;
                                """
                            },
                            "Production - Build": {
                                echo "Building the application..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                    set -x
                                    
                                    cd /home/ahmed/production/${REPO_NAME}
            
                                    # Ensure Yarn is installed
                                    if ! command -v yarn &> /dev/null; then
                                        echo 'Yarn not found. Installing...'
                                        sudo npm install -g yarn
                                    else
                                        echo 'Yarn is installed. Skipping installation...'
                                        yarn --version;
                                    fi
            
                                    # Clean cache and reinstall dependencies
                                    echo 'Cleaning node_modules and cache...';
                                    yarn cache clean;
            
                                    yarn install;
            
                                    yarn build;
                                """
                            }
                        )
                    }
                }
            }
        }
        stage("Deploy") {
            steps {
                sshagent(['myubuntu']) {
                    script{
                        parallel(
                            "Development - Deploy": {
                                echo "Deploying the application..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
            
                                    cd /home/ahmed/development/${REPO_NAME};
            
                                    npx pm2 list | grep -w "${APP_NAME}"
            
                                    # Check if the app is running
                                    if npx pm2 list | grep -qw "${APP_NAME}"
                                    then
                                        echo "Application ${APP_NAME} is already running. Restarting it..."
                                        npx pm2 restart "${APP_NAME}"
                                    else
                                        echo "Application ${APP_NAME} is not running. Starting it..."
                                        npx pm2 start "PORT='${DEV_PORT}' yarn run start" --name '${APP_NAME}'
                                    fi
            
                                    npx pm2 save;
            
                                    npx pm2 list | grep -w "${APP_NAME}"
            
                                    npx pm2 logs ${APP_NAME} --lines 5 --nostream;
                                """
                            },
                            "Production - Deploy": {
                                echo "Deploying the application..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
            
                                    cd /home/ahmed/production/${REPO_NAME};
            
                                    npx pm2 list | grep -w "${APP_NAME}"
            
                                    # Check if the app is running
                                    if npx pm2 list | grep -qw "${APP_NAME}"
                                    then
                                        echo "Application ${APP_NAME} is already running. Restarting it..."
                                        npx pm2 restart "${APP_NAME}"
                                    else
                                        echo "Application ${APP_NAME} is not running. Starting it..."
                                        npx pm2 start "PORT='${PROD_PORT}' yarn run start" --name '${APP_NAME}'
                                    fi
            
                                    npx pm2 save;
            
                                    npx pm2 list | grep -w "${APP_NAME}"
            
                                    npx pm2 logs ${APP_NAME} --lines 5 --nostream;
                                """
                            }
                        )
                    }
                }
            }
        }
    }
    post {
        success {
            script {
                parallel(
                    "Dev - Success Notification": {
                        discordSend description: "✅ Dev Pipeline succeeded for ${DEV_APP_NAME}!", 
                                    footer: "Jenkins Pipeline Notification", 
                                    link: env.BUILD_URL, 
                                    result: "SUCCESS", 
                                    title: env.JOB_NAME, 
                                    webhookURL: env.DISCORD_WEBHOOK
                    },
                    "Prod - Success Notification": {
                        discordSend description: "✅ Prod Pipeline succeeded for ${PROD_APP_NAME}!", 
                                    footer: "Jenkins Pipeline Notification", 
                                    link: env.BUILD_URL, 
                                    result: "SUCCESS", 
                                    title: env.JOB_NAME, 
                                    webhookURL: env.DISCORD_WEBHOOK
                    }
                )
            }
        }
        failure {
            script {
                parallel(
                    "Dev - Failure Notification": {
                        discordSend description: "❌ Dev Pipeline failed for ${DEV_APP_NAME}. Check logs!", 
                                    footer: "Jenkins Pipeline Notification", 
                                    link: env.BUILD_URL, 
                                    result: "FAILURE", 
                                    title: env.JOB_NAME, 
                                    webhookURL: env.DISCORD_WEBHOOK
                    },
                    "Prod - Failure Notification": {
                        discordSend description: "❌ Prod Pipeline failed for ${PROD_APP_NAME}. Check logs!", 
                                    footer: "Jenkins Pipeline Notification", 
                                    link: env.BUILD_URL, 
                                    result: "FAILURE", 
                                    title: env.JOB_NAME, 
                                    webhookURL: env.DISCORD_WEBHOOK
                    }
                )
            }
        }
        always {
            echo "Pipeline completed."
        }
    }
}
