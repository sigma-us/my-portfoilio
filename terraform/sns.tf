resource "aws_sns_topic" "my-portfolio-deploy" {
  name            = "my-portfolio-deploy"
  display_name    = "my-portfolio-deploy"
  policy          = <<POLICY
{
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Sid": "__default_statement_ID",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:GetTopicAttributes",
        "SNS:SetTopicAttributes",
        "SNS:AddPermission",
        "SNS:RemovePermission",
        "SNS:DeleteTopic",
        "SNS:Subscribe",
        "SNS:ListSubscriptionsByTopic",
        "SNS:Publish",
        "SNS:Receive"
      ],
      "Resource": "arn:aws:sns:us-east-1:278701636411:my-portfolio-deploy",
      "Condition": {
        "StringEquals": {
          "AWS:SourceOwner": "278701636411"
        }
      }
    }
  ]
}
POLICY
}

resource "aws_sns_topic_subscription" "my-portfolio-deploy_sub" {
  topic_arn                       = "arn:aws:sns:us-east-1:278701636411:my-portfolio-deploy"
  protocol                        = "email"
  endpoint                        = "kyleconley2@gmail.com"
  raw_message_delivery            = "false"
  endpoint_auto_confirms          = "false"
  confirmation_timeout_in_minutes = 1
}