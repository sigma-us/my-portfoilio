# for upgrading existing s3 buckets to new v4 spec, future breaking changes otherwise

resource "aws_s3_bucket_acl" "base_bucket" {
  bucket = var.bucket_name
  acl    = var.acl
}

resource "aws_s3_bucket_versioning" "base_bucket" {
  bucket = var.bucket_name

  versioning_configuration {
    status = var.versioning
  }
}

resource "aws_s3_bucket_public_access_block" "base_bucket" {
  bucket = var.bucket_name

  block_public_acls       = var.block_public
  block_public_policy     = var.block_public
  ignore_public_acls      = var.block_public
  restrict_public_buckets = var.block_public
}
