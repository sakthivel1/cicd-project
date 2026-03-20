## How to Run Locally (Windows/Mac)
```bash
git clone https://github.com/sakthivel1/cicd-project
cd cicd-project
docker compose -f docker-compose.local.yml up --build
```
- Frontend: http://localhost:3000
- Backend health: http://localhost:8080/health
- API: http://localhost:8080/api/items

## How to Run in CI (Linux)
```bash
docker compose up --build
```
