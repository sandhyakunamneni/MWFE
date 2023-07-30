from flask import Flask, request, jsonify
import boto3
import uuid

app = Flask(__name__)

USER = {
    "username": "rsk",
    "password": "rsk",  # Replace with the hashed password
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if data and data.get('username') == USER['username'] and data.get('password') == USER['password']:
        session['logged_in'] = True
        return jsonify({'success': True})
    return jsonify({'success': False})

# AWS S3 configuration
s3 = boto3.client("s3")
bucket_name = "your-s3-bucket-name"  # Replace with your S3 bucket name

# AWS DynamoDB configuration
dynamodb = boto3.resource("dynamodb")
table_name = "sandhya-file-upload"  # Replace with your DynamoDB table name
table = dynamodb.Table('FileUploads')

# AWS SES configuration
ses = boto3.client("ses")

@app.route("/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    emails = request.form.getlist("emails[]")

    # Generate a unique file key and upload the file to S3
    file_key = f"{uuid.uuid4()}-{file.filename}"
    s3.upload_fileobj(file, bucket_name, file_key)

    # Store the file information in DynamoDB
    file_info = {
        "file_key": file_key,
        "file_name": file.filename,
        "emails": emails,
    }
    table.put_item(Item=file_info)

    # Send emails to the provided email addresses
    for email in emails:
        send_email(email, file_key)

    return jsonify({"message": "File uploaded and emails sent successfully."})

def send_email(email, file_key):
    # Customize the email message and subject as needed
    subject = "File Sharing Tool - Your Shared File"
    body = f"Here is the link to download your shared file: {get_s3_url(file_key)}"
    
    ses.send_email(
        Source="skunamne@uab.edu",  # Replace with your sender email address
        Destination={"ToAddresses": [email]},
        Message={
            "Subject": {"Data": subject},
            "Body": {"Text": {"Data": body}},
        },
    )

def get_s3_url(file_key):
    # Generate and return the S3 URL for the file
    return f"https://{bucket_name}.s3.amazonaws.com/{file_key}"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
