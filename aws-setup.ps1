# AWS Setup Script for CI/CD Project
$REGION = "us-east-1"
$ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text)
echo "Account ID: $ACCOUNT_ID"

# 1. Create ECR repositories
echo "Creating ECR repositories..."
aws ecr create-repository --repository-name cicd-backend --region $REGION
aws ecr create-repository --repository-name cicd-frontend --region $REGION

# 2. Create ECS Cluster
echo "Creating ECS cluster..."
aws ecs create-cluster --cluster-name cicd-cluster --region $REGION

# 3. Get default VPC
$VPC_ID = (aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query "Vpcs[0].VpcId" --output text)
echo "VPC ID: $VPC_ID"

# 4. Get subnets
$SUBNETS = (aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query "Subnets[*].SubnetId" --output text)
echo "Subnets: $SUBNETS"

# Save values to file for reference
@"
ACCOUNT_ID=$ACCOUNT_ID
REGION=$REGION
VPC_ID=$VPC_ID
SUBNETS=$SUBNETS
"@ | Out-File -FilePath "C:\cicd-project\aws-values.txt" -Encoding ASCII

echo "Setup complete! Values saved to aws-values.txt"