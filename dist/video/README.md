Place your real MP4 file here with the exact filename:

  graduation-video.mp4

Path (relative to project root):

  video/graduation-video.mp4

Notes:
- If the file is large (>10–20MB), compress it before committing and deploying to avoid slow deploys and hitting repo size limits.
- Example ffmpeg commands to compress while preserving quality:

  # Reduce bitrate (good for music/video montages)
  ffmpeg -i input.mp4 -b:v 1200k -bufsize 1200k -maxrate 1600k -preset medium -crf 23 -c:a aac -b:a 128k graduation-video.mp4

  # Scale down to 720p
  ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k graduation-video.mp4

After placing the file, tell the agent "video placed" and I will verify the path, build, commit, and deploy for you.