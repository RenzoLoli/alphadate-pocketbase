pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
              sh '''
                rsync -av --delete \
                  pb_hooks/ \
                  root@192.168.68.55:/opt/pocketbase/pb_hooks/
              '''
            }
          }
      }
  }
