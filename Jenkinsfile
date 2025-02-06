pipeline {
    agent any

    environment {
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        DEV_REPO_NAME = "mawrid-vendor-dev"
        PROD_REPO_NAME = "mawrid-vendor-prod"
        DEV_PORT = '3000'
        PROD_PORT = '5000'
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
    }

    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['ssh']) {
                    script {
                        parallel(
                            "Dev - Git Operations": {
                                echo "Running Git operations for Dev..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                    set -x
                                    cd /home/devxonic/development
                                    if [ ! -d '${DEV_REPO_NAME}' ]; then
                                        git clone ${DEV_REPO_URL} ${DEV_REPO_NAME}
                                    fi
                                    cd ${DEV_REPO_NAME}
                                    git fetch origin
                                    git switch ${env.BRANCH_NAME}
                                    git pull origin ${env.BRANCH_NAME}
                                    ENDSSH
                                """
                            },
                            "Prod - Git Operations": {
                                echo "Running Git operations for Prod..."
                                sh """
                                    ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                    set -x
                                    cd /home/devxonic/development
                                    if [ ! -d '${PROD_REPO_NAME}' ]; then
                                        git clone ${PROD_REPO_URL} ${PROD_REPO_NAME}
                                    fi
                                    cd ${PROD_REPO_NAME}
                                    git fetch origin
                                    git switch ${env.BRANCH_NAME}
                                    git pull origin ${env.BRANCH_NAME}
                                    ENDSSH
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
                    if (env.BRANCH_NAME == 'dev') {
                        echo "Building for Dev..."
                    } else if (env.BRANCH_NAME == 'main') {
                        echo "Building for Production..."
                        }
                }
            }
        }

        stage('Deploy to Dev') {
            when { branch 'dev' }
            steps {
                echo "Deploying to Dev..."
                deployApplication("dev", APP_NAME_DEV, DEV_PORT)
            }
        }

        stage('Approve QA Deployment') {
            when { branch 'dev' }
            steps {
                input message: 'Deploy to QA?', ok: 'Proceed'
            }
        }

        stage('Deploy to Prod') {
            when { branch 'main' }
            steps {
                echo "Deploying to Production..."
                deployApplication("prod", APP_NAME_PROD, PROD_PORT)
            }
        }
    }

    post {
        success {
            script {
                sendDiscordNotification("✅ Deployment succeeded!", "SUCCESS")
            }
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
            cd /home/ahmed/${envName}/${appName}
            if npx pm2 list | grep -qw "${appName}"
            then
                npx pm2 restart "${appName}"
            else
                npx pm2 start "PORT='${port}' yarn run start" --name '${appName}'
            fi
            npx pm2 save
            npx pm2 logs ${appName} --lines 5 --nostream
            ENDSSH
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
