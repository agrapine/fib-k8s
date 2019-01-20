docker build -t agrapine/fibonacci-client:latest -t agrapine/fibonacci-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t agrapine/fibonacci-server:latest -t agrapine/fibonacci-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t agrapine/fibonacci-worker:latest -t agrapine/fibonacci-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

docker push agrapine/fibonacci-client:latest
docker push agrapine/fibonacci-client:$GIT_SHA

docker push agrapine/fibonacci-server:latest
docker push agrapine/fibonacci-server:$GIT_SHA

docker push agrapine/fibonacci-worker:latest
docker push agrapine/fibonacci-worker:$GIT_SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=agrapine/fibonacci-server:$GIT_SHA
kubectl set image deployments/client-deployment client=agrapine/fibonacci-client:$GIT_SHA
kubectl set image deployments/worker-deployment worker=agrapine/fibonacci-worker:$GIT_SHA