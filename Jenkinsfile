pipeline {
    agent any

    environment {
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        APP_NAME_DEV = "nextjs-dev"
        APP_NAME_PROD = "nextjs-prod"
        DEV_PORT = '3000'
        PROD_PORT = '5000'
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: env.BRANCH_NAME, url: env.REPO_URL
            }
        }

        stage('Build & Test') {
            parallel {
                stage('Build') {
                    steps {
                        script {
                            if (env.BRANCH_NAME == 'dev') {
                                echo "Building for Dev..."
                            } else if (env.BRANCH_NAME == 'main') {
                                echo "Building for Production..."
                            }
                        }
                        sh "yarn install && yarn build"
                    }
                }
                stage('Unit Tests') {
                    steps {
                        sh "yarn test"
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
