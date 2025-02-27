#!/bin/bash

# Wait for MongoDB to start
until mongosh --host mongo_primary --eval "print(\"Waiting for MongoDB to start...\")"
do
    sleep 1
done

# Initialize the replica set
mongosh --host mongo_primary --eval "rs.initiate({
  _id: \"rs0\",
  members: [
    { _id: 0, host: \"mongo_primary:27017\" },
    { _id: 1, host: \"mongo_secondary:27017\" },
    { _id: 2, host: \"mongo_arbiter:27017\", arbiterOnly: true }
  ]
})"

echo "Replica set initialized!"