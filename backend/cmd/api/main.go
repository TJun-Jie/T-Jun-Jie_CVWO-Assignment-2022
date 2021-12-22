package main

import (
	"backend/cmd/api/helper"
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/TJun-Jie/cvwo-backend/helper"
	"github.com/TJun-Jie/cvwo-backend/models"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collection = helper.ConnectDB()



func main() {
	r := mux.NewRouter()

  	// arrange our route
	r.HandleFunc("/api/task", getTask).Methods("GET")
	r.HandleFunc("/api/task/{id}", getBook).Methods("GET")

  	// set our port address
	log.Fatal(http.ListenAndServe(":8000", r))
}

func getTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var task []models.Task

	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{})

	if err != nil {
		helper.GetError(err, w)
		return
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var book models.Task
		// & character returns the memory address of the following variable.
		err := cur.Decode(&book) // decode similar to deserialize process.
		if err != nil {
			log.Fatal(err)
		}

		// add item our array
		task = append(task, book)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(task) // encode similar to serialize process.
}

func getBook(w http.ResponseWriter, r *http.Request) {
	// set header.
	w.Header().Set("Content-Type", "application/json")

	var book models.Book
	// we get params with mux.
	var params = mux.Vars(r)

	// string to primitive.ObjectID
	id, _ := primitive.ObjectIDFromHex(params["id"])

	// We create filter. If it is unnecessary to sort data for you, you can use bson.M{}
	filter := bson.M{"_id": id}
	err := collection.FindOne(context.TODO(), filter).Decode(&book)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	json.NewEncoder(w).Encode(book)
}