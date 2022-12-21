# module base_bucket {
#   source = "./s3_upgrade"
#   bucket_name = var.bucket_name
#   acl = var.acl
#   block_public = false
#   versioning = var.versioning
# }


# resource "aws_s3_bucket_website_configuration" "base_bucket" {

# }