
module portfolio_tf_state_bucket {
  source = "./modules/s3"
  bucket_name = "portfolio-tf"
  environment = var.environment
  description = "portfolio terraform state bucket"
  acl = "private"
  block_public = true
  versioning = "Enabled"
}




resource "aws_s3_bucket" "build_portfolio" {
  bucket = "build-portfolio.kconley.com"
  acl = "public-read"
  policy = <<EOT
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::build-portfolio.kconley.com/*"
        }
    ]
}
EOT

  tags = {
    Name = "build files for portfolio"
    Environment = var.environment
  }

  versioning {
    enabled = false
  }

}

resource "aws_s3_bucket_public_access_block" "build_portfolio" {
  bucket = "build-portfolio.kconley.com"

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


resource "aws_s3_bucket" "portfolio" {
  bucket = "portfolio.kconley.com"
  acl = "public-read"
  policy = <<EOT
{
  "Version": "2008-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::portfolio.kconley.com/*",
          "Condition": {
              "StringLike": {
                  "aws:Referer": "*.kconley.com/*"
              }
          }
      }
  ]
}
EOT

  tags = {
    Name = "portfolio static assets"
    Environment = var.environment
  }

  versioning {
    enabled = false
  }

  website {
    error_document = "index.html"
    index_document = "index.html"
  }
}

resource "aws_s3_bucket" "checkers" {
  bucket = "checkers.kconley.com"
  acl = "private"

  tags = {
    Name = "checkers portfolio assets"
    Environment = var.environment
  }

  versioning {
    enabled = false
  }

  website {
    error_document = "index.html"
    index_document = "index.html"
  }
}


resource "aws_s3_bucket" "lambda_code" {
  bucket = "kyle-lambda-code"

  tags = {
    Name = "code for lambda functions"
    Environment = var.environment
  }
}

module lambda_code_bucket {
  source = "./modules/s3_upgrade"
  bucket_name = "kyle-lambda-code"
  acl = "private"
  versioning = "Disabled"
  block_public = true
}
