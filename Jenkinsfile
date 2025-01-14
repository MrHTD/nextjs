pipeline {
    agent any
    environment {
        SSH_USER = 'vbox'
        SSH_HOST = '192.168.100.14'
        RUN_SUDO = 'export SUDO_ASKPASS=/home/vbox/secret/mypass.sh'
        APP_NAME = "NextJsApp"
        REPO_NAME = "nextjs"
        REPO_URL = "git@github.com:MrHTD/nextjs.git"
        BRANCH = "main"
        DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1328627802194444359/wKmS_3V7cbHvBZzQu8B2JB1A1Hqc9Q0-vj0mIQLqD5ZH_bQCXg5aj0LLdBEqQq4dGem5"
    }
    stages {
        stage("Git Pull or Clone") {
            steps {
                sshagent(['ssh']) {
                    echo "Pulling latest code from Git repository..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
                        set -x

                        # Check if the Projects directory exists
                        if [ ! -d '/home/vbox/Projects' ]; then
                            echo 'Directory Projects does not exist. Creating it...';
                            mkdir '/home/vbox/Projects';
                        else
                            echo 'Navigating to /home/vbox/Projects...';
                            cd /home/vbox/Projects;
                        fi

                        # List files to ensure we're in the right directory
                        echo 'Listing contents of Projects directory...';
                        ls -la;

                        # Check if the directory exists
                        if [ ! -d '/home/vbox/Projects/${REPO_NAME}' ]; then
                            echo 'Directory ${REPO_NAME} does not exist. Creating it...';
                            mkdir '/home/vbox/Projects/${REPO_NAME}';
                        else
                            echo 'Directory exists. Skipping creation...';
                        fi

                        # Navigate to the project directory
                        cd '/home/vbox/Projects/${REPO_NAME}';

                        # Check if it's a Git repository
                        if [ ! -d '.git' ]
                        then
                            echo 'Directory is not a Git repository. Cloning repository...';
                            git init;
                            git remote add origin ${REPO_URL};
                            git clone ${REPO_URL};
                            git switch -c ${BRANCH};
                        else
                            echo 'Fetch latest changes';
                            git remote -v;
                            git pull origin ${BRANCH};
                        fi
                    """
                }
            }
        }
        
        stage("Installation") {
            steps {
                sshagent(['ssh']){
                    echo "Connecting to machine..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
                        export ${RUN_SUDO};
                        sudo -A apt update;
                        
                        # Check if Node.js is installed
                        if command -v node > /dev/null; then
                            echo 'Node.js is already installed.'
                        else
                            echo 'Node.js is not installed. Installing Node.js...'
                            # Install Node.js
                            sudo -A apt update
                            sudo -A apt install -y nodejs npm
                        fi
                    """
                }
            }
        }
        // stage("Configuration Nginx") {
        //     steps {
        //         sshagent(['ssh']) {
        //             sh """
        //                 ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << 'ENDSSH'
                    
        //                 export ${RUN_SUDO};
                    
        //                 cd /etc/nginx/sites-available
        //                 ls -la
                    
        //                 # Check if the Nginx config file exists
        //                 if [ ! -f "/etc/nginx/sites-available/${APP_NAME}" ]; then
        //                     echo "File ${APP_NAME} does not exist. Creating it..."

        //                     sudo -A touch ${APP_NAME};
                            
        //                     echo 'server {
        //                         listen 80;
        //                         listen [::]:80;
                            
        //                         root /var/www/html;
        //                         index index.html index.htm index.nginx-debian.html;
                            
        //                         server_name ${APP_NAME};
                            
        //                         location / {
        //                             proxy_pass http://localhost:3001;
        //                             proxy_http_version 1.1;
        //                             proxy_set_header Upgrade \$http_upgrade;
        //                             proxy_set_header Connection \"upgrade\";
        //                             proxy_set_header Host \$host;
        //                             proxy_cache_bypass \$http_upgrade;
        //                         }
        //                     } ' | sudo -A tee /etc/nginx/sites-available/${APP_NAME} > /dev/null
                    
        //                 else
        //                     echo "File exists. Skipping creation of Nginx configuration file..."
        //                 fi
                    
        //                 # Check if the symlink exists in sites-enabled
        //                 if [ ! -f "/etc/nginx/sites-enabled/${APP_NAME}" ]; then
        //                     echo "File ${APP_NAME} does not exist in sites-enabled. Creating link..."
        //                     sudo -A ln -sf /etc/nginx/sites-available/${APP_NAME} /etc/nginx/sites-enabled/
        //                     sudo -A nginx -t && sudo -A systemctl restart nginx
        //                 else
        //                     echo 'Validate Nginx configuration and restart';
        //                     sudo -A nginx -t && sudo -A systemctl restart nginx
        //                 fi
                
        //             """
        //         }
        //     }
        // }
        stage("Build") {
            steps {
                sshagent(['ssh']){
                    echo "Connecting to machine..."
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} << ENDSSH
                        
                        export ${RUN_SUDO};
                        
                        cd /home/vbox/Projects/${REPO_NAME};
                        
                        ls -la;

                        # Install Yarn globally using npm
                        echo 'Installing Yarn globally using npm...'
                        sudo -A npm install -g yarn
                    
                        # Check if Yarn was installed correctly
                        echo 'Verifying Yarn installation...'
                        yarn --version
                    
                        # Check if 'node_modules' exists
                        if [ -d 'node_modules' ]; then
                            echo 'Dependencies are already installed, skipping yarn install.'
                        else
                            echo 'Dependencies not found, running yarn install...'
                            yarn install
                        fi
                        
                        yarn build;
        
                        # Check if the app is running
                        if [ pm2 ls | grep -w "${APP_NAME}" > /dev/null ]
                        then
                            echo "Application ${APP_NAME} is already running. Restarting it...";
                            pm2 restart ${APP_NAME};
                        else
                            echo "Application ${APP_NAME} is not running. Starting it...";
                            pm2 start yarn --name "${APP_NAME}" -- run dev --port 3001;
                        fi
                        
                        pm2 save;
                        
                        pm2 ls;
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
        post {
        success {
            discordSend description: "✅ Pipeline succeeded for ${APP_NAME}!", footer: "Jenkins Pipeline Notification", link: env.BUILD_URL, result: "SUCCESS", title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        failure {
            discordSend description: "❌ Pipeline failed for ${APP_NAME}. Check logs!", footer: "Jenkins Pipeline Notification", link: env.BUILD_URL, result: "FAILURE", title: env.JOB_NAME, webhookURL: env.DISCORD_WEBHOOK
        }
        always {
            echo "Pipeline completed."
        }
    }
}
