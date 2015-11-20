
set -e

ssh root@159.203.15.78 "bash -s" < ./deploy_server_side.sh

echo "Deployed to production"
