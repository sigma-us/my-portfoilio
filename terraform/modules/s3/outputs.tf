output "s3_arn" {
  value       = aws_s3_bucket.base_bucket.arn
  description = "S3 Bucket ARN"
}