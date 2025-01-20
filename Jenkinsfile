pipeline {
    agent any
    environment {
        SSH_USER = 'vbox'
        SSH_HOST = '192.168.1.188'
        RUN_SUDO = 'export SUDO_ASKPASS=/home/vbox/secret/mypass.sh'
        APP_NAME = "NextJsApp"
        REPO_NAME = "nextjs"
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        BRANCH = "${env.BRANCH_NAME ?: 'main'}"
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
        PORT = '3000'
    }
    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build and deploy')
    }
    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['ssh']) {
                    echo "Pulling latest code from Git repository..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
                        set -x

                        # Check if the development directory exists
                        if [ ! -d '/home/devxonic/development' ]; then
                            echo 'Directory development does not exist. Creating it...';
                            mkdir '/home/devxonic/development';
                        else
                            echo 'Navigating to /home/devxonic/development...';
                            cd /home/devxonic/development;
                        fi

                        # List files to ensure we're in the right directory
                        echo 'Listing contents of development directory...';
                        ls -la;

                        # Check if the repository folder exists inside development
                        if [ ! -d '${REPO_NAME}' ]; then
                            echo 'Repository folder does not exist. Cloning repository...';
                            git clone ${REPO_URL} ${REPO_NAME};
                            cd ${REPO_NAME};
                            git switch ${BRANCH};
                        else
                            echo 'Repository folder exists. Checking if it is a Git repository...';
                            cd ${REPO_NAME};
    
                            # Check if it's a Git repository
                            if [ ! -d '.git' ]; then
                                echo 'Not a Git repository. Initializing repository...';
                                git init;
                                git remote add origin ${REPO_URL};
                                git fetch origin;
                                git switch ${BRANCH};
                            else
                                echo 'Directory is a Git repository. Pulling latest changes...';
                                git fetch origin;
                                git switch ${BRANCH};
                                git pull origin ${BRANCH};
                            fi
                        fi
                    """
                }
            }
        }
        stage("Build") {
            steps {
                sshagent(['ssh']){
                    echo "Connecting to machine..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
                        
                        export ${RUN_SUDO};
                        
                        cd /home/devxonic/development/${REPO_NAME};
                        
                        ls -la;

                        # Ensure Yarn is installed
                        if ! command -v yarn &> /dev/null; then
                            echo 'Yarn not found. Installing...'
                            sudo -A npm install -g yarn
                        fi
                        
                        echo 'Verifying Yarn installation...';
                        yarn --version;

                        # Clean cache and reinstall dependencies
                        echo 'Cleaning node_modules and cache...';
                        yarn cache clean;
                        yarn install;
                    
                        # Rebuild the app
                        echo 'Running build...';
                        yarn build;

                        npx pm2 ls;
        
                        # Check if the app is running
                        if npx pm2 list | grep -qw "${APP_NAME}"
                        then
                            echo "Application ${APP_NAME} is already running. Restarting it..."
                            npx pm2 restart "${APP_NAME}"
                        else
                            echo "Application ${APP_NAME} is not running. Starting it..."
                            npx pm2 start "PORT='${PORT}' yarn run start" --name '${APP_NAME}'
                        fi
                        
                        npx pm2 save;
                        
                        npx pm2 ls;
                        
                        npx pm2 logs ${APP_NAME} --lines 5 --nostream;
                    """
                }
            }
        }
        stage("End") {
            steps {
                script {
                    if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
                        echo "Pipeline completed successfully. 🎉"
                    } else {
                        echo "Pipeline encountered errors. Please check the logs. ❌"
                    }
                }
            }
        }
    }
    post {
        success {
            discordSend description: "✅ Pipeline succeeded for ${APP_NAME}!", 
                        footer: "Jenkins Pipeline Notification", 
                        link: env.BUILD_URL, 
                        result: "SUCCESS", 
                        title: env.JOB_NAME, 
                        webhookURL: env.DISCORD_WEBHOOK
        }
        failure {
            discordSend description: "❌ Pipeline failed for ${APP_NAME}. Check logs!", 
                        footer: "Jenkins Pipeline Notification", 
                        link: env.BUILD_URL, 
                        result: "FAILURE", 
                        title: env.JOB_NAME, 
                        webhookURL: env.DISCORD_WEBHOOK
        }
        aborted {
            discordSend description: "⚠️ Pipeline was **aborted** for ${APP_NAME}.", 
                        footer: "Jenkins Pipeline Notification", 
                        link: env.BUILD_URL, 
                        result: "ABORTED", 
                        title: env.JOB_NAME, 
                        webhookURL: env.DISCORD_WEBHOOK
        }
        always {
            echo "Pipeline completed."
        }
    }
}
