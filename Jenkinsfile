pipeline {
    agent any

    environment {
        DEPLOY_HOST = '192.168.68.55'
        DEPLOY_USER = 'root'
        DEPLOY_PATH = '/opt/pocketbase'
    }

    stages {
        stage('Deploy') {
          steps {
            sh '''
                scp -r \
                    pb_hooks \
                    pb_migrations \
                    ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/
            '''
          }
        },

        stage('Restart') {
          steps {
            sh '''
              ssh ${DEPLOY_USER}@${DEPLOY_HOST} \
                'sudo systemctl restart pocketbase && sudo systemctl is-active --quiet pocketbase'
              '''
          }
        }
    }
}
