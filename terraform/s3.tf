resource "aws_s3_bucket" "portfolio_tf" {
  bucket = "portfolio-tf"
  acl = "private"

  tags = {
    Name = "terraform state portfolio"
    Environment = var.environment
  }

  versioning {
    enabled = true
  }
}

resource "aws_s3_bucket" "build_portfolio" {
  bucket = "build-portfolio.kconley.com"
  acl = "public-read"

  tags = {
    Name = "build files for portfolio"
    Environment = var.environment
  }

  versioning {
    enabled = false
  }

  website {
    index_document = "index.html"
  }
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
  acl = "private"


  tags = {
    Name = "code for lambda functions"
    Environment = var.environment
  }

  versioning {
    enabled = false
  }
}
