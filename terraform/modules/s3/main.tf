resource "aws_s3_bucket" "base_bucket" {
  bucket = var.bucket_name

  tags = {
    Name = var.bucket_name
    Environment = var.environment
    Description = var.description
  }
}

resource "aws_s3_bucket_acl" "base_bucket" {
  bucket = aws_s3_bucket.base_bucket.id
  acl    = var.acl
}

resource "aws_s3_bucket_versioning" "base_bucket" {
  bucket = aws_s3_bucket.base_bucket.id

  versioning_configuration {
    status = var.versioning
  }
}