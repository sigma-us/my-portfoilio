variable "versioning" {
    description = "Enable versioning on s3 bucket?"
    type = bool
    default = false
}

variable "acl" {
    description = "S3 Access Control List (private or public)"
    default = "private"
}
