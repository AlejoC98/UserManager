# This is the build command, chnag ethe your-image-name for whatever you want to call it.
docker build -t your-image-name .

# This is the running comand:
# docker run is the commando to create and start a Docker container.
# -p 3000:3000 this maps the port from the container to the host.
# -d runs the container in detached mode
# your-image-name chnager this for the name you use on the code above
docker run -p 3000:3000 -d your-image-name

# once you had done this just go to your browser and put this.
http://localhost:4000/