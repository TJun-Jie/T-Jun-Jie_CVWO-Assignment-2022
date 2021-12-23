package helper

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDB() *mongo.Client {
	clientOptions := options.Client().ApplyURI("mongodb+srv://jjtai:zMxPRmkThZRqCVmc@cvwo-to-do.9wfav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	// temporary seed data 

	// priorityCollection := client.Database("cvwo_rest_api").Collection("priorities")



	// docs := []interface{}{
    //     bson.D{{"_id", 1}, {"description", "Low"}},
    //     bson.D{{"_id", 2}, {"description", "Medium"}},
    //     bson.D{{"_id", 3}, {"description", "High"}},
    // }

	// result, err := priorityCollection.InsertMany(context.TODO(), docs)
	// list_ids := result.InsertedIDs
	// if err != nil {
	// 		fmt.Printf("A bulk write error occurred, but %v documents were still inserted.\n", len(list_ids))
	// }
	// for _, id := range list_ids {
	// 		fmt.Printf("Inserted document with _id: %v\n", id)
	// }

	// --------------------------- // 

	// collection := client.Database("cvwo_rest_api").Collection("tasks")

	return client
	}

type ErrorResponse struct {
	StatusCode   int    `json:"status"`
	ErrorMessage string `json:"message"`
}

func GetError(err error, w http.ResponseWriter) {

	log.Fatal(err.Error())
	var response = ErrorResponse{
		ErrorMessage: err.Error(),
		StatusCode:   http.StatusInternalServerError,
	}

	message, _ := json.Marshal(response)

	w.WriteHeader(response.StatusCode)
	w.Write(message)
}