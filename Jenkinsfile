pipeline {
    agent any
    environment {
        SSH_USER = 'vbox'
        SSH_HOST = '192.168.1.188'
        RUN_SUDO = 'export SUDO_ASKPASS=/home/vbox/secret/mypass.sh'
        APP_NAME = "${params.ENVIRONMENT == 'prod' ? 'NextJsAppProd' : 'NextJsAppDev'}"
        REPO_NAME = "nextjs"
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        BRANCH = "${params.BRANCH_NAME ?: 'main'}"
        PORT = "${params.ENVIRONMENT == 'prod' ? '4000' : '3000'}"
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
    }
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build and deploy')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'prod'], description: 'Select the deployment environment')
    }
    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['ssh']) {
                    echo "Pulling latest code for ${params.ENVIRONMENT} environment..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
                        set -x

                        # Navigate to the appropriate development directory
                        ENV_DIR="/home/${SSH_USER}/development/${params.ENVIRONMENT}"
                        if [ ! -d "$ENV_DIR" ]; then
                            echo "Creating environment directory: $ENV_DIR"
                            mkdir -p "$ENV_DIR"
                        fi
                        cd "$ENV_DIR"

                        # Clone or update the repository
                        if [ ! -d "${REPO_NAME}" ]; then
                            echo "Cloning repository for ${params.ENVIRONMENT} environment..."
                            git clone ${REPO_URL} ${REPO_NAME}
                        fi
                        cd ${REPO_NAME}
                        git fetch origin
                        git switch ${BRANCH}
                        git pull origin ${BRANCH}
                    """
                }
            }
        }
        stage("Build") {
            steps {
                sshagent(['ssh']) {
                    echo "Building application for ${params.ENVIRONMENT} environment..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH

                        ENV_DIR="/home/${SSH_USER}/development/${params.ENVIRONMENT}/${REPO_NAME}"
                        cd "$ENV_DIR"

                        if ! command -v yarn &> /dev/null; then
                            sudo -A npm install -g yarn
                        fi

                        yarn cache clean
                        yarn install
                        yarn build

                        # Manage app with PM2
                        npx pm2 ls
                        if npx pm2 list | grep -qw "${APP_NAME}"; then
                            echo "Restarting ${APP_NAME}..."
                            npx pm2 restart "${APP_NAME}"
                        else
                            echo "Starting ${APP_NAME} on PORT=${PORT}..."
                            npx pm2 start "PORT=${PORT} yarn start" --name "${APP_NAME}"
                        fi
                        npx pm2 save
                    """
                }
            }
        }
        stage("End") {
            steps {
                script {
                    if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
                        echo "Pipeline for ${params.ENVIRONMENT} completed successfully. 🎉"
                    } else {
                        echo "Pipeline for ${params.ENVIRONMENT} encountered errors. ❌"
                    }
                }
            }
        }
    }
    post {
        success {
            discordSend description: "✅ Pipeline succeeded for ${APP_NAME} in ${params.ENVIRONMENT} environment!", 
                        footer: "Jenkins Pipeline Notification", 
                        link: env.BUILD_URL, 
                        result: "SUCCESS", 
                        title: env.JOB_NAME, 
                        webhookURL: env.DISCORD_WEBHOOK
        }
        failure {
            discordSend description: "❌ Pipeline failed for ${APP_NAME} in ${params.ENVIRONMENT} environment. Check logs!", 
                        footer: "Jenkins Pipeline Notification", 
                        link: env.BUILD_URL, 
                        result: "FAILURE", 
                        title: env.JOB_NAME, 
                        webhookURL: env.DISCORD_WEBHOOK
        }
        aborted {
            discordSend description: "⚠️ Pipeline for ${APP_NAME} in ${params.ENVIRONMENT} environment was **aborted**.", 
                        footer: "Jenkins Pipeline Notification", 
                        link: env.BUILD_URL, 
                        result: "ABORTED", 
                        title: env.JOB_NAME, 
                        webhookURL: env.DISCORD_WEBHOOK
        }
        always {
            echo "Pipeline completed for ${params.ENVIRONMENT} environment."
        }
    }
}
