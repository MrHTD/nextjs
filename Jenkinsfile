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
            parallel {
                stage("Development - Git Operations") {
                    steps {
                        sshagent(['myubuntu']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                set -x
                                mkdir -p /home/ahmed/development
                                cd /home/ahmed/development
                                if [ ! -d '${REPO_NAME}' ]; then
                                    git clone ${REPO_URL} ${REPO_NAME};
                                fi
                                cd ${REPO_NAME}
                                git fetch origin
                                git switch ${env.BRANCH_NAME}
                                git pull origin ${env.BRANCH_NAME}
                            """
                        }
                    }
                }
                stage("Production - Git Operations") {
                    steps {
                        sshagent(['myubuntu']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                set -x
                                mkdir -p /home/ahmed/production
                                cd /home/ahmed/production
                                if [ ! -d '${REPO_NAME}' ]; then
                                    git clone ${REPO_URL} ${REPO_NAME};
                                fi
                                cd ${REPO_NAME}
                                git fetch origin
                                git switch ${env.BRANCH_NAME}
                                git pull origin ${env.BRANCH_NAME}
                            """
                        }
                    }
                }
            }
        }
        
        stage("Build") {
            parallel {
                stage("Development - Build") {
                    steps {
                        sshagent(['myubuntu']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                set -x
                                cd /home/ahmed/development/${REPO_NAME}
                                if ! command -v yarn &> /dev/null; then sudo npm install -g yarn; fi
                                yarn install
                                yarn build
                            """
                        }
                    }
                }
                stage("Production - Build") {
                    steps {
                        sshagent(['myubuntu']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                set -x
                                cd /home/ahmed/production/${REPO_NAME}
                                if ! command -v yarn &> /dev/null; then sudo npm install -g yarn; fi
                                yarn install
                                yarn build
                            """
                        }
                    }
                }
            }
        }

        stage("Deploy") {
            parallel {
                stage("Development - Deploy") {
                    steps {
                        sshagent(['myubuntu']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/development/${REPO_NAME}
                                if npx pm2 list | grep -qw "${APP_NAME}"
                                then
                                    npx pm2 restart "${APP_NAME}"
                                else
                                    npx pm2 start "PORT='${DEV_PORT}' yarn run start" --name '${APP_NAME}'
                                fi
                                npx pm2 save
                                npx pm2 logs ${APP_NAME} --lines 5 --nostream
                            """
                        }
                    }
                }
                stage("Production - Deploy") {
                    steps {
                        sshagent(['myubuntu']) {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/production/${REPO_NAME}
                                if npx pm2 list | grep -qw "${APP_NAME}"
                                then
                                    npx pm2 restart "${APP_NAME}"
                                else
                                    npx pm2 start "PORT='${PROD_PORT}' yarn run start" --name '${APP_NAME}'
                                fi
                                npx pm2 save
                                npx pm2 logs ${APP_NAME} --lines 5 --nostream
                            """
                        }
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
                        discordSend description: "✅ Dev Pipeline succeeded for ${APP_NAME}!", 
                                    footer: "Jenkins Pipeline Notification", 
                                    link: env.BUILD_URL, 
                                    result: "SUCCESS", 
                                    title: env.JOB_NAME, 
                                    webhookURL: env.DISCORD_WEBHOOK
                    },
                    "Prod - Success Notification": {
                        discordSend description: "✅ Prod Pipeline succeeded for ${APP_NAME}!", 
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
                        discordSend description: "❌ Dev Pipeline failed for ${APP_NAME}. Check logs!", 
                                    footer: "Jenkins Pipeline Notification", 
                                    link: env.BUILD_URL, 
                                    result: "FAILURE", 
                                    title: env.JOB_NAME, 
                                    webhookURL: env.DISCORD_WEBHOOK
                    },
                    "Prod - Failure Notification": {
                        discordSend description: "❌ Prod Pipeline failed for ${APP_NAME}. Check logs!", 
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
