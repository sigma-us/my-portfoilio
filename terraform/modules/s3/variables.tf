variable "versioning" {
    description = "Enable versioning on s3 bucket? (Enabled/Disabled)"
    type = string
    default = "Disabled"
}

variable "acl" {
    description = "S3 Access Control List (private/public/public-read)"
    default = "private"
}


variable bucket_name {
    description = "Name for bucket"
    type = string
}


variable description {
    description = "Description for bucket"
    type = string
}

variable environment {
    description = "Environment for bucket"
    type = string
}

variable block_public {
    description = "Block all public Access"
    type = bool
    default = true
}

# # experimental adding enum types

# variable "type" {
#   type = string

#   validation {
#     condition     = length(regexall("^(public|private)$", var.type)) > 0
#     error_message = "ERROR: Valid types are \"public\" and \"private\"!"
#   }
# }

# variable "environment" {
#   type        = string
#   description = <<EOT
#   (Optional) The environment short name to use for the deployed resources.

#   Options:
#   - dev
#   - uat
#   - prd

#   Default: dev
#   EOT
#   default     = "prd"

#   validation {
#     condition     = can(regex("^dev$|^uat$|^prd$", var.environment))
#     error_message = "Err: invalid environment."
#   }

#   validation {
#     condition     = length(var.environment) <= 3
#     error_message = "Err: environment is too long."
#   }
# }