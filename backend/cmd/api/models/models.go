package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Task struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Title  string             `json:"title" bson:"title,omitempty"`
	Description  string       `json:"description" bson:"description,omitempty"`
	Completed  bool       `json:"completed" bson:"completed,omitempty"`
	PriorityID int  `json:"priorityID" bson:"priorityID,omitempty"`
}

type Priority struct {
	ID     int `json:"_id,omitempty" bson:"_id,omitempty"`
	Description string  `json:"description" bson:"description,omitempty"`
}

