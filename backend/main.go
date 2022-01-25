package main

import (
	"context"
	"cvwo-backend/cmd/api/helper"
	"cvwo-backend/cmd/api/middleware"
	"cvwo-backend/cmd/api/models"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"net/http"
	"strconv"
)

var client = helper.ConnectDB()
var tasksCollection = client.Database("cvwo_rest_api").Collection("tasks")
var priorityCollection = client.Database("cvwo_rest_api").Collection("priorities")

func main() {

	r := mux.NewRouter()

	// arrange our route
	r.HandleFunc("/v1/priorities", getPriorities).Methods("GET")
	r.HandleFunc("/v1/priority/{id}", getPriority).Methods("GET")
	r.Handle("/v1/tasks", middleware.EnsureValidToken()(http.HandlerFunc(getTasks))).Methods("GET", "OPTIONS")
	r.Handle("/v1/tasks/completed", middleware.EnsureValidToken()(http.HandlerFunc(getCompletedTasks))).Methods("GET", "OPTIONS")
	r.Handle("/v1/tasks/priorities/{priorityID}", middleware.EnsureValidToken()(http.HandlerFunc(getTaskByPriority))).Methods("GET", "OPTIONS")
	r.Handle("/v1/tasks/{id}", middleware.EnsureValidToken()(http.HandlerFunc(getTask))).Methods("GET", "OPTIONS")
	r.Handle("/v1/tasks", middleware.EnsureValidToken()(http.HandlerFunc(createTask))).Methods("POST", "OPTIONS")
	r.Handle("/v1/tasks/{id}", middleware.EnsureValidToken()(http.HandlerFunc(updateTask))).Methods("PUT", "OPTIONS")
	r.Handle("/v1/tasks/{id}", middleware.EnsureValidToken()(http.HandlerFunc(deleteTask))).Methods("DELETE", "OPTIONS")

	// set our port address

	corsWrapper := cors.New(cors.Options{
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "HEAD"},
		AllowedHeaders:   []string{"Content-Type", "Origin", "Accept", "*"},
		AllowCredentials: true,
		AllowedOrigins:   []string{"*"},
	})

	log.Fatal(http.ListenAndServe(":8000", corsWrapper.Handler(r)))
}

func getPriorities(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var priority []models.Priority

	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := priorityCollection.Find(context.TODO(), bson.M{})

	if err != nil {
		helper.GetError(err, w)
		return
	}

	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var Priority models.Priority

		err := cur.Decode(&Priority)
		if err != nil {
			log.Fatal(err)
		}

		// add item our array
		priority = append(priority, Priority)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(priority) // encode similar to serialize process.
}

func getPriority(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var priority models.Priority
	var params = mux.Vars(r)

	// id, _ := primitive.ObjectIDFromHex(params["id"])

	if id, err1 := strconv.Atoi(params["id"]); err1 == nil {
		filter := bson.M{"_id": id}
		err := priorityCollection.FindOne(context.TODO(), filter).Decode(&priority)

		if err != nil {
			helper.GetError(err, w)
			return
		}

		json.NewEncoder(w).Encode(priority)
	}

}

func getTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	var task []models.Task

	filter := bson.D{{"completed", bson.D{{"$eq", false}}}}
	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := tasksCollection.Find(context.TODO(), filter)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var Task models.Task

		err := cur.Decode(&Task)
		if err != nil {
			log.Fatal(err)
		}

		// add item our array
		task = append(task, Task)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(task)
	// encode similar to serialize process.
}

func getCompletedTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	var task []models.Task

	filter := bson.D{{"completed", bson.D{{"$eq", true}}}}

	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := tasksCollection.Find(context.TODO(), filter)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var Task models.Task

		err := cur.Decode(&Task)
		if err != nil {
			log.Fatal(err)
		}

		// add item our array
		task = append(task, Task)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(task) // encode similar to serialize process.
}

func getTaskByPriority(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var params = mux.Vars(r)
	var task []models.Task

	if id, err1 := strconv.Atoi(params["priorityID"]); err1 == nil {
		filter := bson.M{"priorityID": id}
		cur, err := tasksCollection.Find(context.TODO(), filter)

		if err != nil {
			helper.GetError(err, w)
			return
		}

		defer cur.Close(context.TODO())

		for cur.Next(context.TODO()) {

			// create a value into which the single document can be decoded
			var Task models.Task

			err := cur.Decode(&Task)
			if err != nil {
				log.Fatal(err)
			}

			// add item our array
			task = append(task, Task)
		}

		if err := cur.Err(); err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(task) // encode similar to serialize process.
	}

}

func getTask(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var task models.Task
	var params = mux.Vars(r)

	id, _ := primitive.ObjectIDFromHex(params["id"])

	filter := bson.M{"_id": id}
	err := tasksCollection.FindOne(context.TODO(), filter).Decode(&task)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	json.NewEncoder(w).Encode(task)
}

func createTask(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodPost {
		w.Header().Set("Content-Type", "application/json")

		var task models.Task

		_ = json.NewDecoder(r.Body).Decode(&task)

		result, err := tasksCollection.InsertOne(context.TODO(), task)

		if err != nil {
			helper.GetError(err, w)
			return
		}

		json.NewEncoder(w).Encode(result)
	}

}

func updateTask(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodPut {

		var params = mux.Vars(r)

		id, _ := primitive.ObjectIDFromHex(params["id"])

		var task models.Task

		filter := bson.M{"_id": id}

		_ = json.NewDecoder(r.Body).Decode(&task)
		update := bson.D{
			{Key: "$set", Value: bson.D{
				{Key: "title", Value: task.Title},
				{Key: "description", Value: task.Description},
				{Key: "completed", Value: task.Completed},
				{Key: "priorityID", Value: task.PriorityID},
			}},
		}

		result, err := tasksCollection.UpdateOne(context.TODO(), filter, update)

		if err != nil {
			helper.GetError(err, w)
			return
		}

		json.NewEncoder(w).Encode(result)
	}

}

func deleteTask(w http.ResponseWriter, r *http.Request) {

	// Set header
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodDelete {
		// get params
		var params = mux.Vars(r)

		// string to primitive.ObjectID
		id, err := primitive.ObjectIDFromHex(params["id"])

		if err != nil {
			helper.GetError(err, w)
			return
		}

		// prepare filter.
		filter := bson.M{"_id": id}

		deleteResult, mongoErr := tasksCollection.DeleteOne(context.TODO(), filter)

		if mongoErr != nil {
			helper.GetError(mongoErr, w)
			return
		}

		json.NewEncoder(w).Encode(deleteResult)
	}

}
