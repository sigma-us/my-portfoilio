terraform {
  backend "s3" {
    bucket   = "portfolio-tf"
    key      = "production/terraform.tfstate"
    region   = "us-east-1"
    acl      = "bucket-owner-full-control"
    profile  = "default"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  shared_credentials_files = ["~/.aws/credentials"]
  profile                 = var.aws_profile
  region                  = var.aws_region
}
