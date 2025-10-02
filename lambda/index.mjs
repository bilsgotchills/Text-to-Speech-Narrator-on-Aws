import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";

const polly = new PollyClient({ region: "us-east-1" });
const s3 = new S3Client({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    const bucketName = event.Records[0].s3.bucket.name;
    const key = event.Records[0].s3.object.key;

    console.log(`📥 New file uploaded: s3://${bucketName}/${key}`);

    // Get text file from S3
    const inputFile = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
    const textToConvert = await inputFile.Body.transformToString();

    console.log("✅ Text to convert:", textToConvert.substring(0, 200)); // first 200 chars

    // Call Polly
    const pollyResult = await polly.send(
      new SynthesizeSpeechCommand({
        Text: textToConvert,
        OutputFormat: "mp3",
        VoiceId: "Joanna",
      })
    );

    const audioBuffer = Buffer.from(await pollyResult.AudioStream.transformToByteArray());

    // Save audio to same bucket with .mp3 extension
    const outputKey = key.replace(".txt", ".mp3");
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: outputKey,
        Body: audioBuffer,
        ContentType: "audio/mpeg",
        
      })
    );

    return {
      statusCode: 200,
      body: `✅ Audio created at s3://${bucketName}/${outputKey}`,
    };
  } catch (err) {
    console.error("❌ Error:", err);
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
