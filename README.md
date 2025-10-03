# Text-to-Speech-Narrator-on-Aws

# Architecture
1. A .txt file (book chapter, article, newsletter) is uploaded to an S3 input bucket.
2. S3 Event Notification automatically triggers an AWS Lambda function.
3. Lambda retrieves the file, processes the text, and calls Amazon Polly for speech synthesis.
4. Polly returns an audio stream, which Lambda stores back into S3 output bucket as .mp3.
5. Users can access the audio via pre-signed URL, or distribute it securely using CloudFront.

# AWS services used
1.Amazon S3 → Storage for input text files & output audio files
2.AWS Lambda → Serverless compute for processing & integration
3.Amazon Polly → Text-to-Speech (TTS) conversion
4.IAM → Fine-grained access permissions
5.Amazon CloudWatch → Monitoring & debugging

# Features
1.Event-driven workflow (no manual execution required)
2.Converts .txt files into .mp3 audio
3.Supports multiple languages & Polly voices
4.Scalable and pay-per-use (serverless architecture)
5.Option to use pre-signed URLs or CloudFront for audio distribution

# Project Blog
I  have documented the full step-by-step guide here:
👉 Read Blog Post

## Notes
-Lambda code is adapted with help from AWS SDK documentation  and AI assistance.
-Focus of the project is on AWS architecture and Deployment
