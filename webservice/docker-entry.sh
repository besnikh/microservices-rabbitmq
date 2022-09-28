#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

# Wait for the backend to be up, if we know where it is.
if [ -n "$REMOTE_HOST" ]; then
  /app/wait-for-it.sh "$REMOTE_HOST:${REMOTE_PORT:-6000}"
fi

# Run the main container command.
exec "$@"