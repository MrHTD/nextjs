pipeline {
    agent any
    environment {
        APP_NAME = "nextjs"
        REPO_NAME = "nextjs"
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        DEV_PORT = '3000'
        PROD_PORT = '5000'
    }
    
    stages {
        stage("Git Clone/Pull") {
            steps {
                sshagent(['myubuntu']) {
                    parallel (
                        development: {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/development
                                if [ ! -d '${REPO_NAME}' ]; then
                                    git clone ${REPO_URL} ${REPO_NAME}
                                fi
                                cd ${REPO_NAME}
                                git pull origin main
                            """
                        },
                        production: {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/production
                                if [ ! -d '${REPO_NAME}' ]; then
                                    git clone ${REPO_URL} ${REPO_NAME}
                                fi
                                cd ${REPO_NAME}
                                git pull origin main
                            """
                        }
                    )
                }
            }
        }

        stage("Build") {
            steps {
                sshagent(['myubuntu']) {
                    parallel (
                        development: {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/development/${REPO_NAME}
                                yarn install --non-interactive
                                yarn build
                            """
                        },
                        production: {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/production/${REPO_NAME}
                                yarn install --non-interactive
                                yarn build
                            """
                        }
                    )
                }
            }
        }

        stage("Deploy") {
            steps {
                sshagent(['myubuntu']) {
                    parallel (
                        development: {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/development/${REPO_NAME}
                                npx pm2 restart '${APP_NAME}' || npx pm2 start "PORT='${DEV_PORT}' yarn start" --name '${APP_NAME}'
                            """
                        },
                        production: {
                            sh """
                                ssh -o StrictHostKeyChecking=no ${env.SSH_USER}@${env.SSH_HOST} << ENDSSH
                                cd /home/ahmed/production/${REPO_NAME}
                                npx pm2 restart '${APP_NAME}' || npx pm2 start "PORT='${PROD_PORT}' yarn start" --name '${APP_NAME}'
                            """
                        }
                    )
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
